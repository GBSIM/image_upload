import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ImageProvider from './components/ImageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>
);