"use server";

import { ProviderSchema, FeatureSchema, DescriptionSchema, RatingSchema, ReviewSchema } from "@/app/_models/schema";
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
    const Providers = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
    const Features = mongoose.models.Feature || mongoose.model('Feature', FeatureSchema);
    const Descriptions = mongoose.models.Description || mongoose.model('Description', DescriptionSchema);
    const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
    const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

    const provider = await Providers.findById(id);
    if (!provider) {
        return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const coords = {
        longitude: provider.location.coordinates[0],
        latitude: provider.location.coordinates[1],
    };

    const featuresDoc = await Features.findOne({ providerId: id });
    const features = featuresDoc ? featuresDoc.features : [];
    
    const descriptionDoc = await Descriptions.findOne({ providerId: id });
    const description = descriptionDoc ? descriptionDoc.description : "No description available";

    const ratingDocument = await Rating.findOne({ providerId: id }).exec();
    const rating = ratingDocument ? ratingDocument.rating : null;

    const reviewDocument = await Review.find({ providerId: id }).exec();
    const reviews = reviewDocument ? reviewDocument.length : 0;

    const data = {
        longitude: coords.longitude,
        latitude: coords.latitude,
        address: provider.address,
        phone: provider.phone,
        name: provider.name,
        features: features,
        description: description,
        rating: rating,
        reviews: reviews,
    };

    return NextResponse.json(data);
}

export {
    posthandler as POST
}