import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import { ContentProvider } from './context/ContentContext.tsx';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { MedusaProvider } from 'medusa-react';
import { Client } from '@medusajs/medusa-js';
import { QueryClient } from "@tanstack/react-query";
import Demo from './Pages/Components/Header/Demo.tsx'; // Ensure relative import path is correct

// Load the bearer token securely from environment variables
const medusaBearerToken = process.env.REACT_APP_MEDUSA_BEARER_TOKEN;

// Check if the token is loaded successfully
if (!medusaBearerToken) {
  console.error("Medusa bearer token is missing. Please ensure it's set in your environment variables.");
}

// Create the Medusa client with the Publishable API key
const medusaClient = new Client({
  baseUrl: process.env.REACT_APP_MEDUSA_BASE_URL || 'http://localhost:9000', // Ensure baseUrl is set via env for production
  maxRetries: 3,
  bearerToken: medusaBearerToken, // Secure the token
});

// Create a QueryClient instance
const queryClient = new QueryClient();

// Define the custom Mantine theme
const theme = createTheme({
  colorScheme: 'light', // Set initial color scheme
  primaryColor: 'blue',
  fontFamily: 'Arial, sans-serif',
  headings: { fontFamily: 'Roboto, sans-serif' },
  colors: {
    brand: [
      '#f0f4ff',
      '#dce4ff',
      '#b4c7ff',
      '#8aaaff',
      '#5f8dff',
      '#396eff',
      '#1051ff',
      '#0034d4',
      '#0026a1',
      '#00136e',
    ],
  },
});

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <MedusaProvider client={medusaClient} queryClientProviderProps={{ client: queryClient }}>
        <ContentProvider>
          {/* Uncomment the Demo component if needed */}
          {/* <Demo /> */}
          <App />
        </ContentProvider>
      </MedusaProvider>
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();