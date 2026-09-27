import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import DocumentListPage from './pages/Documents/DocumentListPage';
import DocumentDetailPage from './pages/Documents/DocumentDetailPage';
import FlashcardListPage from './pages/Flashcards/FlashcardListPage';
import FlashcardPage from './pages/Flashcards/FlashcardPage';
import QuizTakePage from './pages/Quizzes/QuizTakePage';
import QuizResultPage from './pages/Quizzes/QuizResultPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { useAuth } from './context/AuthContext';
import SplashCursor from './components/SplashCursor';
import { useDeviceCapabilities } from './hooks/useDeviceCapabilities';

const App = () => {
  const {isAuthenticated, loading} = useAuth();
  const { reducedMotion, isTouchDevice } = useDeviceCapabilities();

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return(
      <>
        {!reducedMotion && !isTouchDevice && (
          <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
            SHADING={true}
            RAINBOW_MODE={false}
            COLOR="#6366F1"
          />
        )}
        <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
               <Navigate to="/dashboard" replace/>
               ) : (
               <LandingPage />
               )
            }
          />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

          {/*Protected Routes*/}
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/documents" element={<DocumentListPage/>}/>
            <Route path="/documents/:id" element={<DocumentDetailPage/>}/>
            <Route path="/flashcards" element={<FlashcardListPage/>}/>
            <Route path="/documents/:id/flashcards" element={<FlashcardPage/>}/>
            <Route path="/quizzes/:quizId" element={<QuizTakePage/>}/>
            <Route path="/quizzes/:quizId/results" element={<QuizResultPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>


          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
      </>
  );
}

export default App;