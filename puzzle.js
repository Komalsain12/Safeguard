document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

document.querySelectorAll('.resource').forEach(resource => {
    resource.addEventListener('click', function() {
        this.classList.toggle('selected-resource');
    });
});

document.getElementById('submit').addEventListener('click', function() {
    const selectedAreas = document.querySelectorAll('.area.selected');
    const selectedResources = document.querySelectorAll('.resource.selected-resource');

    let resultText = '';
    if (selectedAreas.length && selectedResources.length) {
        resultText = `You have successfully distributed ${selectedResources.length} types of resources to ${selectedAreas.length} areas.`;
    } else {
        resultText = 'Please select both areas and resources to distribute.';
    }
    document.getElementById('result').innerText = resultText;
});
