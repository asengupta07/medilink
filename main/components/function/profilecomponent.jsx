import React, { useState } from "react";
import { uploadImageToCloudinary } from "@/app/_middleware/cloudinary";// Adjust the path accordingly
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
const ProfileComponent = ({ isEditing }) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState("/placeholder-user.jpg");
    const [errors, setErrors] = useState({});

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedImageUrl = await uploadImageToCloudinary(file, setErrors);
            if (uploadedImageUrl) {
                setProfilePictureUrl(uploadedImageUrl);
            }
        }
    };

    return (
        <div>
            {isEditing ? (
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                        <AvatarImage src={profilePictureUrl} />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <Input id="profilePicture" type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    {errors.imgUpLoading && (
                        <p style={{ color: "red" }}>{errors.imgUpLoading}</p>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                        <AvatarImage src={profilePictureUrl} />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Profile Picture</div>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;
