// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// // Axios instance
// const api = axios.create({ baseURL: API_URL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadUser = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     if (!token) { setLoading(false); return; }
//     try {
//       const { data } = await api.get('/auth/me');
//       if (data.success) setUser(data.user);
//     } catch {
//       localStorage.removeItem('token');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { loadUser(); }, [loadUser]);

//   const register = async (name, email, password) => {
//     setError(null);
//     const { data } = await api.post('/auth/register', { name, email, password });
//     if (data.success) {
//       localStorage.setItem('token', data.token);
//       setUser(data.user);
//     }
//     return data;
//   };

//   const login = async (email, password) => {
//     setError(null);
//     const { data } = await api.post('/auth/login', { email, password });
//     if (data.success) {
//       localStorage.setItem('token', data.token);
//       setUser(data.user);
//     }
//     return data;
//   };

//   const loginWithGoogle = () => {
//     window.location.href = `${API_URL}/auth/google`;
//   };

//   const logout = async () => {
//     try { await api.post('/auth/logout'); } catch {}
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const updateProfile = async (profileData) => {
//     const { data } = await api.put('/auth/update-profile', profileData);
//     if (data.success) setUser(data.user);
//     return data;
//   };

//   const handleOAuthSuccess = useCallback((token) => {
//     localStorage.setItem('token', token);
//     loadUser();
//   }, [loadUser]);

//   return (
//     <AuthContext.Provider value={{
//       user, loading, error, setError,
//       register, login, loginWithGoogle, logout, updateProfile, handleOAuthSuccess
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
//   return ctx;
// };

// export { api };


import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Read API base URL from Vite .env (falls back to local development port if missing)
const rawBaseUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, ''); // Strip any accidental trailing slashes
const API_URL = `${cleanBaseUrl}/api`;

// Configured Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enables cross-origin cookie transfer between localhost and Vercel
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT Bearer token from localStorage to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 Unauthorized responses to clean up expired sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authenticated user profile
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return null;
    }

    try {
      const { data } = await api.get('/auth/me');
      if (data.success && data.user) {
        setUser(data.user);
        return data.user;
      } else {
        localStorage.removeItem('token');
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error('Failed to load user session:', err.message);
      localStorage.removeItem('token');
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Hydrate user session on app mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // User Registration
  const register = async (name, email, password) => {
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      if (data.success) {
        if (data.token) localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      throw err;
    }
  };

  // User Login
  const login = async (email, password) => {
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        if (data.token) localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      throw err;
    }
  };

  // Google OAuth redirect directly to Vercel backend
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  // User Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API error:', err.message);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
    }
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    setError(null);
    try {
      const { data } = await api.put('/auth/update-profile', profileData);
      if (data.success && data.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      setError(msg);
      throw err;
    }
  };

  // ✅ Fixed: Asynchronously awaits user hydration before resolving
  const handleOAuthSuccess = useCallback(
    async (token) => {
      localStorage.setItem('token', token);
      return await loadUser();
    },
    [loadUser]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        setError,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        handleOAuthSuccess,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export { api };