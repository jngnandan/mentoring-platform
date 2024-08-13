
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

import Deals from "../src/Pages/Categories/Deals/index.tsx"
import News from "../src/Pages/Categories/News/index.tsx"


function App() {
  return (

    <BrowserRouter>
      <Header/>
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
      </Routes>
    </BrowserRouter>

  );
}

export default App;
