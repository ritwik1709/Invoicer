import React, { useState, useEffect } from 'react';
import { getAuthUrl, sendEmail } from '../config/gmail';

const EmailForm = ({ isOpen, onClose, invoiceFile, dealerEmail, invoiceNumber, invoiceDate, dueDate, total }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null
  });

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check if we have an access token in localStorage
    const storedToken = localStorage.getItem('gmail_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleAuth = () => {
    // Redirect to Google OAuth consent screen
    window.location.href = getAuthUrl();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all the required fields!");
      return;
    }

    if (!accessToken) {
      alert("Please authorize Gmail access first!");
      handleAuth();
      return;
    }

    try {
      // Create email content
      const emailContent = `
        <html>
          <body>
            <p>Dear ${formData.name},</p>
            
            <p>Please find attached the invoice for your recent transaction.</p>
            
            <h3>Invoice Details:</h3>
            <ul>
              <li>Invoice Number: ${invoiceNumber}</li>
              <li>Date: ${invoiceDate}</li>
              <li>Due Date: ${dueDate}</li>
              <li>Total Amount: ${total}</li>
            </ul>
            
            <p>${formData.message}</p>
            
            <p>If you have any questions or need clarification, please don't hesitate to contact me.</p>
            
            <p>Best regards,<br>${dealerEmail.split('@')[0]}</p>
          </body>
        </html>
      `;

      // Send email using Gmail API
      const response = await sendEmail(
        accessToken,
        formData.email,
        `Invoice from ${dealerEmail.split('@')[0]} - Invoice #${invoiceNumber}`,
        emailContent,
        invoiceFile
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      alert("Email sent successfully!");
      onClose();
      setFormData({ name: '', email: '', message: '', file: null });
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to send email: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Send Invoice</h2>
        {!accessToken && (
          <div className="mb-4 p-4 bg-yellow-100 rounded">
            <p className="text-yellow-800 mb-2">Please authorize Gmail access to send emails.</p>
            <button
              onClick={handleAuth}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Authorize Gmail
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Client Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Client Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
              placeholder="Enter your message here..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              disabled={!accessToken}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm; 