import React, { useState } from "react";
import "./style.scss";
import logo from "../../../assets/images/logo4.png";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validator from "validator";
import { login } from "../../../text/apidata";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userdata } from "../../redux/reducer/counterslice";
import { useDispatch } from "react-redux";

function Login(props) {
  const [emailvalue, setEmailvalue] = useState("");
  const [passwordvalue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [userinfo, setuserinfo] = useState({
    username: "",
    password: "",
  });
  const loginpage = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("form submitted ✅");
  };

  const emailvalidation = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name);
    setuserinfo({
      ...userinfo,
      [name]: value,
    });
    var valueemail = e.target.value;
    setEmailvalue(valueemail);
    if (!valueemail) {
      setEmailError(true);
    }
    if (valueemail) {
      setEmailError(false);
      setEmailRequired(false);
      setValidEmail(false);
    }
  };

  const passwordvalidation = (e) => {
    // console.log(e.target.value);
    const { pass, valuepass } = e.target.value;
    setuserinfo({
      ...userinfo,
      password: e.target.value,
    });
    // console.log(userinfo, "999");
    var valuepassword = e.target.value;
    setPasswordValue(valuepassword);
    if (!valuepassword) {
      setPasswordError(true);
    }
    if (valuepassword) {
      setPasswordError(false);
    }
  };
  const signup = () => {
    console.log(passwordvalue, emailvalue);
    if (emailvalue) {
      if (passwordvalue != "") {
        console.log(userinfo, "999");
        props.loaderchange("true");
        // const res = axios
        //   .post(
        //     login,
        //     new URLSearchParams({
        // username: userinfo.username,
        // password: userinfo.password,
        //     })
        //   )

        // .then((res) => {
        //   console.log(res);
        //   localStorage.setItem("token", res.data.token);
        //   localStorage.setItem("login", "false");
        //   loginpage("/");
        //   props.loaderchange("false");
        //   props.popupalert("true");
        //   props.popuptext("Login Successfull");
        //   setTimeout(() => {
        //     props.popupalert("false");
        //   }, 3000);
        // })
        // .catch((error) => {
        //   console.log(error);

        //   props.loaderchange("false");
        //   props.popupalert("true");
        //   // props.popuptext(error.response.data.status.message);
        //   setTimeout(() => {
        //     props.popupalert("false");
        //   }, 2000);
        // });

        const formData = new FormData();
        formData.append("username", userinfo.username);
        formData.append("password", userinfo.password);

        axios({
          method: "post",
          url: login,
          data: formData,
        })
          .then((res) => {
            debugger
            console.log(res, "res", res.data.session.token.access);
            localStorage.setItem("token", res.data.session.token.access);
            localStorage.setItem("login", "false");
            loginpage("/");
            props.loaderchange("false");
            props.popupalert("true");
            props.popuptext("Login Successfull");
            setTimeout(() => {
              props.popupalert("false");
            }, 3000);
          })
          .catch((error) => {
            debugger
            console.log(error);

            props.loaderchange("false");
            props.popupalert("true");
            // props.popuptext(error.response.data.status.message);
            setTimeout(() => {
              props.popupalert("false");
            }, 2000);
          });
      } else {
        if (passwordvalue == "") {
          setPasswordError(true);
        }
      }
    } else {
      if (emailvalue) {
        setValidEmail(true);
        setEmailError(true);
      } else {
        setEmailRequired(true);
        setEmailError(true);
      }

      if (passwordvalue == "") {
        setPasswordError(true);
      }
    }
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <FormControl
                        style={{ margin: "8px", width: "335px" }}
                        error={emailerror}
                        id="emailid"
                        label=" Email"
                        type="text"
                        name="username"
                        className="Email"
                        onChange={(e) => emailvalidation(e)}
                        variant="outlined"
                      >
                        <InputLabel
                          htmlFor="outlined-adornment-email"
                          style={{ lineHeight: "0.9375em" }}
                        >
                          UserName
                        </InputLabel>
                        <OutlinedInput
                          placeholder="UserName"
                          label="UserName"
                          name="username"
                          style={{
                            backgroundColor: "white !important",
                            height: "42px",
                          }}
                        />
                        <FormHelperText id="username-helper" error={emailerror}>
                          {EmailRequired ? "UserName Required" : ""}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="form-group">
                      <FormControl
                        error={passworderror}
                        style={{ margin: "8px", width: "335px" }}
                        value={passwordvalue}
                        id="passwordid"
                        onChange={(e) => passwordvalidation(e)}
                        onKeyDown={(e) => {
                          if (e.which == "32") {
                            e.preventDefault();
                          }
                        }}
                        variant="outlined"
                      >
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          style={{ lineHeight: "0.9375em" }}
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          placeholder="********"
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          style={{ height: "42px" }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        <FormHelperText
                          id="username-helper"
                          error={passworderror}
                        >
                          {passworderror ? "Password Required" : ""}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="form-group">
                      <Button
                        type="submit"
                        label="Submit"
                        return={"false"}
                        onClick={(e) => signup(e)}
                        className="btn submit"
                        style={{ width: "344px", marginLeft: "5px" }}
                      >
                        <p>Login</p>
                      </Button>
                    </div>
                  </form>
                  <div className="text-center forgotpass">
                    <a
                      href=""
                      style={{ color: "#a0a0a0", textDecoration: "none" }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
