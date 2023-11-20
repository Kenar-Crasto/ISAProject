document.addEventListener("DOMContentLoaded", () => {
    const callApiButton = document.getElementById("call-api-button");
    const fileUploadInput = document.getElementById("file-upload");
  
    callApiButton.addEventListener("click", async () => {
        console.log("Button clicked"); // Check if this log appears in the console

      fileUploadInput.click(); // Trigger the file upload input when the button is clicked
    });
  
    // Listen for changes in the file input
    fileUploadInput.addEventListener("change", async (event) => {
      const file = event.target.files[0]; // Get the selected file
  
      // Perform the API call only if a file is selected
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
  
          const response = await fetch("/call-api", {
            method: "POST",
            body: formData,
          });
  
          const result = await response.json();
          console.log(result); // Handle the API response here
        } catch (error) {
          console.error("Error calling API:", error);
        }
      }
    });
  });