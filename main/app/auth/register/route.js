"use server"

import { NextResponse } from "next/server"
import { UserSchema, UserContactSchema, UserInfoSchema, UserEmergencyContactSchema } from "@/app/_models/schema"
import mongoose from 'mongoose'
import connectToDatabase from "@/app/_middleware/mongodb"
import { hash } from "bcrypt"
import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY

async function posthandler(req) {
    await connectToDatabase()
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const  { firstName, lastName, email, password, dob, gender, phone, telephone, address, emergencyPhone1, emergencyPhone2 } = body;

    if (!firstName || !lastName || !email || !password || !dob || !phone) {
        console.log("haha error")
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const UserInfoModel = mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema);
    const UserContactModel = mongoose.models.UserContact || mongoose.model('UserContact', UserContactSchema);
    const UserEmergencyContactModel = mongoose.models.UserEmergencyContact || mongoose.model('UserEmergencyContact', UserEmergencyContactSchema);


    const hashedPassword = await hash(password, 10);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists")
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const user = new User({ firstName, lastName, email, password: hashedPassword });

        await user.save();

        const userInfo = new UserInfoModel({ userId: user._id, dob, gender });
        await userInfo.save();

        const userContact = new UserContactModel({ userId: user._id, phone, telephone, address });
        await userContact.save();

        const userEmergencyContact = new UserEmergencyContactModel({ userId: user._id, emergencyContact1: emergencyPhone1, emergencyContact2: emergencyPhone2 });
        await userEmergencyContact.save();

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "30d" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error saving user", error);
        return NextResponse.json({ error: "Error saving user" }, { status: 500 });
    }
}

export {
    posthandler as POST
}