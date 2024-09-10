import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { Client } from '@medusajs/medusa-js';
import { QueryClient } from "@tanstack/react-query";
import '@mantine/core/styles.css';
import { Button } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';

// Pages
import HomePage from "./Pages/Home/HomePage.tsx";
import AuthenticationForm from "./Pages/Authentication/Login/AuthenticationForm.tsx";
import SignupForm from "./Pages/Authentication/Signup/SignupForm.tsx";
// import ComparisionPage from "./Pages/ComparisionPage/ComparisionPage.tsx";
import About from "./Pages/About/index.tsx";
import { ContactUs } from "./Pages/ContactPage/ContactUs.tsx";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword.tsx";
import Mentors from "./Pages/Mentors/Mentors.tsx";
import MentorRegister from "./Pages/MentorRegister/MentorRegister.tsx";
import MentorsPage from "./Pages/MentorsPage/index.tsx";

// Components
import Header from "./Pages/Components/Header/Header.tsx";
import FooterLinks from "./Pages/Components/Footer/FooterLinks.tsx";
import CookieConsentBanner from './Pages/Cookies/index.js';
import NavBar from './Pages/NavBar/NavbarSimple.tsx';
import ProtectedRoute from './ProtectedRoute.js';
import MentorDashboard from './Pages/MentorDashboard/MentorDashboard.tsx';

// Create the Medusa client
const medusaClient = new Client({
  baseUrl: 'http://localhost:9000',
  maxRetries: 3,
});

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <CookieConsentBanner/>
      <Analytics />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthenticationForm />} />
        {/* <Route path="/compare" element={<ComparisionPage />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <Mentors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <NavBar />
            </ProtectedRoute>
          }
        />
        <Route path="/mentor-register" element={<MentorRegister />} />
        <Route path="/mentors/:id" element={<MentorsPage />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard/>} />

        {/* <Route path="/profile" element={<NavBar />} /> */}
      </Routes>
      {showScrollTop && (
        <Button
          onClick={scrollTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <IconArrowUp size="1rem" />
          Scroll top
        </Button>
      )}
      {/* <FooterLinks /> */}
    </BrowserRouter>
  )
}

export default App;