export const uploadImageToCloudinary = async (imageFile, setErrors) => {
    const cloudinaryUploadUrl = process.env.CLOUDINARY_UPLOAD_URL;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);
  
    try {
        const response = await fetch(cloudinaryUploadUrl, {
            method: "POST",
            body: formData,
        });
  
        if (!response.ok) {
            throw new Error(`Failed to upload image to Cloudinary: ${response.statusText}`);
        }
  
        const result = await response.json();
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message || error);
  
        if (setErrors) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                imgUpLoading: "An error occurred while uploading the image. Check your internet connection.",
            }));
            
            setTimeout(() => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    imgUpLoading: "",
                }));
            }, 5000);
        }
  
        return null;
    }
  };
  