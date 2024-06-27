import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
if (!("theme" in sessionStorage)) {
  sessionStorage.theme = "light";
  
} else if (sessionStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else{
  document.documentElement.classList.remove("dark");
}
