// import React, { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const OAuthSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const { handleOAuthSuccess } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = searchParams.get('token');
//     if (token) {
//       handleOAuthSuccess(token);
//       // Give time for user to load, then redirect
//       setTimeout(() => navigate('/dashboard'), 1000);
//     } else {
//       navigate('/login?error=oauth_failed');
//     }
//   }, [searchParams, handleOAuthSuccess, navigate]);

//   return (
//     <div style={{
//       display: 'flex', flexDirection: 'column', alignItems: 'center',
//       justifyContent: 'center', height: '100vh', background: '#0a0a0f',
//       color: '#e0e0e0', gap: '16px'
//     }}>
//       <div style={{ fontSize: '2rem' }}>⬡</div>
//       <p style={{ color: '#888' }}>Completing sign in...</p>
//       <div className="spinner" />
//     </div>
//   );
// };

// export default OAuthSuccess;






import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { handleOAuthSuccess } = useAuth();
  const navigate = useNavigate();
  const isProcessed = useRef(false);

  useEffect(() => {
    // Prevent React 18 Strict Mode from executing the token handshake twice
    if (isProcessed.current) return;
    isProcessed.current = true;

    const token = searchParams.get('token');

    const processLogin = async () => {
      if (!token) {
        navigate('/login?error=oauth_failed', { replace: true });
        return;
      }

      try {
        // Await the auth verification call to Vercel before navigating
        await handleOAuthSuccess(token);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('OAuth token exchange failed:', err);
        navigate('/login?error=token_invalid', { replace: true });
      }
    };

    processLogin();
  }, [searchParams, handleOAuthSuccess, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0a0a0f',
        color: '#e0e0e0',
        gap: '16px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: '2.5rem' }}>⬡</div>
      <p style={{ color: '#888', margin: 0 }}>Completing sign in...</p>
      <div className="spinner" />
    </div>
  );
};

export default OAuthSuccess;