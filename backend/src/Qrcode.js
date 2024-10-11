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
        unique: true,
    },
    scanCount: {
        type: Number,
        default: 0, // Start the scan count at 0
    },
}, { timestamps: true });

// Create the model from the schema
const QrCodeModel = mongoose.model('QrCode', qrCodeSchema);

export default QrCodeModel;
