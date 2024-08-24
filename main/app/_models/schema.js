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

const UserInfoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    }
})

const UserContactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
})

const UserEmergencyContactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    emergencyContacts: [
        {
            name: {
                type: String,
                required: true
            },
            relation: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }
    ]
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

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const DocReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
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


// ProviderSchema.index({ location: '2dsphere' });

const MedicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const AppointmentSchema = new mongoose.Schema({
    userId: {
      type: String, 
      required: true
    },
    isForSelf: {
      type: Boolean, 
      required: true
    },
    patientName: {
      type: String, 
      required: true
    },
    patientAge: {
      type: String, 
      required: true
    },
    patientGender: {
      type: String, 
      required: true
    },
    patientPhone: {
      type: String, 
      required: true
    },
    patientEmail: {
      type: String, 
      required: true
    },
    appointmentDay: {
      type: String, 
      required: true
    },
    appointmentTime: {
      type: String, 
      required: true
    },
    docId: {
      type: String, 
      required: true
    },
    presentingComplaints: {
      type: String, 
      required: true
    },
    history: {
      type: String, 
      required: true
    },
    clinicalFindings: {
      type: String, 
      required: true
    },
    medicalHistory: {
      type: String, 
      required: true
    },
    medicalConditions: [{
      type: String
    }]
  }, { 
    timestamps: true 
  });

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const FeatureSchema = new mongoose.Schema({
    providerId: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
});

const DescriptionSchema = new mongoose.Schema({
    providerId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

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

const DoctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    specialization: { 
        type: String, 
        required: true 
    },
    providerId: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        required: true 
    },
    fee: { 
        type: Number, 
        required: true 
    },
    timings: [{
        day: { 
            type: String, 
            required: true 
        },
        startTime: { 
            type: String, 
            required: true 
        },
        endTime: { 
            type: String, 
            required: true 
        },
    }],
    contactInfo: {
        phone: String,
        email: String,
    },
    experience: { 
        type: Number, 
        required: true 
    },
    education: [String],
    languages: [String],
    bio: String,
    awards: [String],
}, { 
    timestamps: true 
});

const MedicineSchema = new mongoose.Schema({
    providerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Allergy", "Pain Relief", "Digestive", "Antibiotics", "Vitamins and Supplements", "Antidepressants", "Antidiabetic"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const MedicalInfoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    blood_type: {
        type: String,
        required: true
    },
    allergies: {
        type: ["String"],
        default: []
    },
    current_medications: {
        type: ["String"],
        default: []
    },
    chronic_conditions: {
        type: ["String"],
        default: []
    },
    previous_surgeries: {
        type: ["String"],
        default: []
    },
    vaccination_records: {
        type: ["String"],
        default: []
    },
    family_medical_history: {
        type: ["String"],
        default: []
    },
    heart_disease: {
        type: Boolean,
        default: false
    },
    cancer: {
        type: Boolean,
        default: false
    },
    alcohol_drug_abuse: {
        type: Boolean,
        default: false
    }    
})


export {
    UserSchema,
    UserInfoSchema,
    UserContactSchema,
    UserEmergencyContactSchema,
    ProviderSchema,
    MedicationSchema,
    exampleSchema,
    ReviewSchema,
    RatingSchema,
    FeatureSchema,
    DescriptionSchema,
    DoctorSchema,
    DepartmentSchema,
    MedicineSchema,
    DocReviewSchema,
    AppointmentSchema,
    MedicalInfoSchema
}