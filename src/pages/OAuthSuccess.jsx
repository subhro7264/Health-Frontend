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






import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { handleOAuthSuccess } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token) {
      handleOAuthSuccess(token, userId)
        .then(() => {
          setTimeout(() => navigate('/dashboard'), 800);
        })
        .catch(() => {
          setError(true);
          setTimeout(() => navigate('/login?error=oauth_failed'), 1500);
        });
    } else {
      setError(true);
      setTimeout(() => navigate('/login?error=oauth_failed'), 1500);
    }
  }, [searchParams, handleOAuthSuccess, navigate]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#0a0a0f',
      color: '#e0e0e0', gap: '16px'
    }}>
      <div style={{ fontSize: '2.5rem' }}>⬡</div>
      <p style={{ color: error ? '#ff6b6b' : '#888', fontSize: '1rem' }}>
        {error ? 'Sign in failed. Redirecting...' : 'Completing sign in...'}
      </p>
      {!error && <div className="spinner" />}
    </div>
  );
};

export default OAuthSuccess;