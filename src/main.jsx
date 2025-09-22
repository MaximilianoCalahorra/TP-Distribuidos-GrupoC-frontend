import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './theme/theme.js'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./store/userStore";

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>
)
