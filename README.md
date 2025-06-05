# Invoice App 📝

A modern, responsive web application for creating and managing professional invoices. Built with React and styled using Tailwind CSS.


## Features ✨

- 📄 Create professional invoices with a clean, modern design
- 📧 Send invoices directly via Gmail integration
- 💼 Manage client information
- 📊 Add multiple items with automatic total calculation
- 📱 Fully responsive design
- 🎨 Customizable invoice details
- 💳 Bank account information support
- 📝 Additional notes section
- 🔄 Preview and edit functionality

## Tech Stack 🛠

- React.js
- Tailwind CSS
- Gmail API for email functionality
- React Router for navigation
- Local Storage for data persistence

## Prerequisites 📋

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- A Google Cloud Platform account (for Gmail API)

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invoice-app.git
cd invoice-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Gmail API credentials:
```env
REACT_APP_GMAIL_CLIENT_ID=your_client_id_here
REACT_APP_GMAIL_CLIENT_SECRET=your_client_secret_here
REACT_APP_GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Usage Guide 📖

1. **Creating a New Invoice**
   - Fill in your business details
   - Add client information
   - Set invoice number and dates
   - Add items with descriptions, quantities, and prices
   - Add any additional notes
   - Preview the invoice before sending

2. **Sending Invoices**
   - Click the "Send" button
   - Authorize Gmail access (first time only)
   - Enter recipient's email
   - Add subject and message
   - Send the invoice

## Gmail API Setup 🔑

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gmail API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Copy the client ID and client secret to your `.env` file


⭐️ If you like this project, please give it a star on GitHub!
