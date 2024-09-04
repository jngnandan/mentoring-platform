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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create the Medusa client with the Publishable API key
const medusaClient = new Client({
  baseUrl: 'http://localhost:9000',
  maxRetries: 3,
  bearerToken: 'productspk_01J6Z89AZ36TPD4JZTE2P3BKNXSep 4th 2024, 8:30:51',
});

// Create a QueryClient instance
const queryClient = new QueryClient();

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <MedusaProvider client={medusaClient} queryClientProviderProps={{ client: queryClient }}>
        <ContentProvider>
          <App />
        </ContentProvider>
      </MedusaProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();