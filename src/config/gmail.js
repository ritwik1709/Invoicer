// Gmail API configuration
const GMAIL_CONFIG = {
  clientId: process.env.REACT_APP_GMAIL_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GMAIL_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_GMAIL_REDIRECT_URI || "http://localhost:3000/oauth2callback",
  scope: "https://www.googleapis.com/auth/gmail.send"
};

// Function to get Gmail API authorization URL
export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: GMAIL_CONFIG.clientId,
    redirect_uri: GMAIL_CONFIG.redirectUri,
    response_type: 'code',
    scope: GMAIL_CONFIG.scope,
    access_type: 'offline',
    prompt: 'consent'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Function to exchange authorization code for tokens
export const getTokens = async (code) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: GMAIL_CONFIG.clientId,
      client_secret: GMAIL_CONFIG.clientSecret,
      redirect_uri: GMAIL_CONFIG.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  return response.json();
};

// Function to send email using Gmail API
export const sendEmail = async (accessToken, to, subject, body, attachment) => {
  const email = [
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `To: ${to}`,
    `Subject: ${subject}`,
    '',
    body
  ].join('\r\n');

  const encodedEmail = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedEmail,
    }),
  });

  return response.json();
}; 