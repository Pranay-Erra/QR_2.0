import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css';

const AdminDashboard = () => {
    const [qrCodes, setQrCodes] = useState([]);
    const [error, setError] = useState('');

    // Fetch the QR codes when the component mounts
    useEffect(() => {
        const fetchQrCodes = async () => {
            try {
                const response = await axios.get('https://qr-2-0.onrender.com/api/qrcodes');
                setQrCodes(response.data);
            } catch (err) {
                console.error("Error fetching QR codes:", err);
                setError('Failed to fetch QR codes.');
            }
        };

        fetchQrCodes();
    }, []);

    // Function to delete a QR code with toast notifications
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://qr-2-0.onrender.com/api/qrcodes/${id}`);
            setQrCodes(qrCodes.filter(qr => qr._id !== id));

            // Show a success toast
            toast.success('QR Code deleted successfully!', {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (err) {
            console.error("Error deleting QR code:", err);
            setError('Failed to delete QR code.');

            // Show an error toast
            toast.error('Failed to delete QR Code. Please try again.', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard: QR Code Details</h1>
            <ToastContainer /> {/* Toast container to display notifications */}

            {error && <p className="error">{error}</p>}

            {qrCodes.length > 0 ? (
                <table className="qr-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Created At</th>
                            <th>Scan Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qrCodes.map(qr => (
                            <tr key={qr._id}>
                                <td>{qr.originalUrl}</td>
                                <td>{new Date(qr.createdAt).toLocaleString()}</td>
                                <td>{qr.scanCount}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(qr._id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
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
