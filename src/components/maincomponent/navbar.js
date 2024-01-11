import logo from "../../assets/images/logo4.png";
import textlogo from "../../assets/images/skg-new-logo.svg";
import profileimage from "../../assets/images/patient.png";
import "../style/maincompstyle/navbar.scss";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { sidenav, sidebar } from "../redux/reducer/counterslice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutimg from "../../assets/images/6275.jpg";
import $ from "jquery";

function Navbar(props) {
  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const [navactive, setnavactive] = useState(sideactive);
  const [logoutstate, setlogoutstate] = useState(false);
  const sidebar1 = useDispatch();
  const logoutpage = useNavigate();
  const sidebarmenustate = useDispatch();
  const [logoutpopup, setlogoutpopup] = useState(false);
  const user_details = useSelector((state) => state.counter.userdata);
  //  console.log(user_details.username)
  const toggleOpen = (e) => {
    if (sideactive == false) {
      setnavactive(true);
      sidebar1(sidenav(true));
    } else {
      setnavactive(!navactive);
      sidebar1(sidenav(!navactive));
    }
  };
  const logout = (e) => {
    logoutpage("/login");
    window.location.href = "/login";
    props.popupalert("true");
    props.popuptext("Logout Successfull");
    setTimeout(() => {
      props.popupalert("false");
    }, 4000);

    localStorage.clear();
  };

  $(document).click(function (e) {
    // console.log(e.target.classList);
    if (!(e.target.classList[1] == "nav_profile_get")) {
      setlogoutpopup(false);
    } else {
      setlogoutpopup(true);
    }
  });

  return (
    <>
      <div className="header">
        <div
          className={sideactive ? "header-left" : "header-left-inactive"}
          onClick={(e) => {
            sidebarmenustate(sidebar("Client Details"));
            window.location.href = "/";
          }}
        >
          {sideactive ? (
            <img
              className="header_img"
              style={
                {
                  // width: " 204px",
                  // height: "50px",
                  // padding: "1px",
                  // marginRight: "33px",
                }
              }
              src={textlogo}
            ></img>
          ) : (
            <img src={logo} style={{ background: "transparent" }}></img>
          )}
        </div>
        <div className="navmenu">
          <MenuRoundedIcon
            style={{
              width: "40px",
              height: "30px",
              cursor: "pointer",
            }}
            onClick={toggleOpen}
          />
        </div>

        {/* <ul className="nav user-menu">
          <li>
            <LogoutIcon
            style={{cursor:'pointer'}}
            onClick={(e)=>{setlogoutstate(true)}}
            />
          </li>
        </ul> */}
        <div
          className="user_details nav_profile_get"
          onClick={(e) => {
            setlogoutpopup(!logoutpopup);
          }}
        >
          <img src={profileimage} className="image nav_profile_get"></img>
          <div className="name nav_profile_get">
            <span className="name nav_profile_get">
              {user_details && user_details.username != undefined
                ? user_details.username
                : ""}
            </span>
          </div>
        </div>
      </div>
      {logoutstate && (
        <div className="logout_popup">
          <div class="container1">
            <div class="cookiesContent" id="cookiesPopup">
              <button
                class="close"
                onClick={(e) => {
                  setlogoutstate(false);
                }}
              >
                ✖
              </button>
              <img src={logoutimg} alt="cookies-img" />
              <h1>Logout!</h1>
              <p>You Will Be Returned To Login Screen </p>
              <button class="accept" onClick={(e) => logout()}>
                That's fine!
              </button>
            </div>
          </div>
        </div>
      )}
      {logoutpopup && (
        <div className="nav_profile nav_profile_get">
          {/* <div className="inner_profile">
            <div>
              <img src={profileimage} className="image1"></img>
            </div>
            <div className="user_details1">
              <p className="heading">
                User:{" "}
                <span className="data">
                  {user_details && user_details.username != undefined
                    ? user_details.username
                    : ""}
                </span>
              </p>
              <p className="heading">
                Location:
                <span className="data">
                  {user_details && user_details.location != undefined
                    ? user_details.location
                    : ""}
                </span>
              </p>
              <p className="heading">
                Role:
                <span className="data">
                  {user_details && user_details.role != undefined
                    ? user_details.role
                    : ""}
                </span>
              </p>
            </div>
          </div> */}
          <div className="sign_out">
            <button
              className="sign_out_button  btn btn-primary"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setlogoutstate(true);
              }}
            >
              sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
