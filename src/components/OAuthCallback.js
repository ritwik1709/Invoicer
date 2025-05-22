import React, { useEffect } from 'react';
import { getTokens } from '../config/gmail';

const OAuthCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const tokens = await getTokens(code);
          localStorage.setItem('gmail_access_token', tokens.access_token);
          localStorage.setItem('gmail_refresh_token', tokens.refresh_token);
          window.close(); // Close the popup window
        } catch (error) {
          console.error('Error getting tokens:', error);
          alert('Failed to authorize Gmail access. Please try again.');
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authorizing Gmail Access...</h2>
        <p>Please wait while we complete the authorization process.</p>
      </div>
    </div>
  );
};

export default OAuthCallback; 