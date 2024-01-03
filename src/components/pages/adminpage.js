import { useSelector, useDispatch } from "react-redux";
import "../style/page/adminpage.scss";
import { NavLink } from "react-router-dom";
import BasicTable from "../maincomponent/reacttable/table";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { adminlist } from "../../text/apidata";
import { editadminuser } from "../redux/reducer/counterslice";
import { editadminuserid, sidebar } from "../redux/reducer/counterslice";
import { FormControl } from "@material-ui/core";
import "react-tooltip/dist/react-tooltip.css";
import IconButton from "@mui/material/IconButton";
import { InputLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { admincreate } from "../../text/apidata";
import Input from "@mui/material/Input";
import validator from "validator";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Swal from "sweetalert2";
export default function Adminpage(props) {
  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const [tableheaderdata, settableheaderdata] = useState([]);
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const newadminuserform = useNavigate();
  const dispatch = useDispatch();
  const edituseridvalue = useDispatch();
  const loaderdispatch = useDispatch();
  const [age, setAge] = React.useState();
  ////page
  const [creatpasswordvalue, setCreatPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setalert] = useState(false);
  console.log(creatpasswordvalue);

  const [creatuserinfo, setcreatuserinfo] = useState(
    creatpasswordvalue != ""
      ? {
          username: "",
          // password: "",
          email: "",
          full_name: "",
          is_active: "false",
          role: "",
          location: "",
        }
      : {
          username: "",
          email: "",
          full_name: "",
          is_active: false,
          role: "",
          location: "",
        }
  );

  const [createmailvalue, setCreatEmailvalue] = useState("");
  const [emailerror, setemailerror] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [fullnamederror, setfullnamederror] = useState(false);
  const [usernameerror, setusernamederror] = useState(false);
  const edituser = useSelector((state) => state.counter.edituser);
  const edituserid = useSelector((state) => state.counter.edituserid);
  const [location, setloaction] = useState([
    { value: "Super Admin", id: "all" },
    { value: "CHETPET", id: "90" },
    { value: "VELACHERY", id: "91" },
    { value: "KOLATHUR", id: "92" },
  ]);
  //update

  const [getemail, setGetemail] = useState("");
  const [getfullname, setGetfullname] = useState("");
  const [getusername, setGetusername] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [checkboxvalue, setCheckboxvalue] = useState(false);
  const [role, setrole] = useState([
    "Super Admin",
    "Doctor Admin",
    "Pharmacy Admin",
    "Diagnostics Admin",
  ]);


  const [isactivefilterdata,setisactivefilterdata]=useState("")

  const [roleerror, setroleerror] = useState(false);
  const [locationsrr, setlocationerr] = useState(false);
  const adminuser = useNavigate();
  // const dispatch = useDispatch();
  const [popup, setpopup] = useState(false);

  const [deleteadminid, setdeleteadminid] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const checkbox = (e) => {
    setalert(true);

    setChecked(!checked);
    setCheckboxvalue(!checked);
    setcreatuserinfo({
      ...creatuserinfo,
      is_active: !checked,
    });
    console.log(!checked);
  };
  const cancelnewuser = () => {
    console.log(alert);
    if (alert) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, revert it!",
      }).then((result) => {
        if (result.isConfirmed) {
          //Swal.fire("Reverted!", "Given Info has been Removed.", "success");
          adminuser("/AdminUser");
          dispatch(editadminuser(""));
          setalert(false);
        }
      });
    } else {
      adminuser("/AdminUser");
      dispatch(editadminuser(""));
      setalert(false);
    }
  };

  useEffect(() => {
    if (edituser == "activeedituser") {
      // console.log(edituserid,edituser,"edituser")
      props.loaderchange("true");
      axios({
        method: "get",
        url: admincreate + edituserid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          console.log(res.data.data);

          if (res.status == 200) {
            setTimeout(() => {
              setGetemail(res.data.data.email);
              setGetfullname(res.data.data.full_name);
              setGetusername(res.data.data.username);
              setChecked(res.data.data.is_active);
              // setCreatPasswordValue(null);
            }, 100);
            const username = "username";
            const fullname = "full_name";
            const email = "email";
            setCreatEmailvalue(res.data.data.email);
            setcreatuserinfo({
              ...creatuserinfo,
              [username]: res.data.data.username,
              [fullname]: res.data.data.full_name,
              [email]: res.data.data.email,
              is_active: res.data.data.is_active,
              role: res.data.data.role,
              location: res.data.data.location,
            });
            props.loaderchange("false");
          }
        })
        .catch((error) => {
          console.log(error);
          props.loaderchange("false");
        });
    }
  }, [edituser, edituserid]);

  const emailvalidation = (e) => {
    setalert(true);

    // console.log(e.target.value);
    setGetemail(e.target.value);
    const { name, value } = e.target;
    setCreatEmailvalue(e.target.value);
    setcreatuserinfo({
      ...creatuserinfo,
      email: value,
    });
    var emailvalid = e.target.value;

    if (e.target.value) {
      setemailerror(false);
      setEmailRequired(false);
      setValidEmail(false);
    } else {
      setemailerror(true);
      setEmailRequired(true);
      setValidEmail(false);
    }
  };
  const passwordvalidation = (e) => {
    setalert(true);

    const { pass, valuepass } = e.target.value;

    setCreatPasswordValue(e.target.value);
    setcreatuserinfo({
      ...creatuserinfo,
      password: e.target.value,
    });
    var valuepassword = e.target.value;
    if (!valuepassword) {
      setPasswordError(true);
    }
    if (valuepassword) {
      setPasswordError(false);
    }
  };
  const fullnamevalidation = (e) => {
    setalert(true);

    const re = /^[A-Za-z ]+$/;
    console.log(re.test(e.target.value));
    if (e.target.value === "" || re.test(e.target.value)) {
      setGetfullname(e.target.value);
      setcreatuserinfo({
        ...creatuserinfo,
        full_name: e.target.value.trim().split(/ +/).join(" "),
      });
      var fullnamefield = e.target.value;

      if (!fullnamefield) {
        setfullnamederror(true);
      }
      if (fullnamefield) {
        setfullnamederror(false);
      }
    }
  };
  const usernamevalidation = (e) => {
    setalert(true);

    console.log(e, e.which);

    // const re = /^[A-Za-z ]+$/;
    if (e.target.value === "" || !e.target.value.includes(" ")) {
      setGetusername(e.target.value);
      setcreatuserinfo({
        ...creatuserinfo,
        username: e.target.value,
      });
      var username = e.target.value;

      if (!username) {
        setusernamederror(true);
      }
      if (username) {
        setusernamederror(false);
      }
    }
  };

  const rolevalidation = (e) => {
    setalert(true);

    setcreatuserinfo({
      ...creatuserinfo,
      role: e.target.value,
    });
  };
  const locationvalidation = (e) => {
    setalert(true);
    setcreatuserinfo({
      ...creatuserinfo,
      location: e.target.value,
    });
  };
  const newusercreat = () => {
    console.log(creatuserinfo);
    var emailregex = /^([A-Za-z]|[0-9])+$/;

    if (
      validator.isEmail(createmailvalue) &&
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
        createmailvalue
      ) &&
      createmailvalue != "" &&
      getusername != "" &&
      getfullname != "" &&
      // creatpasswordvalue != ""
      creatuserinfo.role != ""
    ) {
      if (edituser == "activeedituser") {
        //editadmin
        if (creatuserinfo.password == "") {
          delete creatuserinfo.password;
          console.log("asdsa");
        }
        props.loaderchange("true");
        axios({
          method: "put",
          data: creatuserinfo,
          url: admincreate + edituserid + "/",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") + "",
          },
        })
          .then((res) => {
            if (res.status == 200) {
              props.popupalert("true");
              props.popuptext("Admin Updated Successfully");
              setTimeout(() => {
                props.popupalert("false");
              }, 2000);
              // window.location.href = "/AdminUser";
              setalert(false);

              adminuser("/AdminUser");
              props.loaderchange("false");
              dispatch(editadminuser(""));
            }
          })
          .catch((error) => {
            console.log(error);
            props.popupalert("true");
            props.popuptext("");
            setTimeout(() => {
              props.popupalert("false");
            }, 2000);
            props.loaderchange("false");
          });
      } else {
        //createadmin
        if (creatuserinfo.password == "") {
          delete creatuserinfo.password;
        }

        if (
          creatpasswordvalue != "" &&
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(creatpasswordvalue)
        ) {
          console.log(creatuserinfo);
          props.loaderchange("true");
          axios({
            method: "post",
            data: creatuserinfo,
            url: admincreate,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token") + "",
            },
          })
            .then((res) => {
              if (res.status == 200) {
                props.popupalert("true");
                props.popuptext("Admin Created Successfully");
                setTimeout(() => {
                  props.popupalert("false");
                }, 2000);
                dispatch(editadminuser(""));
                adminuser("/AdminUser");
                setalert(false);

                props.loaderchange("false");

                // window.location.href = "/AdminUser";
              }
            })
            .catch((error) => {
              console.log(error);
              props.loaderchange("false");
              props.popupalert("true");
              props.popuptext(error.response.data.status.message);
              setTimeout(() => {
                props.popupalert("false");
              }, 2000);
            });
        } else {
          if (creatpasswordvalue == "") {
            setPasswordError(true);
          }
        }
      }
    } else {
      console.log("sgdgsh", createmailvalue);
      if (createmailvalue == "") {
        setEmailRequired(true);
        setemailerror(true);
        setValidEmail(true);
        setemailerror(true);
      }
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
          createmailvalue
        )
      ) {
        setValidEmail(true);
        setemailerror(true);
      }
      if (getfullname == "") {
        setfullnamederror(true);
      }
      if (getusername == "") {
        setusernamederror(true);
      }
      if (creatpasswordvalue == "") {
        setPasswordError(true);
      }
      if (creatuserinfo.role == "") {
        setroleerror(true);
      }
      if (creatuserinfo.location == "") {
        setlocationerr(true);
      }
    }
  };
  ////page
  // console.log(tableheaderdata[0]);
  const dropdownhandlechange = (event, e) => {
    setAge(e.target.value);
    setemailerror(false);
    setValidEmail(false);
    setEmailRequired(false);
    setPasswordError(false);
    setfullnamederror(false);
    setusernamederror(false);

    if (event) {
      // newadminuserform("/AdminCreate");
      dispatch(editadminuser("activeedituser"));
      edituseridvalue(editadminuserid(event));
    }
  };

  useEffect(() => {
    if (searchQuery != "") {
      const hasNumbers = /[0-9]/.test(searchQuery);
      const hasLetters = /[a-zA-Z]/.test(searchQuery);
      const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
        searchQuery
      );
      if (hasNumbers || hasLetters || hasSpecialChars) {
        axios({
          method: "get",
          url: adminlist,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") + "",
          },
          params: {
            page: dtpageindex,
            page_size: dtpagesize,
            search: searchQuery,
            is_active:isactivefilterdata

          },
        })
          .then((res) => {
            settableheaderdata(res.data.data);
            setdatacount(res.data.data_count);

            props.loaderchange("false");
          })
          .catch((error) => {
            console.log(error);
            props.loaderchange("false");
            // setdtPageindex(dtpageindex-1)
            props.popupalert("true");
            props.popuptext("No Data Available");
            setTimeout(() => {
              props.popupalert("false");
            }, 2000);
          });
      }
    } else {
      axios({
        method: "get",
        url: adminlist,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
        params: {
          page: dtpageindex,
          page_size: dtpagesize,
          search: searchQuery,
          is_active:isactivefilterdata

        },
      })
        .then((res) => {
          settableheaderdata(res.data.data);
          setdatacount(res.data.data_count);

          props.loaderchange("false");
        })
        .catch((error) => {
          console.log(error);
          props.loaderchange("false");
          // setdtPageindex(dtpageindex-1)
          props.popupalert("true");
          props.popuptext("No Data Available");
          setTimeout(() => {
            props.popupalert("false");
          }, 2000);
        });
    }
  }, [dtpageindex, dtpagesize, edituser, searchQuery,isactivefilterdata]);

  const confirm = (e) => {
    props.loaderchange("true");
    axios({
      method: "delete",
      url: adminlist + deleteadminid + "/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") + "",
      },
    })
      .then((res) => {
        console.log(res.data);
        setpopup(false);
        // window.location.href = "/Banner";
        window.location.reload();

        props.loaderchange("false");

        props.popupalert("true");
        props.popuptext("Data Deleted Successfully");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        props.loaderchange("false");
        // setdtPageindex(dtpageindex-1)
        // console.log(dtpageindex)
        props.popupalert("true");
        props.popuptext("No Data Available");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Fullname",
        accessor: "full_name",
        Cell: (row) => {
          // console.log(row.row.original,"abcccc")
          return (
            <>
              <span>
                <div
                  style={{ marginTop: "3px" }}
                  data-tooltip-id="admin"
                  data-tooltip-content={String(row.row.original.full_name)}
                >
                  {String(row.row.original.full_name)}
                </div>
              </span>
            </>
          );
        },
      },
      {
        Header: "UserName",
        accessor: "username",
        Cell: (row) => {
          // console.log(row.row.original.username)
          return (
            <>
              <span>
                <div
                  style={{ marginTop: "3px" }}
                  data-tooltip-id="admin"
                  data-tooltip-content={String(row.row.original.username)}
                >
                  {String(row.row.original.username)}
                </div>
              </span>
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (row) => {
          // console.log(row.row.original.username)
          return (
            <>
              <span>
                <div
                  style={{ marginTop: "3px" }}
                  data-tooltip-id="admin"
                  data-tooltip-content={String(row.row.original.email)}
                >
                  {String(row.row.original.email)}
                </div>
              </span>
            </>
          );
        },
      },
      {
        Header: "Active",
        accessor: "",
        Cell: (row) => {
          // console.log(row.row.original.username)
          return (
            <>
              {/* <span>
                <div
                  style={{ marginTop: "3px" }}
                  data-tooltip-id="admin"
                  data-tooltip-content={
                    row.row.original.is_active == true ? "Yes" : "No"
                  }
                >
                  {row.row.original.is_active == true ? "Yes" : "No"}
                </div>
              </span> */}
              <p
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    row.row.original.is_active == false
                      ? "No"
                      : "Yes"
                  }
                >
                  {row.row.original.is_active == false ? (
                    <p style={{ color: "red", fontWeight: 700 }}>No</p>
                  ) : (
                    <p style={{ color: "green", fontWeight: 700 }}>Yes</p>
                  )}
                </p>

            </>
          );
        },
      },
      {
        Header: "Role",
        accessor: "",
        Cell: (row) => {
          // console.log(row.row.original.username)
          return (
            <>
              <span>
                <div
                  style={{ marginTop: "3px" }}
                  data-tooltip-id="admin"
                  data-tooltip-content={row.row.original.role}
                >
                  {row.row.original.role}
                </div>
              </span>
            </>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              {/* <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    disableUnderline
                    value={age}
                    onChange={(e) => dropdownhandlechange(row.row.original.id, e)}
                    label="Age"
                    defaultValue="none"
                    style={{
                      fontSize: "12px",
                    }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    <MenuItem value="none" disabled style={{ display: "none" }}>
                      Select
                    </MenuItem>
                    <MenuItem value={1}>Edit</MenuItem>
                  </Select>
                </FormControl> */}
              <div class="actions">
                <button
                  type="button"
                  class="btn btn-danger btn-sm edit"
                  onClick={(e) => dropdownhandlechange(row.row.original.id, e)}
                >
                  <i class="bi bi-pencil-fill"></i> Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm delete"
                  onClick={(e) => {
                    setdeleteadminid(row.row.original.id);
                    setpopup(true);
                  }}
                >
                  <i class="bi bi-trash3"></i> Delete
                </button>
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  const addadmin = (e) => {
    // newadminuserform("/AdminCreate");
    setemailerror(false);
    setValidEmail(false);
    setEmailRequired(false);
    setPasswordError(false);
    setfullnamederror(false);
    setusernamederror(false);
    setroleerror(false);
    setlocationerr(false);
    setChecked(false);
    setGetemail("");
    setGetfullname("");
    setGetusername("");
    setCreatEmailvalue("");
    setChecked(false);
    setcreatuserinfo({
      ...creatuserinfo,
      username: "",
      password: "",
      email: "",
      full_name: "",
      is_active: false,
      role: "",
      location: "",
    });

    dispatch(editadminuser("createadmin"));
    // window.location.href = "/AdminUser";
  };
  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  return (
    <>
      <div className={sideactive ? "adminpage-sa" : "adminpage"}>
        <div class="page-header">
          <div class="row">
            <div class="col-sm-7 col-auto">
              <h3 class="page-title">AdminUser</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <NavLink
                    style={{ textDecoration: "none", color: "#333333" }}
                    to={"/"}
                    onClick={(e) => {
                      dispatch(sidebar("DashBoard"));
                    }}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li class="breadcrumb-item active">Admin</li>
              </ul>
            </div>
            <div class="col-sm-5 col">
              <a
                onClick={(e) => addadmin(e)}
                style={{
                  backgroundColor: "#1b5a90",
                  border: "1px solid #1b5a90",
                  color: "white",
                }}
                type="button"
                data-toggle="modal"
                class="btn btn-primary float-right mt-2"
              >
                Add
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body" style={{ padding: "1.5rem" }}>
                <form onSubmit={handleSubmit}>
                  <div class="input-group rounded"
                    style={{ width: "250px", height: "40px" }}
                  >
                    <input
                      type="search"
                      class="form-control rounded"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchQuery}
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        const search = /^[A-Za-z ]+$/;
                        if (e.target.value.length <= "100") {
                          setSearchQuery(e.target.value);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      // onKeyDown={(e)=>{if(e.which=="32"){
                      //   e.preventDefault()
                      // }}}

                      min="0"
                      max="10"
                      label="Search"
                      placeholder="Search..."
                      required
                    />
                    <span
                      class="input-group-text border-0 bg-transparent"
                      id="search-addon"
                    >
                      <i
                        class="bi bi-search"
                        style={{
                          color: "#1b5a90",
                          width: "20px",
                          height: "20px",
                        }}
                      ></i>
                    </span>
                  </div>
                </form>
                <div className="table-responsive">
                  <BasicTable
                    columns={columns}
                    data={tableheaderdata}
                    pagesize={pagesize}
                    pageindex={pageindex}
                    dtpagesize={dtpagesize}
                    dtpageindex={dtpageindex}
                    datacount={datacount}
                    isactive={true}
                    isactivefilterdata={isactivefilterdata}
                  setisactivefilterdata={setisactivefilterdata}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <>
          <div className="logout_popup">
            <div class="container1">
              <div class="cookiesContent" id="cookiesPopup">
                <button
                  class="close"
                  onClick={(e) => {
                    setpopup(false);
                  }}
                >
                  ✖
                </button>
                {/* <img src={logoutimg} alt="cookies-img" /> */}
                <p style={{ marginTop: "20px" }}>
                  Do You Want to Delete the Data?
                </p>
                <div style={{ display: "flex" }}>
                  <button class="accept p-2 m-2" onClick={(e) => confirm()}>
                    Yes!
                  </button>
                  <button
                    class="accept p-2 m-2"
                    onClick={(e) => setpopup(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {edituser == "activeedituser" || edituser == "createadmin" ? (
        <div className="adminform">
          <div class="modal-dialog1" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  {edituser == "activeedituser"
                    ? "Update Admin User"
                    : "Create Admin User"}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => cancelnewuser(e)}
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div
                class="modal-body"
                style={{ padding: "1rem", width: "920px" }}
              >
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col mt-3">
                      <label for="validationCustom01" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        name="full_name"
                        variant="standard"
                        autoComplete="off"
                        value={getfullname}
                        // onKeyDown={(e)=>{if(e.which=="32"){
                        //   e.preventDefault()
                        // }}}
                        onKeyDown={(e) => {
                          if (e.target.value.length === 0 && e.which === 32) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => fullnamevalidation(e)}
                        required
                      ></input>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {fullnamederror ? "Name Required" : ""}{" "}
                      </p>
                    </div>
                    <div class="col mt-3">
                      <label for="validationCustom02" class="form-label">
                        User name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom02 "
                        name="username"
                        autoComplete="off"
                        onChange={(e) => usernamevalidation(e)}
                        onKeyDown={(e) => {
                          if (e.which == "32") {
                            e.preventDefault();
                          }
                        }}
                        value={
                          // edituser == "activeedituser" ? getusername : null
                          getusername
                        }
                        required
                      ></input>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {usernameerror ? "UserName Required" : ""}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col mt-3">
                      <label for="validationCustomUsername" class="form-label">
                        Email
                      </label>
                      <div class="input-group has-validation">
                        <span
                          class="input-group-text"
                          id="inputGroupPrepend"
                          style={{ borderRadius: "6px 0px 0px 6px" }}
                        >
                          @
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="validationCustomUsername"
                          aria-describedby="inputGroupPrepend"
                          autoComplete="off"
                          value={
                            edituser == "activeedituser"
                              ? String(getemail)
                              : null
                          }
                          name="email"
                          onChange={(e) => emailvalidation(e)}
                          required
                        ></input>
                      </div>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {EmailRequired
                          ? "Email Required"
                          : validEmail
                          ? "Enter Valid Email"
                          : ""}{" "}
                      </p>
                    </div>
                    <div class="col mt-3">
                      <label for="validationCustom04" class="form-label">
                        Password
                      </label>
                      <FormControl
                        style={{
                          m: 0,
                          width: "100%",
                          border: "none",
                          "& label.Mui-focused": {
                            color: "white",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#ced4da",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ced4da",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ced4da",
                            },
                            "&.Mui-focused fieldset": {
                              boxShadow:
                                "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
                            },
                          },
                        }}
                        variant="outlined"
                      >
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          sx={{
                            height: "40px",
                            border: "none",
                          }}
                          onChange={(e) => passwordvalidation(e)}
                          onKeyDown={(e) => {
                            if (e.which == "32") {
                              e.preventDefault();
                            }
                          }}
                          name="password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {passworderror && edituser != "activeedituser"
                          ? "Password Required"
                          : creatpasswordvalue != null &&
                            creatpasswordvalue != "" &&
                            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                              creatpasswordvalue
                            )
                          ? "password must contain, At least one upper case ,At least one lower case,At least one digit,At least one special character,Minimum eight in length"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mt-3">
                      <label class="form-label">Role</label>

                      <select
                        class="form-select"
                        id="validationCustom04"
                        value={creatuserinfo.role}
                        name="role"
                        onChange={(e) => {
                          rolevalidation(e);
                        }}
                        required
                      >
                        <option value={""} selected disabled>
                          Please Select...
                        </option>
                        {role.map((roledata) => {
                          return <option value={roledata}>{roledata}</option>;
                        })}
                      </select>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {roleerror ? "Role Required" : ""}
                      </p>
                    </div>
                    <div class="col-md-6 p-1 mt-3">
                      <label class="form-label">Location </label>

                      <select
                        className="form-select"
                        value={creatuserinfo.location}
                        onChange={(e) => locationvalidation(e)}
                        name="location"
                      >
                        <option selected disabled value="">
                          ...Please Select
                        </option>
                        {location.map((data) => {
                          return (
                            <option value={data.id} data={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {roleerror ? "Role Required" : ""}
                      </p>
                    </div>
                    <div class="col  p-3" style={{ display: "flex" }}>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => checkbox(e)}
                          id="invalidCheck"
                        ></input>
                        <label class="form-check-label" for="invalidCheck">
                          Is Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary  create mt-3"
                    onClick={(e) => newusercreat(e)}
                    disabled={
                      edituser == "activeedituser" && !alert ? true : false
                    }
                  >
                    {edituser == "activeedituser"
                      ? "Update Admin User"
                      : "Create Admin User"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ReactTooltip
        id="admin"
        arrowColor="transparent"
        place="bottom-start"
        delayShow={200}
        style={{
          backgroundColor: "#707070",
          fontSize: "10px",
          textAlign: "center",
          padding: "5px",
          fontWeight: 400,
        }}
      />
    </>
  );
}
