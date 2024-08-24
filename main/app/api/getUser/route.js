"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";
import { UserInfoSchema, UserContactSchema, UserEmergencyContactSchema, UserSchema, MedicalInfoSchema } from "@/app/_models/schema";

// Function to calculate age based on DOB
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// GET handler for user profile retrieval
async function gethandler(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Initialize models
        const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema);
        const UserContact = mongoose.models.UserContact || mongoose.model('UserContact', UserContactSchema);
        const UserEmergencyContact = mongoose.models.UserEmergencyContact || mongoose.model('UserEmergencyContact', UserEmergencyContactSchema);
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const MedicalInfo = mongoose.models.MedicalInfo || mongoose.model('MedicalInfo', MedicalInfoSchema);

        // Extract token from request headers
        const token = req.headers.get('Authorization');

        // Verify the token and extract userId
        const userId = await verifyToken(token);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user data from respective collections
        const user = await User.findById(userId);
        const info = await MedicalInfo.findOne({ userId: userId })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userInfo = await UserInfo.findOne({ userId });
        const userContact = await UserContact.findOne({ userId });
        const userEmergencyContacts = await UserEmergencyContact.findOne({ userId });

        // Construct the response data
        const responseData = {
            userId,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            userInfo: userInfo ? {
                age: calculateAge(userInfo.dob), // Age calculation
                gender: userInfo.gender,
                dateofbirth: userInfo.dob
            } : null,
            userContact: userContact ? {
                phone: userContact.phone,
                telephone: userContact.telephone,
                address: userContact.address
            } : null, 
            userEmergencyContacts: userEmergencyContacts ? userEmergencyContacts.emergencyContacts : [],
            info
            
        };
        // console.log(responseData)
        // Respond with the constructed data
        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return NextResponse.json({ error: "Error retrieving user data" }, { status: 500 });
    }
}

export {
    gethandler as GET
};