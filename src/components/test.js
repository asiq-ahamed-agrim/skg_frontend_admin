import "../components/style/style.scss";
import React, { useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import validator from "validator";
import { editdoctoruser } from "../components/redux/reducer/counterslice";
import TagsInput from "react-tagsinput";
import { useSelector, useDispatch } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import { doctorlist, spacilitylist, presignedurl } from "../text/apidata";
import { doctorcreate } from "../text/apidata";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import ReactFileReader from "react-file-reader";
import { NavLink } from "react-router-dom";

//
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Formvalidation(props) {
  const [sidebarvalue, setsidebarvalue] = useState("Doctor Edit");
  const [selected, setSelected] = useState([]);
  const [language, setlanguage] = useState([]);
  // console.log(JSON.parse(selected),language)
  const editdoctoruserselect = useSelector(
    (state) => state.counter.editdoctoruser
  );
  const sideactive = useSelector((state) => state.counter.sidebarnav);

  const [creatpasswordvalue, setCreatPasswordValue] = useState("");
  const [preurl, setpreurl] = useState();
  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [creatdoctorinfo, setcreatdoctorinfo] = useState(
    editdoctoruserselect != "activedoctoredit"
      ? {
          password: "",
          first_name: "",
          last_name: "",
          phonenumber: "",
          experience: "",
          speciality: [],
          gender: "",
          is_active: "true",
          titles: "",
          type: "",
          fees: "",
          doctor_qualifications: [],
          languages_known: [],
          profile_pic: "",
        }
      : {
          first_name: "",
          last_name: "",
          phonenumber: "",
          experience: "",
          speciality: [],
          gender: "",
          is_active: "true",
          titles: "",
          type: "",
          fees: "",
          doctor_qualifications: [],
          languages_known: [],
          profile_pic: "",
        }
  );
  const [docerror, setdocerror] = useState(false);
  const [langerror, setlangerror] = useState(false);

  const [gender, setGender] = React.useState("");
  const [type, settype] = React.useState("");
  const [mr, setmr] = useState("");
  const editdoctor = useDispatch();
  const doctor = useNavigate();
  const [doctorspacilityselected, setdoctorspacilityselected] = useState([]);

  const [doctorspacilitylist, setdoctorspacility] = useState([]);
  const [createmailvalue, setCreatEmailvalue] = useState("");
  const [creatusername, setCreateusername] = useState("");
  const [creatfirstname, setCreatefirstname] = useState("");
  const [createfees, setCreatefees] = useState("");
  const [creatlastname, setCreatelastname] = useState("");
  const [creatphoneno, setCreatephoneno] = useState("");
  const [createxperience, setCreateexperience] = useState("");
  const [creatgender, setCreategender] = useState("");
  //
  const [emailerror, setemailerror] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [errorusername, seterrorusername] = useState("");
  const [errorfirstname, seterrorfirstname] = useState("");
  const [errorlastname, seterrorlastname] = useState("");
  const [errorfees, seterrorfees] = useState("");

  const [errorphoneno, seterrorphoneno] = useState("");
  const [errorexperience, seterrorexperience] = useState("");
  const [errorgender, seterrorgender] = useState("");

  const [getemail, setgetemail] = useState();
  const editdoctorid = useSelector((state) => state.counter.edituserdoctorid);
  //update
  // console.log(enabledoctoredit, "jhkjhkkjhkkjhkj");
  const [selectedval, setselectedval] = useState([]);
  const [checkboxvalue, setCheckboxvalue] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = useState(false);
  //
  const [specialityerror, setspecialityerror] = useState(false);
  const [url, setUrl] = useState();
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setGender(event.target.value);
    // console.log(event.target);
    seterrorgender(false);
    if (event.target.value == 0) {
      const { name, value } = event.target;
      // console.log(name, "ooo");
      setCreategender("Male");
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
    if (event.target.value == 1) {
      const { name, value } = event.target;
      // console.log(name, "ooo");
      setCreategender("Female");
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
    if (event.target.value == 2) {
      const { name, value } = event.target;
      // console.log(name, "ooo");
      setCreategender("Others");
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
  };
  const handleChangetype = (event) => {
    settype(event.target.value);
    const { name, value } = event.target;
    // console.log(name, "ooo");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [name]: value,
    });
  };
  const handleChangemr = (event) => {
    setmr(event.target.value);
    const { name, value } = event.target;
    // console.log(name, "ooo");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [name]: value,
    });
  };
  const checkbox = (e) => {
    // console.log(e, e.target.checked);
    setChecked(e.target.checked);
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      is_active: e.target.checked,
    });
    setCheckboxvalue((current) => !current);

    // console.log(checkboxvalue, "checkboxvalue");
  };
  useEffect(() => {
    if (editdoctoruserselect == "activedoctoredit") {
      props.loaderchange("true");
      axios({
        method: "get",
        url: doctorlist + editdoctorid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          // console.log(res.data.data);
          if (res.status == 200) {
            let spacilityArray = [];
            // console.log(res.data.status.code);
            if (res.data.status.code) {
              res.data.data.speciality.forEach((element) => {
                // console.log(element.name, element.id);
                spacilityArray.push({ key: element.id, cat: element.name });
              });
              setdoctorspacilityselected(spacilityArray);
            }

            setGender(res.data.data.gender);
            settype(res.data.data.type);
            setgetemail(res.data.data.email);
            const lastname = document
              .getElementById("standard-basic-lastname")
              .getAttribute("name");
            const firstname = document
              .getElementById("standard-basic-firstname")
              .getAttribute("name");
            const email = document
              .getElementById("standard-basic-email")
              .getAttribute("name");
            const phone = document
              .getElementById("standard-basic-phone")
              .getAttribute("name");
            const exp = document
              .getElementById("standard-basic-exp")
              .getAttribute("name");
            const mrms = "titles";
            const doctorspacility = "speciality";
            const doctorgender = "gender";
            const isactive = "is_active";
            // const password = "password";
            const appointmenttype = "type";
            const fees = "fees";
            const doctorqualifications = "doctor_qualifications";
            const languagesknown = "languages_known";

            // console.log(res.data.data.speciality);
            let putspacility = [];
            res.data.data.speciality.forEach((element) => {
              // console.log(element.id,"id")
              putspacility.push(element.id);
            });
            let Qualifications = [];
            res.data.data.doctor_qualifications.forEach((element) => {
              // console.log(element, "id");
              Qualifications.push(element);
            });
            setSelected(Qualifications);

            let Languages = [];
            res.data.data.languages_known.forEach((element) => {
              // console.log(res.data.data.titles,res.data.data.profile_pic, "id");
              Languages.push(element);
            });
            setlanguage(Languages);

            setCreatEmailvalue(res.data.data.email);
            setCreatefirstname(res.data.data.first_name);
            setCreatefees(res.data.data.fees);
            setCreatelastname(res.data.data.last_name);
            setCreatephoneno(res.data.data.phonenumber);
            setCreateexperience(res.data.data.experience);
            setCreategender(res.data.data.gender);
            // setSelected(res.data.data.doctor_qualifications);
            // setlanguage(res.data.data.languages_known);
            setChecked(res.data.data.is_active);
            settype(res.data.data.type);
            setmr(res.data.data.titles);
            setUrl(res.data.data.profile_pic);
            setTimeout(() => {
              setcreatdoctorinfo({
                ...creatdoctorinfo,
                [firstname]: res.data.data.first_name,
                [lastname]: res.data.data.last_name,
                [email]: res.data.data.email,
                [phone]: res.data.data.phonenumber,
                [exp]: res.data.data.experience,
                [doctorspacility]: putspacility,
                [doctorgender]: res.data.data.gender,
                [isactive]: res.data.data.is_active,
                [mrms]: res.data.data.titles,
                [appointmenttype]: res.data.data.type,
                [fees]: res.data.data.fees,
                [doctorqualifications]: Qualifications,
                [languagesknown]: Languages,
                profile_pic: res.data.data.profile_pic,
              });
            }, 200);

            props.loaderchange("false");
          }
        })
        .catch((error) => {
          console.log(error);
          props.loaderchange("false");
        });
    }
    props.loaderchange("true");
    axios({
      method: "get",
      url: spacilitylist,

      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") + "",
      },
    })
      .then((res) => {
        let objectArray = [];
        // console.log(res.data);
        if (res.data.status.code) {
          res.data.data.forEach((element) => {
            // console.log(element.name, element.id);
            objectArray.push({ key: element.id, cat: element.name });
          });
          setdoctorspacility(objectArray);
        }
        props.loaderchange("false");
      })
      .catch((error) => {
        console.log(error);
        props.loaderchange("false");
      });
  }, []);

  const mltiselect = (e) => {
    setspecialityerror(false);
    let l1 = [];
    e.length > 0 &&
      e.map((ele) => {
        l1.push(ele.key);
      });
    setselectedval(l1.length);
    // selectedval.forEach((element)=>{
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      speciality: l1,
    });
    // })
  };

  const newusercreat = () => {
    // console.log(creatdoctorinfo, creatphoneno.slice(4).replace("-", ""));
    if (
      editdoctoruserselect != "activedoctoredit"
        ? validator.isEmail(createmailvalue) &&
          creatpasswordvalue != "" &&
          creatfirstname != "" &&
          creatlastname != "" &&
          creatphoneno != "" &&
          creatphoneno.length == 10 &&
          createxperience != "" &&
          creatgender != "" &&
          createfees != "" &&
          selected != "" &&
          language != "" &&
          creatdoctorinfo.speciality != "" &&
          creatdoctorinfo.profile_pic != ""
        : validator.isEmail(createmailvalue) &&
          creatfirstname != "" &&
          creatlastname != "" &&
          creatphoneno != "" &&
          creatphoneno.length == 10 &&
          createxperience != "" &&
          creatgender != "" &&
          createfees != "" &&
          selected != "" &&
          language != "" &&
          creatdoctorinfo.speciality != "" &&
          creatdoctorinfo.profile_pic != ""
    ) {
      if (editdoctoruserselect == "activedoctoredit") {
        if (
          creatdoctorinfo.profile_pic &&
          creatdoctorinfo.profile_pic.length > 0
        ) {
          props.loaderchange("true");
          async function editimage() {
            if (preurl && preurl.length > 0) {
              const resp = await fetch(preurl, {
                method: "PUT",
                body: imgfile,
                headers: {
                  // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                  "Content-Type": "image/png",
                  "X-Amz-ACL": "public-read",
                },
              }).catch((err) => {
                console.log(err);
                return null;
              });
            }

            axios({
              method: "put",
              data: creatdoctorinfo,
              url: doctorcreate + editdoctorid + "/",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  doctor("/Doctor");
                  editdoctor(editdoctoruser(""));
                  props.popupalert("true");
                  props.popuptext("Doctor Details Updated Successfully");
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);

                  props.loaderchange("false");
                }
              })
              .catch((error) => {
                console.log(error);
                props.popupalert("true");
                props.popuptext(error.response.data.status.message);
                setTimeout(() => {
                  props.popupalert("false");
                }, 2000);

                props.loaderchange("false");
              });
          }
          editimage();
        } else {
          props.popupalert("true");
          props.popuptext("Upload Image to Continue");
          setTimeout(() => {
            props.popupalert("false");
          }, 2000);
        }
      } else {
        if (preurl && preurl.length > 0) {
          props.loaderchange("true");
          async function uploadimage() {
            const resp = await fetch(preurl, {
              method: "PUT",
              body: imgfile,
              headers: {
                // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                "Content-Type": "image/png",
                "X-Amz-ACL": "public-read",
              },
            }).catch((err) => {
              console.log(err);
              return null;
            });

            axios({
              method: "post",
              data: creatdoctorinfo,
              url: doctorcreate,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  doctor("/Doctor");
                  props.popupalert("true");
                  props.popuptext("Doctor Created Successfully");
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);

                  props.loaderchange("false");
                  // console.log(res);
                  // window.location.href = "/AdminUser"
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
          }
          uploadimage();
        } else {
          props.popupalert("true");
          props.popuptext("Upload Image to Continue");
          setTimeout(() => {
            props.popupalert("false");
          }, 2000);
        }
      }
    } else {
      if (!validator.isEmail(createmailvalue)) {
        setemailerror(true);
        setEmailRequired(false);
        setValidEmail(true);
      }
      if (creatdoctorinfo.speciality == "") {
        setspecialityerror(true);
      }
      if (createmailvalue == "") {
        setemailerror(true);
        setEmailRequired(true);
      }
      if (creatpasswordvalue == "") {
        setPasswordError(true);
      }
      if (creatusername == "") {
        seterrorusername(true);
      }
      if (creatfirstname == "") {
        seterrorfirstname(true);
      }
      if (createfees == "") {
        seterrorfees(true);
      }
      if (creatlastname == "") {
        seterrorlastname(true);
      }
      if (creatlastname == "") {
        seterrorlastname(true);
      }

      if (creatphoneno == "") {
        seterrorphoneno(true);
      }

      if (createxperience == "") {
        seterrorexperience(true);
      }

      if (creatgender == "") {
        seterrorgender(true);
      }
      if (creatdoctorinfo.profile_pic == "") {
        props.popupalert("true");
        props.popuptext("Upload Image to Continue");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);
      }
      if (preurl == "") {
        props.popupalert("true");
        props.popuptext("Upload Image to Continue");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);
      }
      if (selected == "") {
        setdocerror(true);
        $(".react-tagsinput-doctor").css({ "border-bottom": "2px solid red" });
      }
      if (language == "") {
        setlangerror(true);
        $(".react-tagsinput-language").css({
          "border-bottom": "2px solid red",
        });
      }
    }
  };

  const formvalidation = (e) => {
    if (e.target.name == "fees") {
      const { name, value } = e.target;
      setCreatefees(e.target.value);
      seterrorfees(false);
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }

    if (e.target.name == "first_name") {
      const { name, value } = e.target;
      const re = /^[A-Za-z]+$/;
      if (value === "" || re.test(value)) {
        setCreatefirstname(e.target.value);
        seterrorfirstname(false);
        setcreatdoctorinfo({
          ...creatdoctorinfo,
          [name]: value,
        });
      }
    }
    if (e.target.name == "last_name") {
      const { name, value } = e.target;
      const re = /^[A-Za-z]+$/;
      if (value === "" || re.test(value)) {
        setCreatelastname(e.target.value);
        seterrorlastname(false);
        setcreatdoctorinfo({
          ...creatdoctorinfo,
          [name]: value,
        });
      }
    }
    if (e.target.name == "phonenumber") {
      const { name, value } = e.target;
      setCreatephoneno(e.target.value);
      seterrorphoneno(false);

      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
      if (e.target.value.length <= 9 || e.target.value.length >= 11) {
        seterrorphoneno(true);
      }
    }

    if (e.target.name == "password") {
      const { name, value } = e.target;
      setCreatPasswordValue(e.target.value);
      setPasswordError(false);

      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
    if (e.target.name == "experience") {
      const { name, value } = e.target;
      setCreateexperience(e.target.value);
      seterrorexperience(false);
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }

    if (e.target.name == "email") {
      const { name, value } = e.target;
      setCreatEmailvalue(e.target.value);
      setemailerror(false);
      setValidEmail(false);
      setEmailRequired(false);
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
  };
  const cancelnewuser = () => {
    doctor("/Doctor");
    editdoctor(editdoctoruser(""));
  };

  const docqualification = (e) => {
    const doctorqualifications = "doctor_qualifications";
    $(".react-tagsinput-doctor").css({ "border-bottom": "1px solid black" });
    setdocerror(false);
    let l2 = [];
    e.length > 0 &&
      e.map((ele) => {
        l2.push(ele);
      });
    setSelected(l2);

    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [doctorqualifications]: l2,
    });

    // seterrorfees(false);
  };
  const langfield = (e) => {
    $(".react-tagsinput-language").css({ "border-bottom": "1px solid black" });
    setlangerror(false);
    const languagesknown = "languages_known";
    let l3 = [];
    e.length > 0 &&
      e.map((ele) => {
        l3.push(ele);
      });
    setlanguage(l3);

    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [languagesknown]: l3,
    });

    // seterrorfees(false);
  };
  ///
  const handleFiles = (e) => {
    setimgfile(e.target.files[0]);
    setimgtype(e.target.files[0].type);
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);

    var val = Math.floor(1000 + Math.random() * 9000);
    var url = {
      ["filename"]:
        "assestsfortesting" +
        "/" +
        String(val) +
        String(e.target.files[0].name).replace(/ +/g, ""),
      // ["file_type"]: e.target.files[0].type,
      ["file_type"]: "image/png",
    };

    setTimeout(() => {
      axios({
        method: "post",
        url: presignedurl,
        data: url,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          setpreurl(String(res.data.data));
          setcreatdoctorinfo({
            ...creatdoctorinfo,
            profile_pic: String(res.data.data).split("?")[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  };
  const cancel = (e) => {
    setUrl("");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      profile_pic: "",
    });
  };

  return (
    <>
      <div className={sideactive ? "doctorform-sa" : "doctorform"}>
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Doctor View</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm">
                <form class="row g-3 needs-validation" novalidate>
                  <div class="col-md-2">
                    <label for="validationCustom04" class="form-label">
                      Titles
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      value={mr}
                      name="titles"
                      onChange={handleChangemr}
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"Mr"}>Mr</option>
                      <option value={"Ms"}>Ms</option>
                      <option value={"Mrs"}>Mrs</option>
                    </select>
                    <div class="invalid-feedback">Please titles.</div>
                  </div>
                  <div class="col-md-5">
                    <label for="validationCustom01" class="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      name="first_name"
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatdoctorinfo.first_name
                          : null
                      }
                      onChange={(e) => formvalidation(e)}
                      required
                    ></input>
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-5">
                    <label for="validationCustom02" class="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="last_name"
                      id="validationCustom02"
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatdoctorinfo.last_name
                          : null
                      }
                      onChange={(e) => formvalidation(e)}
                      required
                    ></input>
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">
                      Email
                    </label>
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend" >
                        @
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        onChange={(e) => formvalidation(e)}
                        value={
                          editdoctoruserselect == "activedoctoredit"
                            ? creatdoctorinfo.email
                            : null
                        }
                        required
                      ></input>
                      <div class="invalid-feedback">Please choose a Email.</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom03" class="form-label">
                      PhoneNumber
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="validationCustom03"
                      name="phonenumber"
                      onChange={(e) => formvalidation(e)}
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatphoneno
                          : null
                      }
                      required
                    ></input>
                    <div class="invalid-feedback">
                      Please provide a PhoneNumber.
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom03" class="form-label">
                      Experience
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="validationCustom03"
                      name="experience"
                      onChange={(e) => formvalidation(e)}
                      // onChange={(e) => passwordvalidation(e)}
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatdoctorinfo.experience
                          : null
                      }
                      required
                    ></input>
                    <div class="invalid-feedback">
                      Please provide a Experience.
                    </div>
                  </div>

                  <div class="col-md-3 mt-4">
                    <label for="validationCustommselect" class="form-label">
                      Speciality
                    </label>
                    <Multiselect
                      onSelect={(e) => mltiselect(e)}
                      onRemove={(e) => mltiselect(e)}
                      options={doctorspacilitylist}
                      selectedValues={doctorspacilityselected}
                      showArrow={true}
                      displayValue="cat"
                      showCheckbox={true}
                      // placeholder="Select speciality*"
                      placeholder=""
                      style={{
                        fontSize: "12px",
                        margin: "auto",
                        chips: { background: "#4D9BD7" },
                        option: { color: "black", backgroundColor: "white" },
                        inputField: { margin: "-5px 5px", height: "40px" },
                        searchBox: {
                          padding: "0",
                          height: "40px",
                        },
                      }}
                    />
                  </div>
                  <div class="col-md-4 mt-4">
                    <label for="validationCustomlang" class="form-label">
                      Language
                    </label>
                    <TagsInput
                      value={language}
                      onChange={(e) => langfield(e)}
                      validationRegex={/^[A-Za-z]+$/}
                      addOnBlur={true}
                      addOnPaste={true}
                      className="react-tagsinput-language"
                      name="languages_known"
                      inputProps={{
                        // placeholder: "Languages known*",
                        placeholder: "",
                      }}
                    />
                  </div>
                  <div class="col-md-4 mt-4">
                    <label for="validationCustomquali" class="form-label">
                      Qualification
                    </label>
                    <TagsInput
                      value={selected}
                      onChange={(e) => docqualification(e)}
                      // onChange={setSelected}
                      addOnBlur={true}
                      addOnPaste={true}
                      validationRegex={/^[A-Za-z]+$/}
                      className="react-tagsinput-doctor"
                      name="doctor_qualifications"
                      inputProps={{
                        // placeholder: "Doctor Qualifications*",
                        placeholder: "",
                      }}
                    />
                  </div>
                  {editdoctoruserselect != "activedoctoredit" ? (
                    <div
                      class="col-md-4 mt-4"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label for="validationCustom04" class="form-label">
                        Password
                      </label>
                      <FormControl
                        sx={{
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
                          onChange={(e) => formvalidation(e)}
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
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="col-md-2 mt-4">
                    <label for="validationCustom04" class="form-label">
                      Gender
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      value={gender}
                      name="gender"
                      onChange={handleChange}
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"0"}>Male</option>
                      <option value={"1"}>Female</option>
                      <option value={"2"}>Others</option>
                      <option value={"3"}>Decline to State</option>
                    </select>
                    <div class="invalid-feedback">Please select Gender .</div>
                  </div>
                  <div class="col-md-2 mt-4">
                    <label for="validationCustom04" class="form-label">
                      Type
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      value={type}
                      name="type"
                      onChange={handleChangetype}
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"0"}>Online</option>
                      <option value={"1"}>Hospital Visit</option>
                    </select>
                    <div class="invalid-feedback">Please select Type.</div>
                  </div>
                  <div class="col-md-4 mt-4">
                    <label for="validationCustom03" class="form-label">
                      Doctor Fees
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="validationCustom03"
                      name="fees"
                      variant="standard"
                      onChange={(e) => formvalidation(e)}
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatdoctorinfo.fees
                          : null
                      }
                      required
                    ></input>
                    <div class="invalid-feedback">Please Fees.</div>
                  </div>
                  <div
                    class="col-md-6 mt-4"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <>
                      {url ? (
                        <img
                          src={url}
                          style={{
                            height: 115,
                            width: 115,
                            marginRight: 25,
                            borderRadius: "50%",
                          }}
                          alt="Image"
                        />
                      ) : (
                        <p style={{ margin: 0, padding: 10 }}>
                          Upload Profile Image
                        </p>
                      )}

                      {!url ? (
                        <Button
                          className="doctorupload"
                          variant="contained"
                          component="label"
                        >
                          <p>
                            Upload Image
                            <input
                              type="file"
                              hidden
                              accept="image/png, image/jpeg"
                              onChange={(e) => handleFiles(e)}
                            />
                          </p>
                        </Button>
                      ) : (
                        <></>
                      )}

                      {url ? (
                        <Button
                          className="remove"
                          variant="contained"
                          onClick={(e) => cancel(e)}
                        >
                          {" "}
                          <p>Remove Image</p>
                        </Button>
                      ) : (
                        ""
                      )}
                    </>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => checkbox(e)}
                        id="invalidCheck"
                        required
                      ></input>
                      <label class="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" type="submit">
                      Submit form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
