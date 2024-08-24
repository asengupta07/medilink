import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    // Add any other fields you need, like upload date, user ID, etc.
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
