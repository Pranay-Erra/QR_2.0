import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './main.css';

const Qrcodegenerator = () => {
    const [url, setUrl] = useState('');
    const [qrcode, setQrcode] = useState('');
    const [error, setError] = useState('');

    const GeneratorQRcode = async () => {
        try {
            // Reset error message
            setError('');

            // Call your backend API to generate the tracking URL and QR code
            const response = await axios.post('http://localhost:8000/api/generate-qr', { originalUrl: url });

            // Set the returned QR code data URL
            setQrcode(response.data.qrCodeUrl);
        } catch (err) {
            console.error(err);
            setError('Failed to generate QR code. Please try again.');
        }
    }

    return (
        <>
            <h1>QR Code GENERATOR</h1>
            <div className='main'>
                <div className='div_1'>
                    <h2>DROP YOUR LINK HERE!</h2>
                    <input 
                        type='url'  // Updated to 'url' for better validation
                        placeholder='eg: www.google.com'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <button onClick={GeneratorQRcode}>Generate</button>
                    {error && <p className="error">{error}</p>}
                </div>
                <div className='div_2'>
                    <h2>QR CODE</h2>
                    {qrcode && (
                        <>
                            <img src={qrcode} alt="Generated QR Code" />
                            <a className='download' href={qrcode} download="qrcode.png">Download</a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Qrcodegenerator;
