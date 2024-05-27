// Function to add a log entry with a timestamp
export function addLogEntry(message) {
    const logDiv = document.getElementById('log');
    const newEntry = document.createElement('div');
    const timestamp = Date.now();
    const timestampString = new Date(timestamp).toLocaleString();
    newEntry.textContent = `${timestampString}: ${message}`;
    logDiv.appendChild(newEntry);

    // Store the log entry in local storage
    const logEntries = JSON.parse(localStorage.getItem('logEntries')) || [];
    logEntries.push({ text: newEntry.textContent, timestamp });

    // Remove entries older than one day
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentEntries = logEntries.filter(entry => entry.timestamp >= oneDayAgo);

    localStorage.setItem('logEntries', JSON.stringify(recentEntries));
}

// Load all log entries from local storage when the page loads

const logDiv = document.getElementById('log');
const logEntries = JSON.parse(localStorage.getItem('logEntries')) || [];

// Remove entries older than six day
const oneDayAgo = Date.now() - 6 * 24  * 60 * 60 * 1000;
const recentEntries = logEntries.filter(entry => entry.timestamp >= oneDayAgo);

// Update local storage with recent entries
localStorage.setItem('logEntries', JSON.stringify(recentEntries));

// Add each log entry to logDiv
recentEntries.forEach(entry => {
    const newEntry = document.createElement('div');
    newEntry.textContent = entry.text;
    logDiv.appendChild(newEntry);
});
