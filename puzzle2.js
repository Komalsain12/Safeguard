// Route Selection Logic
document.querySelectorAll('.route-btn').forEach(routeBtn => {
    routeBtn.addEventListener('click', function() {
        document.querySelectorAll('.route-btn').forEach(btn => btn.classList.remove('selected-route'));
        this.classList.add('selected-route');
    });
});

// Check Route Logic
document.getElementById('check-route').addEventListener('click', function() {
    const selectedRoute = document.querySelector('.route-btn.selected-route');
    if (selectedRoute) {
        const route = selectedRoute.dataset.route;
        document.getElementById('result').innerText = `You selected ${route}. Evaluating the route...`;
        // Example evaluation logic
        setTimeout(() => {
            document.getElementById('result').innerText = `Route ${route} is clear. Proceed with caution.`;
            document.getElementById('result').style.color = '#27ae60';
        }, 2000);
    } else {
        document.getElementById('result').innerText = 'Please select a route first!';
        document.getElementById('result').style.color = '#c0392b';
    }
});
