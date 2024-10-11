import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './main.css';

const Qrcodegenerator = () => {
    const [url, setUrl] = useState('');
    const [qrcode, setQrcode] = useState('');
    const [error, setError] = useState('');

    const GeneratorQRcode = async () => {
        try {
            setError('');
            
            // Ensure the URL includes 'http://' or 'https://'
            const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
            
            const response = await axios.post('https://qr-2-0.onrender.com/api/generate-qr', { originalUrl: formattedUrl });
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
