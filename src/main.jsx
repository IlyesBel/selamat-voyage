import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ExcursionPage from './ExcursionPage.jsx'
import './index.css'
import 'iconify-icon'
import { addCollection } from 'iconify-icon'
import lucide from '@iconify-json/lucide/icons.json'
import simpleIcons from '@iconify-json/simple-icons/icons.json'
addCollection(lucide)
addCollection(simpleIcons)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/excursion/:slug" element={<ExcursionPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)