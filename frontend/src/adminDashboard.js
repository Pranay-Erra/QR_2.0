import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './admin.css'; // Optional: For custom styles

const AdminDashboard = () => {
    const [qrCodes, setQrCodes] = useState([]); // State to store the fetched QR codes
    const [error, setError] = useState('');

    // Fetch the QR codes when the component mounts
    useEffect(() => {
        const fetchQrCodes = async () => {
            try {
                const response = await axios.get('https://qr-2-0.onrender.com/api/qrcodes');
                setQrCodes(response.data); // Set the fetched data to state
            } catch (err) {
                console.error("Error fetching QR codes:", err);
                setError('Failed to fetch QR codes.');
            }
        };

        fetchQrCodes();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard: QR Code Details</h1>

            {error && <p className="error">{error}</p>}

            {qrCodes.length > 0 ? (
                <table className="qr-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Created At</th>
                            <th>Scan Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qrCodes.map(qr => (
                            <tr key={qr._id}>
                                <td>{qr.originalUrl}</td>
                                <td>{new Date(qr.createdAt).toLocaleString()}</td>
                                <td>{qr.scanCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No QR codes found.</p>
            )}
        </div>
    );
}

export default AdminDashboard;
