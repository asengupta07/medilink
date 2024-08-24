"use client"
import React, { useState } from 'react';

const ProfilePictureUpload = () => {
  const [imageUrl, setImageUrl] = useState('/placeholder-user.jpg'); // Default placeholder image
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show local preview while uploading
    const localImageUrl = URL.createObjectURL(file);
    setImageUrl(localImageUrl);

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError(null);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setImageUrl(result.document.url); // Set the profile picture to the uploaded image URL
      } else {
        throw new Error(result.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('An error occurred while uploading the image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 border">
          <img src={imageUrl} alt="Profile" className="object-cover w-full h-full" />
        </div>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          disabled={uploading}
        />
      </div>
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
