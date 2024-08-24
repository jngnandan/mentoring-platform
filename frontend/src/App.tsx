
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Products/Products";
import Header from "./Pages/Header/Header.tsx";
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import HomePage from "./Pages/Home/HomePage.tsx";
import AuthenticationForm from "./Pages/Login/AuthenticationForm.tsx";
import Products from "./Pages/Products/Products.tsx";
import FooterLinks from "./Pages/Footer/FooterLinks.tsx";
import ProductPage from "./Pages/ProductPage/ProductPage.tsx";
import CatelogPage from "./Pages/CatelogPage/CatelogPage.tsx";
import ComparisionPage from "./Pages/ComparisionPage/ComparisionPage.tsx";
// import FilterSearch from "./Pages/FilterSearch/FilterSearch.tsx";
import About from "./Pages/About/index.tsx";
import { ContactUs } from "./Pages/ContactPage/ContactUs.tsx";

import Deals from "../src/Pages/Categories/Deals/index.tsx";
import News from "../src/Pages/Categories/News/index.tsx";

import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword.tsx";

import SignupForm from "./Pages/Signup/SignupForm.tsx";
// import SignupPage from "./Pages/SignupPage/index.tsx";
import Mentors from "./Pages/Mentors/Mentors.tsx";
import MentorRegister from "./Pages/MentorRegister/MentorRegister.tsx";
import MentorsPage from "./Pages/MentorsPage/index.tsx";

import CookieConsentBanner from '../src/Pages/Components/CookieConsentBanner.js';
import '@mantine/core/styles.css'; // Import Mantine styles
// import SignIn from "./Pages/Components/GoogleButton.js";

function App() {
  return (

    <BrowserRouter>
      <Header/>
      <CookieConsentBanner />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/login" element={<AuthenticationForm/>}/>
        <Route exact path='/products' element={<Products/>}/>
        <Route path="/products/:productId" element={<ProductPage />} />
        {/* <Route path="/catelog" element={<CatelogPage/>}/> */}
        {/* <Route exact path='/filter' element={<FilterSearch/>}/> */}
        <Route exact path="/deals" element={<Deals/>}/>
        <Route exact path="/news" element={<News/>}/>
        <Route exact path="/compare" element={<ComparisionPage/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<ContactUs/>}/>
        <Route exact path="/forgot-password" element={<ForgotPassword/>}/>

        <Route exact path="/signup" element={<SignupForm/>}/>

        {/* <Route exact path="/signup-page" element={<SignupPage/>}/> */}
        <Route exact path='mentors' element={<Mentors/>}/>

        <Route exact path='/mentor-register' element={<MentorRegister/>}/>

        <Route exact path="mentors/:id" element={<MentorsPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
