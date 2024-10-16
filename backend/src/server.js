import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import {  connectToDB } from './db.js';
import QrCodeModel from './Qrcode.js';
import QRCode from 'qrcode';
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

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



const BASE_URL = 'https://qr-2-0.onrender.com'; // Update this with your actual domain

// Endpoint to generate QR code
app.post('/api/generate-qr', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const uniqueCode = Math.random().toString(36).substring(2, 12); // Generate a simple unique code

        // Create a new QR code entry in the database
        const newQrCode = new QrCodeModel({ originalUrl, uniqueCode });
        await newQrCode.save();

        // Create the tracking URL using your domain
        const qrUrl = `${BASE_URL}/api/track?id=${uniqueCode}`;

        // Generate the QR code image
        const qrImageUrl = await QRCode.toDataURL(qrUrl);

        res.json({ qrCodeUrl: qrImageUrl });
    } catch (err) {
        console.error("Error generating QR code:", err);
        res.status(500).send("Error generating QR code");
    }
});

// Endpoint to track scans
// Endpoint to track scans and redirect to the original URL
app.get('/api/track', async (req, res) => {
    const { id } = req.query;

    try {
        // Find the QR code entry by its unique code
        const qrCode = await QrCodeModel.findOne({ uniqueCode: id });
        if (!qrCode) return res.status(404).send('QR code not found');

        // Increment the scan count
        qrCode.scanCount += 1;
        await qrCode.save(); // Save the updated scan count to the database

        // Redirect to the original URL
        res.redirect(qrCode.originalUrl);
    } catch (err) {
        console.error("Error tracking QR code scan:", err);
        res.status(500).send("Error tracking QR code scan");
    }
});




app.post('/api/test', async (req, res) => {
    const { inputValue } = req.body;
    console.log("Received Input: ", inputValue);

    try {
        // Insert the inputValue into the 'test' collection
        const result = await db.collection('test').insertOne({ inputValue });

        // Send response back after successful insertion
        res.json({
            message: `Input value '${inputValue}' inserted successfully`,
            insertedId: result.insertedId
        });
    } catch (err) {
        console.error("Error inserting into database:", err);
        res.status(500).json({ error: "Failed to insert data into database" });
    }
});


// Endpoint to fetch all QR codes for admin view
app.get('/api/qrcodes', async (req, res) => {
    try {
        // Fetch all QR codes from the database
        const qrCodes = await QrCodeModel.find({}, 'originalUrl createdAt scanCount'); // Only select necessary fields
        
        // Send the fetched data back to the frontend
        res.json(qrCodes);
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        res.status(500).send("Error fetching QR codes");
    }
});


app.delete('/api/qrcodes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the QR code by its ID
        const deletedQrCode = await QrCodeModel.findByIdAndDelete(id);

        // If the QR code is not found
        if (!deletedQrCode) {
            return res.status(404).send('QR Code not found');
        }

        // Send success response
        res.json({ message: 'QR Code deleted successfully' });
    } catch (error) {
        console.error("Error deleting QR code:", error);
        res.status(500).send('Error deleting QR code');
    }
});