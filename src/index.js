import { CategoriesProvider } from './contexts/categories.context';
// import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import React from 'react';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {/* <UserProvider> */}
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      {/* </UserProvider> */}
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
