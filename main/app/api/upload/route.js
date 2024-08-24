"use server"
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/_middleware/mongodb'; // Your MongoDB connection utility
import Document from '@/app/_models/documentschema'; // Your Mongoose schema
import { uploadImageToCloudinary } from '@/app/_middleware/cloudinary';// The upload function you provided

export async function POST(req) {
    await connectToDatabase();

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadImageToCloudinary(file);

        if (!imageUrl) {
            throw new Error('Image upload failed');
        }

        // Save the document information to the database
        const newDocument = new Document({
            url: imageUrl,
            // Add other fields if needed
        });

        await newDocument.save();

        return NextResponse.json({ success: true, document: newDocument }, { status: 200 });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
