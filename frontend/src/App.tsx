import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { MedusaProvider } from 'medusa-react'; // Import MedusaProvider
import { Client } from '@medusajs/medusa-js'; // Import Medusa client
import { QueryClient } from "@tanstack/react-query";
import '@mantine/core/styles.css'; // Import Mantine styles

// Pages
import HomePage from "./Pages/Home/HomePage.tsx";
import AuthenticationForm from "./Pages/Login/AuthenticationForm.tsx";
import Products from "./Pages/Products/Products.tsx";
import ProductPage from "./Pages/ProductPage/ProductPage.tsx";
import CatelogPage from "./Pages/CatelogPage/CatelogPage.tsx";
import ComparisionPage from "./Pages/ComparisionPage/ComparisionPage.tsx";
import About from "./Pages/About/index.tsx";
import { ContactUs } from "./Pages/ContactPage/ContactUs.tsx";
import Deals from "./Pages/Categories/Deals/index.tsx";
import News from "./Pages/Categories/News/index.tsx";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword.tsx";
import SignupForm from "./Pages/Signup/SignupForm.tsx";
import Mentors from "./Pages/Mentors/Mentors.tsx";
import MentorRegister from "./Pages/MentorRegister/MentorRegister.tsx";
import MentorsPage from "./Pages/MentorsPage/index.tsx";

// Components
import Header from "./Pages/Header/Header.tsx";
import FooterLinks from "./Pages/Footer/FooterLinks.tsx";
import CookieConsentBanner from './Pages/Components/CookieConsentBanner.js';

import NavBar from './Pages/NavBar/NavbarSimple.tsx'

// Create the Medusa client
const medusaClient = new Client({
  baseUrl: 'http://localhost:9000', // Use the backend URL directly
  maxRetries: 3,
});

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    // <MedusaProvider client={medusaClient} queryClientProviderProps={{ client: queryClient }}>
      <BrowserRouter>
        <Analytics />
        <Header />
        <CookieConsentBanner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthenticationForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          {/* <Route path="/catelog" element={<CatelogPage />} /> */}
          {/* <Route path="/filter" element={<FilterSearch />} /> */}
          <Route path="/deals" element={<Deals />} />
          <Route path="/news" element={<News />} />
          <Route path="/compare" element={<ComparisionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* <Route path="/signup-page" element={<SignupPage />} /> */}
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentor-register" element={<MentorRegister />} />
          <Route path="/mentors/:id" element={<MentorsPage />} />
          <Route path="/profile" element={<NavBar/>} />
        </Routes>
        {/* <FooterLinks /> */} {/* Uncomment if needed */}
      </BrowserRouter>
    // </MedusaProvider>
  )
}

export default App;