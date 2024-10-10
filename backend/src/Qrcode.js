import mongoose from 'mongoose';

// Define the QR code schema
const qrCodeSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    uniqueCode: {
        type: String,
        required: true,
        unique: true, // Ensure unique codes for each entry
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the model from the schema
const QrCodeModel = mongoose.model('QrCode', qrCodeSchema);

export default QrCodeModel; // Export the model for use in your server.js
