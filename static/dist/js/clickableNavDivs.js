document.querySelectorAll('.clickable-div').forEach((div) => {
    div.addEventListener('click', (event) => {
        // Store the ID of the clicked div
        dataUrl = event.currentTarget.getAttribute('data-url');
        localStorage.setItem('clickedDivId',dataUrl);
        window.location.href = dataUrl;
       
    });
});

// When the page loads, add the classes to the clicked div
window.onload = () => {
    let currentPage = window.location.pathname;
    currentPage = currentPage.slice(1);
    console.log(currentPage);
    if (currentPage !== "logout" ) {
        const clickedDiv = document.querySelector(`[data-url="${currentPage}"]`);
        clickedDiv.classList.add('border-b-4', 'border-l-8');
    }
};