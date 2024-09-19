document.addEventListener('DOMContentLoaded', function() {
    const countrySelects = document.querySelectorAll('.countrySelect');
    const provinceSelects = document.querySelectorAll('.provinceSelect');

    countrySelects.forEach(function(countrySelect, index) {
        const provinceSelect = provinceSelects[index]; // Get the matching province select

        // Add event listener for when the country changes
        countrySelect.addEventListener('change', function() {
            const selectedOption = countrySelect.options[countrySelect.selectedIndex];
            const provinces = selectedOption.getAttribute('data-provinces');
            updateProvinces(provinces, provinceSelect);
        });

        // Trigger initial population based on the pre-selected country
        const initialOption = countrySelect.options[countrySelect.selectedIndex];
        const initialProvinces = initialOption.getAttribute('data-provinces');
        updateProvinces(initialProvinces, provinceSelect);
    });

    function updateProvinces(provinces, provinceSelect) {
        // Clear the province dropdown to avoid duplicates
        provinceSelect.innerHTML = '<option value="">Select a province</option>';

        if (provinces) {
            // Clean up and parse the provinces data
            const cleanedProvinces = provinces
                .replace(/[\[\]"']+/g, '') // Remove square brackets, quotes
                .split(',') // Split by commas
                .map(province => province.trim()) // Trim extra spaces
                .filter(province => province.length > 0); // Filter empty entries

            // Use an object to ensure unique province values
            const provinceMap = {};
            
            cleanedProvinces.forEach(function(province) {
                if (!provinceMap[province]) {
                    const option = document.createElement('option');
                    option.value = province;
                    option.textContent = province;
                    provinceSelect.appendChild(option);
                    provinceMap[province] = true; // Mark this province as added
                }
            });
        }
    }
});
