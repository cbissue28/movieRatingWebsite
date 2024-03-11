import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from 'react-toastify'

// Create a new instance of QueryClient for managing queries in the application
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide the QueryClient to the entire application using QueryClientProvider */}
    <QueryClientProvider client={queryClient}> 
    <App />
    {/* ToastContainer for displaying notifications */}
    <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
