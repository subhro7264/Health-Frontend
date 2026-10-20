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








// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();
// // const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/').replace(/\/$/, '');

// export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Configured Axios instance exported for Redux thunks and services
// export const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const checkUserStatus = async () => {
//     try {
//       const { data } = await api.get('/auth/me');
//       if (data.success) {
//         setUser(data.user);
//       } else {
//         setUser(null);
//       }
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkUserStatus();
//   }, []);

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     if (data.success) {
//       setUser(data.user);
//     }
//     return data;
//   };

//   const loginWithGoogle = () => {
//     window.location.href = `${API_URL}/auth/google`;
//   };

// //   const loginWithGoogle = () => {
// //   window.location.href = `${API_URL}/auth/google`;
// // };

//   const logout = async () => {
//     try {
//       await api.post('/auth/logout');
//       setUser(null);
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         loginWithGoogle,
//         logout,
//         checkUserStatus,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// // Configured Axios instance exported for Redux thunks and services
// export const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// // Automatically attach JWT token to every request if present in localStorage
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const checkUserStatus = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await api.get('/auth/me');
//       if (data.success) {
//         setUser(data.user);
//       } else {
//         setUser(null);
//         localStorage.removeItem('token');
//       }
//     } catch {
//       setUser(null);
//       localStorage.removeItem('token');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkUserStatus();
//   }, []);

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     if (data.success && data.token) {
//       localStorage.setItem('token', data.token);
//       setUser(data.user);
//     }
//     return data;
//   };

//   const handleOAuthSuccess = async (token) => {
//     if (!token) return;
//     localStorage.setItem('token', token);
//     try {
//       const { data } = await api.get('/auth/me');
//       if (data.success) {
//         setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Failed to load user profile after OAuth:', error);
//       localStorage.removeItem('token');
//     }
//   };

//   const loginWithGoogle = () => {
//     window.location.href = `${API_URL}/auth/google`;
//   };

//   const logout = async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       localStorage.removeItem('token');
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         loginWithGoogle,
//         handleOAuthSuccess,
//         logout,
//         checkUserStatus,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// Configured Axios instance exported for API calls and services
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Automatically attach JWT token to every request if present in localStorage
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    } catch {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      if (data.user?._id) localStorage.setItem('userId', data.user._id);
      setUser(data.user);
    }
    return data;
  };

  const handleOAuthSuccess = async (token, userId) => {
    if (!token) throw new Error('No token provided');
    
    localStorage.setItem('token', token);
    if (userId) localStorage.setItem('userId', userId);

    try {
      const { data } = await api.get('/auth/me');
      if (data.success) {
        setUser(data.user);
        if (data.user?._id) localStorage.setItem('userId', data.user._id);
      }
    } catch (error) {
      console.error('Failed to load user profile after OAuth:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      throw error;
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        handleOAuthSuccess,
        logout,
        checkUserStatus,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);