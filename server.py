from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user,current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv, dotenv_values, set_key


app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your secret key

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login' # The login view of your application

class User(UserMixin):
    def __init__(self, id, password):
        self.id = id
        self.password = password

# This should be replaced with your user retrieval logic
env_vars = dotenv_values()  # load environment variables from .env file
admin_username = env_vars['ADMIN_USERNAME']
admin_password = env_vars['ADMIN_PASSWORD']
users = {admin_username: generate_password_hash(admin_password)}

# This callback is used to reload the user object from the user ID stored in the session
@login_manager.user_loader
def load_user(user_id):
    if user_id in users:
        return User(user_id, users[user_id])


# Routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and check_password_hash(users[username], password):
            user = User(username, users[username])
            login_user(user)
            return redirect(url_for('control_page'))
        else:
            return render_template('login.html')
    else:
        return render_template('login.html')

@app.route("/change-password", methods=['POST'])
@login_required
def change_password():
    data = request.get_json()
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')
    print(current_password, new_password)

    # Check if the current password is correct
    if not check_password_hash(users[current_user.id], current_password):
        return jsonify({'message': 'Current password is incorrect'}), 200

    # Hash the new password and save it to environment variable
    new_password_hash = generate_password_hash(new_password)
    current_user.password = new_password_hash

    # Update the user in the user store
    users[current_user.id] = new_password_hash

    set_key('.env', 'ADMIN_PASSWORD', new_password)
    return jsonify({'message': 'Password changed successfully'}), 200


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route("/")
@app.route("/control-page.html")
@login_required
def control_page():
    return render_template("control-page.html")

@app.route("/change-password.html")
@login_required
def change_password_page():
    return render_template("change-password.html")

if __name__ == '__main__':
    app.run(debug=True)