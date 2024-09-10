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
import Demo from './Pages/Components/Header/Demo.tsx'; // Correct relative import

// Create the Medusa client with the Publishable API key
const medusaClient = new Client({
  baseUrl: 'http://localhost:9000',
  maxRetries: 3,
  bearerToken: 'productspk_01J6Z89AZ36TPD4JZTE2P3BKNXSep 4th 2024, 8:30:51', // Ensure to keep this secure in production
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <MedusaProvider client={medusaClient} queryClientProviderProps={{ client: queryClient }}>
        <ContentProvider>
          {/* <Demo />  */}
          <App />
        </ContentProvider>
      </MedusaProvider>
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();