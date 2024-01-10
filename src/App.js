import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/maincomponent/navbar";
import SideBar from "./components/maincomponent/sidebar";
import Login from "./components/maincomponent/login/login";
import PrivateRoutes from "./components/maincomponent/login/privateroutes";
import ActionAlerts from "./components/maincomponent/popupalert/popupalert";
import CircularIndeterminate from "./components/maincomponent/loader/progressloader";
import Adminpage from "./components/pages/adminpage";
import ErrorPage from "./components/error/errorpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "rsuite/dist/rsuite.css";
import { admincreate } from "./text/apidata";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Client from "./components/pages/Clientdetails";
import { ToastContainer } from "react-toastify";

import ClientDetailsForm from "./components/pages/Clientdetails";

function App() {
  const Error = useNavigate();
  const popup = useSelector((state) => state.counter.popupalert);
  const loaderdata = useSelector((state) => state.counter.loader);

  var logintest = localStorage.getItem("login");
  const [alertpopuptext, setalertpopuptext] = useState("");
  const [loader, setLoader] = useState(loaderdata);
  const [alertpopup, setalertpopup] = useState(popup);

  const [errorstatus, seterrorstatus] = useState("");
  // useEffect(()=>{
  //   handleChnage("1")
  //     },[])
  //     const handleChnage=(e)=>{
  //       var browserZoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
  //       console.log(browserZoomLevel,(window.innerHeight),window.innerWidth)
  //       var doc=document.getElementsByClassName("App")
  //       let zoom=(window.innerWidth/1820)*100
  //       console.log(Math.round(zoom))
  //       doc[0].style.zoom=`${Math.round(zoom)}%`
  //     }

  //     window.addEventListener("resize",handleChnage)
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: admincreate,
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token") + "",
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res, "###########################################");
  //     })
  //     .catch((error) => {
  //       // console.log(error, "###########################################");
  //       seterrorstatus(error.response.status);
  //       if (error.response.status) {
  //         if (logintest == "false") {
  //           Error("/Error");
  //         }
  //       }
  //     });
  // }, [alertpopup]);
  const loaderchange = (arg) => {
    setLoader(arg);
  };

  const popupalert = (arg) => {
    setalertpopup(arg);
  };
  const popuptext = (arg) => {
    setalertpopuptext(arg);
  };

  return (
    <div className="App">
      <ToastContainer limit={1} />
      {loader == "true" ? (
        <div
          className="loader"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: "999",
          }}
        >
          <CircularIndeterminate />
        </div>
      ) : (
        ""
      )}

      {alertpopup == "true" ? (
        <ActionAlerts alertpopuptext={alertpopuptext} popupalert={popupalert} />
      ) : (
        ""
      )}

      <>
        {logintest == "false" ? (
          <>
            <Navbar popupalert={popupalert} popuptext={popuptext} />
            <SideBar />
            <Routes>
              {/* <Route
                element={
                  <DashBoard
                    loaderchange={loaderchange}
                    popupalert={popupalert}
                    popuptext={popuptext}
                  />
                }
                path="/"
              /> */}
              {/* <Route element={<TestPage/>} path="/TestPage"></Route> */}
              {/* <Route
                element={
                  <Adminpage
                    loaderchange={loaderchange}
                    popupalert={popupalert}
                    popuptext={popuptext}
                  />
                }
                path="/"
              ></Route> */}
              <Route
                element={
                  <Client
                    loaderchange={loaderchange}
                    popupalert={popupalert}
                    popuptext={popuptext}
                  />
                }
                path="/"
              ></Route>
              
              <>
                <Route
                  element={<ErrorPage errorstatus={errorstatus} />}
                  path="/Error"
                ></Route>
              </>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route element={<PrivateRoutes />} path="/" exact />
            <Route
              path="/login"
              element={
                <Login
                  loaderchange={loaderchange}
                  popupalert={popupalert}
                  popuptext={popuptext}
                />
              }
            />
          </Routes>
        )}
      </>
    </div>
  );
}

export default App;
