import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate,useForceUpdate } from "react-router-dom";

function PrivateRoutes({ component: Component, ...restOfProps }) {
  const loginpage = useNavigate();  
useEffect(()=>{
  var logintest = localStorage.getItem("login");
  console.log("$$$$$$$$$$$$$")
  if (logintest == "false") {
  } else {
    loginpage("/login");
  }
},[])
}
export default PrivateRoutes;
