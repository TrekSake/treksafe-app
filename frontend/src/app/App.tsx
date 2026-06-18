import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SenderistaLayout } from '@/components/SenderistaLayout';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterHikerPage } from '@/pages/RegisterHikerPage';
import { RegisterRescuerPage } from '@/pages/RegisterRescuerPage';
import { RescatistaHomePage } from '@/pages/RescatistaHomePage';
import { SenderistaHomePage } from '@/pages/SenderistaHomePage';
import { SenderistaProfilePage } from '@/pages/SenderistaProfilePage';
import { MedicalInfoPage } from '@/pages/MedicalInfoPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { ExpeditionListPage } from '@/pages/ExpeditionListPage';
import { CreateExpeditionPage } from '@/pages/CreateExpeditionPage';
import { ActiveExpeditionPage } from '@/pages/ActiveExpeditionPage';
import { CheckInSuccessPage } from '@/pages/CheckInSuccessPage';

function RootRedirect() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  return (
    <Navigate to={user.role === 'rescatista' ? '/rescatista' : '/senderista'} replace />
  );
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/hiker" element={<RegisterHikerPage />} />
          <Route path="/register/rescuer" element={<RegisterRescuerPage />} />
          <Route
            path="/senderista"
            element={
              <ProtectedRoute role="senderista">
                <SenderistaLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SenderistaHomePage />} />
            <Route path="perfil" element={<SenderistaProfilePage />} />
            <Route path="perfil/medica" element={<MedicalInfoPage />} />
            <Route path="perfil/contactos" element={<ContactsPage />} />
            <Route path="expedicion" element={<ExpeditionListPage />} />
            <Route path="expedicion/activa" element={<ActiveExpeditionPage />} />
            <Route path="expedicion/confirmada" element={<CheckInSuccessPage />} />
            <Route path="expedicion/nueva" element={<CreateExpeditionPage />} />
          </Route>
          <Route
            path="/rescatista"
            element={
              <ProtectedRoute role="rescatista">
                <RescatistaHomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
