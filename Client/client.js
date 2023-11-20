document.addEventListener("DOMContentLoaded", () => {
    const callApiButton = document.getElementById("call-api-button");
    const fileUploadInput = document.getElementById("file-upload");
    const resultDisplay = document.getElementById("result-display");

    callApiButton.addEventListener("click", async () => {
        fileUploadInput.click();
    });

    // Function to handle displaying the image preview
    function displayImage(file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const imgPreview = document.createElement("img");
            imgPreview.classList.add("image-preview");
            imgPreview.src = event.target.result;
            resultDisplay.innerHTML = ''; // Clear previous content
            resultDisplay.appendChild(imgPreview);
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    }

    // Listen for changes in the file input
    fileUploadInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
  
        if (file) {
            try {
                displayImage(file); // Display the image preview

                const formData = new FormData();
                formData.append("file", file);
  
                const response = await fetch("/call-api", {
                    method: "POST",
                    body: formData,
                });
  
                const result = await response.json();
                console.log(result); // Handle the API response here

                // Display each result item in the result display container
                result.forEach(item => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");
                    resultItem.textContent = `Label: ${item.label}\nScore: ${item.score.toFixed(4)}`;
                    resultDisplay.appendChild(resultItem);
                });
            } catch (error) {
                console.error("Error calling API:", error);
            }
        }
    });
});
