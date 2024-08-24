"use server";

import { ReviewSchema, UserSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";

async function posthandler(req) {
    await connectToDatabase();

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { id } = body;
    const Reviews = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
    const Users = mongoose.models.User || mongoose.model('User', UserSchema);

    const reviews = await Reviews.find({ providerId: id });

    if (reviews.length === 0) {
        return NextResponse.json({ error: "No reviews found for this provider" }, { status: 404 });
    }

    const reviewData = await Promise.all(reviews.map(async (rev) => {
        const user = await Users.findById(rev.userId);
        rev = rev.toObject();
        const { userId, providerId, _id, createdAt, review, rating, ...rest } = rev;
        rev = {
            ...rest,
            name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
            rating: rating,
            comment: review,
            id: _id,
        }
        return rev;
    }));

    return NextResponse.json(reviewData);
}

export {
    posthandler as POST
}