import React,{useEffect,lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// import ProtectedRoute from './components/ProtectedRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import OAuthSuccess from './pages/OAuthSuccess';
// import HealthDashboard from './components/HealthDashboard/HealthDashboard';
import {useDispatch } from 'react-redux';
import {fetchFitnessData} from './store/fitnessActions'









const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OAuthSuccess = lazy(() => import('./pages/OAuthSuccess'));
const HealthDashboard = lazy(() => import('./components/HealthDashboard/HealthDashboard'));



function App() {


   const dispatch=useDispatch()

    useEffect(() => {
    dispatch(fetchFitnessData());
    }, [dispatch]);

  return (
<Suspense fallback={<div>Loading Dashboard...</div>}>
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HealthDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

    </AuthProvider>
    </Suspense>
  );
}

export default App;
