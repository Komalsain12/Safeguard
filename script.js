let currentSlide = 0;

function moveSlides(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slides img').length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const slideWidth = slides.children[0].clientWidth;
    slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Optional: Automatically adjust the slide width on window resize
window.addEventListener('resize', () => {
    const slides = document.querySelector('.slides');
    const slideWidth = slides.children[0].clientWidth;
    slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
});


document.getElementById('check-location').addEventListener('click', function() {
    const location = document.getElementById('location-input').value.toLowerCase();
    const riskyLocations = ['mumbai', 'kolkata', 'chennai', 'delhi','odisha','dehradun','kasol','jammu']; // Example risky locations
    const result = riskyLocations.includes(location) ? "Your location is in a danger zone!" : "Your location is safe.";
    document.getElementById('location-result').textContent = result;
    document.getElementById('location-result').style.color = riskyLocations.includes(location) ? 'red' : 'green';
});
