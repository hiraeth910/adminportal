import React from 'react'
import "./index.scss";
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './firebase/auth.tsx'
import Login from './firebase/login.tsx'
import ScrollToTop from './components/common/scrolltotop/scrolltotop.tsx';
import Error401 from './container/errors/error401/error401.tsx';
import Providers from './pages/provider.tsx';
import Products from './pages/product.tsx';
import Withdrawals from './pages/withdrawl.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense>
        <Routes>
          <Route path={'/'} element={<Auth />}>
            <Route index element={<Login />} />
            <Route
              path={'login'}
              element={<Login />}
            />
          
          </Route>
          <Route path={`/`} element={<App />}>
           
            <Route
              path={`/errors/error401`}
              element={<Error401 />}
            />
           
            <Route
              path={`/onboarding/provider`}
              element={<Providers/>}
            />
            <Route
              path={`/onboarding/prducts`}
              element={<Products/>}
              
            />
            <Route
              path={`/user/withdrawl`}
              element={<Withdrawals/>}/>
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
