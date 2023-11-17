document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('file-upload');
    var cameraInput = document.getElementById('camera-upload');
    var gallery = document.getElementById('preview-gallery');

    fileInput.addEventListener('change', function(event) {
        updateGallery(event.target.files);
    });

    cameraInput.addEventListener('change', function(event) {
        updateGallery(event.target.files);
    });

    document.getElementById('take-photo').addEventListener('click', function() {
        cameraInput.click(); // Trigger the camera input
    });

    function updateGallery(files) {
        gallery.innerHTML = ''; // Clear existing images

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            if (file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.marginRight = '10px';
                    gallery.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }
    }
});
