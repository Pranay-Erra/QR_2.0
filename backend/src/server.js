import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import { db, connectToDB } from './db.js';
import QrCodeModel from './Qrcode.js';

const app = express();

app.use(express.json());
app.use(cors());
const PORT =  8000;

connectToDB(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  });
  

app.get('/', (req, res) => {
    res.send("Server Running Successfully ✅");
});

app.get('/hello', (req, res) => {
    res.status(200).send('OK');
});



// Replace 'yourdomain.com' with your actual domain
const BASE_URL = 'http://localhost:8000'; // Update this with your actual domain

// Endpoint to generate QR code
app.post('/api/generate-qr', async (req, res) => {
    const { originalUrl } = req.body;
    const uniqueCode = Math.random().toString(36).substring(2, 12); // Simple unique code generation

    // Create a new QR code entry in the database
    const newQrCode = new QrCodeModel({ originalUrl, uniqueCode });
    await newQrCode.save();

    // Create the tracking URL using your domain
    const qrUrl = `${BASE_URL}/api/track?id=${uniqueCode}`;

    // Generate the QR code image
    const qrImageUrl = await QRCode.toDataURL(qrUrl);

    res.json({ qrCodeUrl: qrImageUrl });
});

// Endpoint to track scans
app.get('/api/track', async (req, res) => {
    const { id } = req.query;

    const qrCode = await QrCodeModel.findOne({ uniqueCode: id });
    if (!qrCode) return res.status(404).send('QR code not found');

    // Log the scan (implement logging as needed)

    // Redirect to the original URL
    res.redirect(qrCode.originalUrl);
});

