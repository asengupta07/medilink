import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Hospital', 'Clinic', 'Pharmacy']
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    password: {
        type: String,
        required: true
    }
});

const RatingSchema = new mongoose.Schema({
    providerId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const DepartmentSchema = new mongoose.Schema({
    providerId: {
        type: String,
        required: true,
    },
    departments: {
        type: [String],
        required: true,
    }
});

export {
    UserSchema,
    RatingSchema,
    ProviderSchema,
    DepartmentSchema
}