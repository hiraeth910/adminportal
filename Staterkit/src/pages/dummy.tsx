import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/header/header";
import Switcher from "../components/common/switcher/switcher";
import Sidebar from "../components/common/sidebar/sidebar";
import Pageheader from "../components/pageheader/pageheader";
import { Outlet } from "react-router-dom";
import Tabtotop from "../components/common/tab-to-tap/tabtotap";
import Home from "../firebase/login";


const selectAuthToken = (state:any) => state.authToken;

const DummyComponent = () => {
  const authToken = useSelector(selectAuthToken); // Retrieve authToken from Redux state
 
  return authToken ? (
    // Render usual layout if authToken exists
    <>
      <Switcher />
      <div className="page">
        <Header />
        <Sidebar />
        <Pageheader />
        <div className="main-content app-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        
      </div>
      <Tabtotop />
    </>
  ) : (
    // Render Home component if authToken is null
    <Home />
  );
};

export default DummyComponent;
