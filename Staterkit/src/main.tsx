import React from 'react'
import "./index.scss";
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sales from "./container/dashboards/sales/sales.tsx";
import Auth from './firebase/auth.tsx'
import Login from './firebase/login.tsx'
import Signup from './firebase/signup.tsx'
import ScrollToTop from './components/common/scrolltotop/scrolltotop.tsx';
import Error401 from './container/errors/error401/error401.tsx';
import Categories from './container/dashboards/sales/categories.tsx';
import Providers from './pages/provider.tsx';
import Products from './pages/product.tsx';
import Withdrawals from './pages/withdrawl.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
            <Route index element={<Login />} />
            <Route
              path={`${import.meta.env.BASE_URL}firebase/login`}
              element={<Login />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}firebase/signup`}
              element={<Signup />}
            />
          </Route>
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/sales`}
              element={<Sales />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}errors/error401`}
              element={<Error401 />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}categories/first_category`}
              element={<Categories/>}
            />
            <Route
              path={`${import.meta.env.BASE_URL}onboarding/provider`}
              element={<Providers/>}
            />
            <Route
              path={`${import.meta.env.BASE_URL}onboarding/prducts`}
              element={<Products/>}
              
            />
            <Route
              path={`${import.meta.env.BASE_URL}user/withdrawl`}
              element={<Withdrawals/>}/>
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
