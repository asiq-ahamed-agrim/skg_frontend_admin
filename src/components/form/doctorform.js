import "../style/form/doctorform.scss";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import validator from "validator";
import { editdoctoruser } from "../redux/reducer/counterslice";
import TagsInput from "react-tagsinput";
import { useSelector, useDispatch } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import { doctorlist, spacilitylist, presignedurl } from "../../text/apidata";
import { doctorcreate } from "../../text/apidata";
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
import Swal from "sweetalert2";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

//
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Formvalidation(props) {
  const [selected, setSelected] = useState([]);
  const [language, setlanguage] = useState([]);
  // console.log(JSON.parse(selected),language)
  const editdoctoruserselect = useSelector(
    (state) => state.counter.editdoctoruser
  );
  const sideactive = useSelector((state) => state.counter.sidebarnav);

  const [creatpasswordvalue, setCreatPasswordValue] = useState("");
  const [preurl, setpreurl] = useState();
  const [preurl2, setpreurl2] = useState();

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
          doctor_signature: "",
          featured_doctor: "false",
          location_id: "",
          consultation_code: "",
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
          doctor_signature: "",
          featured_doctor: "",
          location_id: "",
          consultation_code: "",
        }
  );
  const [docerror, setdocerror] = useState(false);
  const [langerror, setlangerror] = useState(false);
  const [gender, setGender] = React.useState("");
  const [type, settype] = React.useState("");
  const [location, setlocation] = useState("");
  const [mr, setmr] = useState("");
  const editdoctor = useDispatch();
  const doctor = useNavigate();
  const [doctorspacilityselected, setdoctorspacilityselected] = useState([]);

  const [doctorspacilitylist, setdoctorspacility] = useState([]);
  const [createmailvalue, setCreatEmailvalue] = useState("");
  const [typeerror, settypeerror] = useState(false);
  const [locid, setlocid] = useState(false);

  const [mrerror, setmrerror] = useState(false);
  const [creatfirstname, setCreatefirstname] = useState("");
  const [createfees, setCreatefees] = useState("");
  const [creatlastname, setCreatelastname] = useState("");
  const [creatphoneno, setCreatephoneno] = useState("");
  const [createxperience, setCreateexperience] = useState("");
  const [creatgender, setCreategender] = useState("");
  //
  const [validEmail, setValidEmail] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
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
  const [checked, setChecked] = useState(true);
  const [checkedfd, setCheckedfd] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  //
  const [specialityerror, setspecialityerror] = useState(false);
  const [url, setUrl] = useState();
  console.log(url);
  const [alert, setalert] = useState(false);
  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);
  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [file, setFile] = useState([]);
  const [crop, setCrop] =
    useState();
    // {
    //   unit: 'px', // Can be 'px' or '%'
    //   x: 25,
    //   y: 25,
    //   width: 510,
    //   height: 510
    // }

  const [urlsign, setUrlsign] = useState();
  const [imgfile2, setimgfile2] = useState();
  const [imgtype2, setimgtype2] = useState();

  const fixedCropSize = { width: 300, height: 200 };
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setalert(true);

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
    setalert(true);

    settype(event.target.value);
    setlocid(false);
    const { name, value } = event.target;
    // console.log(name, "ooo");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [name]: value,
    });
  };

  const handleChangelocation = (e) => {
    setalert(true);

    const { name, value } = e.target;
    settypeerror(false);
    setlocation(e.target.value);

    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [name]: value,
    });
  };
  const handleChangemr = (event) => {
    setalert(true);

    console.log(event.target.value);
    setmr(event.target.value);
    setmrerror(false);
    const { name, value } = event.target;
    // console.log(name, "ooo");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      [name]: value,
    });
  };
  const checkbox = (e) => {
    setalert(true);

    // console.log(e, e.target.checked);
    setChecked(e.target.checked);
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      is_active: e.target.checked,
    });

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
            console.log(res.data.data);
            if (res.data.status.code) {
              res.data.data.speciality.forEach((element) => {
                // console.log(element.name, element.id);
                spacilityArray.push({ key: element.id, cat: element.name });
              });
              setdoctorspacilityselected(spacilityArray);
            }

            setGender(res.data.data.gender);
            settype(res.data.data.type);
            setlocation(res.data.data.location_id);
            setgetemail(res.data.data.email);
            const lastname = "last_name";
            const firstname = "first_name";
            const email = "email";
            const phone = "phonenumber";
            const exp = "experience";
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
            res.data.data.doctor_qualifications &&
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
            setCheckedfd(res.data.data.featured_doctor);
            settype(res.data.data.type);
            setmr(res.data.data.titles);
            setUrl(res.data.data.profile_pic);
            setUrlsign(res.data.data.doctor_signature);
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
                featured_doctor: res.data.data.featured_doctor,
                location_id: res.data.data.location_id,
                consultation_code: res.data.data.consultation_code,
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
    setalert(true);

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
    if (
      editdoctoruserselect != "activedoctoredit"
        ? /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
            createmailvalue
          ) &&
          creatdoctorinfo.password != "" &&
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            creatdoctorinfo.password
          ) &&
          creatdoctorinfo.first_name != "" &&
          creatdoctorinfo.last_name != "" &&
          creatdoctorinfo.phonenumber != "" &&
          creatdoctorinfo.experience != "" &&
          creatdoctorinfo.gender != "" &&
          creatdoctorinfo.fees != "" &&
          creatdoctorinfo.doctor_qualifications != "" &&
          creatdoctorinfo.languages_known != "" &&
          creatdoctorinfo.speciality != "" &&
          creatdoctorinfo.profile_pic != "" &&
          creatdoctorinfo.location_id != ""
        : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
            createmailvalue
          ) &&
          creatdoctorinfo.first_name != "" &&
          creatdoctorinfo.last_name != "" &&
          creatdoctorinfo.phonenumber != "" &&
          creatdoctorinfo.experience != "" &&
          creatdoctorinfo.gender != "" &&
          creatdoctorinfo.fees != "" &&
          creatdoctorinfo.doctor_qualifications != "" &&
          creatdoctorinfo.languages_known != "" &&
          creatdoctorinfo.speciality != "" &&
          creatdoctorinfo.profile_pic != "" &&
          creatdoctorinfo.location_id != ""
    ) {
      if (editdoctoruserselect == "activedoctoredit") {
        props.loaderchange("true");
        async function editimage() {
          if (preurl && preurl.length > 0) {
            const resp = await fetch(preurl, {
              method: "PUT",
              body: imgfile,
              headers: {
                // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                "Content-Type": imgtype,
                "X-Amz-ACL": "public-read",
              },
            }).catch((err) => {
              console.log(err);
              return null;
            });
          }
          if (preurl2 && preurl2.length > 0) {
            const resp = await fetch(preurl2, {
              method: "PUT",
              body: imgfile2,
              headers: {
                // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                "Content-Type": imgtype2,
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
                setalert(false);

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
        props.loaderchange("true");
        async function uploadimage() {
          if (preurl && preurl.length > 0) {
            const resp = await fetch(preurl, {
              method: "PUT",
              body: imgfile,
              headers: {
                // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                "Content-Type": imgtype,
                "X-Amz-ACL": "public-read",
              },
            }).catch((err) => {
              console.log(err);
              return null;
            });
          }
          if (preurl2 && preurl2.length > 0) {
            const resp = await fetch(preurl2, {
              method: "PUT",
              body: imgfile2,
              headers: {
                // "Authorization": "Bearer " + localStorage.getItem("token") + "",
                "Content-Type": imgtype2,
                "X-Amz-ACL": "public-read",
              },
            }).catch((err) => {
              console.log(err);
              return null;
            });
          }

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
                setalert(false);

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
      }
    } else {
      // console.log(creatdoctorinfo.phonenumber.length);
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
          createmailvalue
        )
      ) {
        setEmailRequired(false);
        setValidEmail(true);
      }
      if (
        creatdoctorinfo.speciality == "" ||
        creatdoctorinfo.speciality == null
      ) {
        setspecialityerror(true);
      }
      if (createmailvalue == "" || createmailvalue == null) {
        setEmailRequired(true);
      }
      if (creatpasswordvalue == "") {
        setPasswordError(true);
      }
      if (creatfirstname == "" || creatfirstname == null) {
        seterrorfirstname(true);
      }
      if (createfees == "" || createfees == null) {
        seterrorfees(true);
      }
      if (creatlastname == "" || creatlastname == null) {
        seterrorlastname(true);
      }
      if (creatlastname == "" || creatlastname == null) {
        seterrorlastname(true);
      }
      if (
        creatphoneno == "" ||
        creatphoneno == null ||
        creatdoctorinfo.phonenumber.length != 10
      ) {
        seterrorphoneno(true);
        console.log(creatdoctorinfo);
      }

      if (createxperience == "" || createxperience == null) {
        seterrorexperience(true);
      }
      if (type == "" || type == null) {
        settypeerror(true);
      }
      if (mr == "" || mr == null) {
        setmrerror(true);
      }
      if (creatgender == "" || creatgender == null) {
        seterrorgender(true);
      }
      if (
        creatdoctorinfo.profile_pic == "" ||
        creatdoctorinfo.profile_pic == null
      ) {
        props.popupalert("true");
        props.popuptext("Upload Image to Continue");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);
      }
      if (
        creatdoctorinfo.location_id == "" ||
        creatdoctorinfo.location_id == null
      ) {
        setlocid(true);
      }
      if (selected == "" || selected == null) {
        setdocerror(true);
        // $(".react-tagsinput-doctor").css({ "border-bottom": "2px solid red" });
      }
      if (language == "" || language == null) {
        setlangerror(true);
        // $(".react-tagsinput-language").css({
        //   "border-bottom": "2px solid red",
        // });
      }
    }
  };

  const formvalidation = (e) => {
    setalert(true);

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
      const re = /^[A-Za-z ]+$/;
      if (value === "" || re.test(value)) {
        setCreatefirstname(e.target.value);
        seterrorfirstname(false);
        setcreatdoctorinfo({
          ...creatdoctorinfo,
          [name]: value.trim().split(/ +/).join(" "),
        });
      }
    }
    if (e.target.name == "last_name") {
      const { name, value } = e.target;
      const re = /^[A-Za-z ]+$/;
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
        [name]: value.slice(0, 10),
      });
      if (value.length >= 10) {
        setCreatephoneno(value.slice(0, 10));
      }

      if ((e.target.value = "")) {
        seterrorphoneno(true);
      } else {
        seterrorphoneno(false);
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
      if (e.target.value.length <= 2) {
        setCreateexperience(e.target.value);
        seterrorexperience(false);
        setcreatdoctorinfo({
          ...creatdoctorinfo,
          [name]: value,
        });
      } else {
        return false;
      }
    }

    if (e.target.name == "email") {
      const { name, value } = e.target;
      setCreatEmailvalue(e.target.value);
      setValidEmail(false);
      setEmailRequired(false);
      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
    if (e.target.name == "consultation_code") {
      const { name, value } = e.target;

      setcreatdoctorinfo({
        ...creatdoctorinfo,
        [name]: value,
      });
    }
  };

  const cancelnewuser = () => {
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
          doctor("/Doctor");
          editdoctor(editdoctoruser(""));
          setalert(false);
        }
      });
    } else {
      doctor("/Doctor");
      editdoctor(editdoctoruser(""));
      setalert(false);
    }
  };

  const docqualification = (e) => {
    setalert(true);

    const re = /^[A-Za-z]+$/;
    console.log(e);
    const doctorqualifications = "doctor_qualifications";
    // $(".react-tagsinput-doctor").css({ "border-bottom": "1px solid black" });
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
  };
  const langfield = (e) => {
    setalert(true);

    // $(".react-tagsinput-language").css({ "border-bottom": "1px solid black" });
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
  const selectedImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgsrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const setCompletedCrop = async (c) => {
    const url = await getCroppedImg(imgRef.current, c, "newfile.jpeg");
  };
  const onImageLoaded = (image) => {
    // imgRef = image;
    imgRef.current = image;
  };
  const handleFiles = (e) => {
    selectedImage(e);
    setCroppImageViewCount(1);
    setCroppImageView(true);
    setalert(true);
  };
  const handleFiles2 = (e) => {
    selectedImage(e);
    setCroppImageViewCount(2);
    setCroppImageView(true);
    setalert(true);
  };

  const cancel = (e) => {
    setalert(true);
    setUrlsign("");
    setUrl("");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      profile_pic: "",
    });
  };
  const cancel2 = (e) => {
    setalert(true);
    setUrlsign("");
    setcreatdoctorinfo({
      ...creatdoctorinfo,
      doctor_signature: "",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function getCroppedImg(a, crop, fileName) {
    const image = document.getElementById("localimg");
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    if (crop) {
      canvas.width = crop.width;
      canvas.height = crop.height;
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }
    const ctx = canvas.getContext("2d");
    if (crop) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    } else {
      ctx.drawImage(
        image,
        scaleX,
        scaleY,
        image.width * scaleX,
        image.height * scaleY,
        0,
        0,
        image.width,
        image.height
      );
    }
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        const croppedFile = new File([blob], "croppedimg.jpg", {
          type: "image/jpeg",
        });
        if (CroppImageViewCount == 1) {
          setFile((oldArray) => [
            ...oldArray,
            String(URL.createObjectURL(croppedFile)),
          ]);
          // setimgfile((oldArray) => [...oldArray, croppedFile]);
          // setimgtype((oldArray) => [...oldArray, croppedFile.type]);
          console.log(croppedFile);
          setimgfile(croppedFile);
          setimgtype(croppedFile.type);
          var file = croppedFile;
          var reader = new FileReader();
          reader.onloadend = function () {
            setUrl(reader.result);
          };
          reader.readAsDataURL(file);

          var val = Math.floor(1000 + Math.random() * 9000);
          var url = {
            multiple_files: [
              {
                ["filename"]:
                  "assestsfortesting" +
                  "/" +
                  String(val) +
                  String(croppedFile.name).replace(/ +/g, ""),
                // ["file_type"]: e.target.files[0].type,
                ["file_type"]: croppedFile.type,
              },
            ],
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
        } else if (CroppImageViewCount == 2) {
          setFile((oldArray) => [
            ...oldArray,
            String(URL.createObjectURL(croppedFile)),
          ]);
          console.log(croppedFile);
          setimgfile2(croppedFile);
          setimgtype2(croppedFile.type);
          var file = croppedFile;
          var reader = new FileReader();
          reader.onloadend = function () {
            setUrlsign(reader.result);
          };
          reader.readAsDataURL(file);

          var val = Math.floor(1000 + Math.random() * 9000);
          var url = {
            multiple_files: [
              {
                ["filename"]:
                  "assestsfortesting" +
                  "/" +
                  String(val) +
                  String(croppedFile.name).replace(/ +/g, ""),
                // ["file_type"]: e.target.files[0].type,
                ["file_type"]: croppedFile.type,
              },
            ],
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
                setpreurl2(String(res.data.data));
                setcreatdoctorinfo({
                  ...creatdoctorinfo,
                  doctor_signature: String(res.data.data).split("?")[0],
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }, 500);
        }
        // console.log(croppedFile);
        blob.name = fileName;
        // setCroppImageViewCount(0);
        setCroppImageView(false);
        // window.URL.revokeObjectURL(this.fileUrl);
        let fileUrl = window.URL.createObjectURL(blob);
        console.log(fileUrl);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  }
  return (
    <>
      <div className={sideactive ? "doctorform-sa" : "doctorform"}>
        <div class="card">
          <div class="card-header">
            <h5 class="card-title" style={{ padding: "6px", margin: 0 }}>
              {editdoctoruserselect == "activedoctoredit"
                ? "Doctor Edit"
                : "Doctor Create"}
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm">
                <form class="row g-3 needs-validation" onSubmit={handleSubmit}>
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
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"Dr"}>Dr</option>
                      <option value={"Mr"}>Mr</option>
                      <option value={"Ms"}>Ms</option>
                      <option value={"Mrs"}>Mrs</option>
                    </select>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {mrerror ? "title Required" : ""}
                    </p>
                  </div>
                  <div class="col-md-5">
                    <label for="validationCustom01" class="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustomn"
                      name="first_name"
                      autoComplete="off"
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      value={
                        //  creatdoctorinfo.first_name
                        creatfirstname
                      }
                      onChange={(e) => formvalidation(e)}
                      // onKeyDown={(e) => {
                      //   if (e.which == "32") {
                      //     e.preventDefault();
                      //   }
                      // }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorfirstname ? "Firstname Required" : ""}{" "}
                    </p>
                  </div>
                  <div class="col-md-5">
                    <label for="validationCustom02" class="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="last_name"
                      id="validationCustom02 "
                      autoComplete="off"
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      value={
                        // creatdoctorinfo.last_name
                        creatlastname
                      }
                      onChange={(e) => formvalidation(e)}
                      // onKeyDown={(e) => {
                      //   if (e.which == "32") {
                      //     e.preventDefault();
                      //   }
                      // }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorlastname ? "Lastname Required" : ""}{" "}
                    </p>
                  </div>
                  <div class="col-md-4">
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
                        name="email"
                        onChange={(e) => formvalidation(e)}
                        value={
                          editdoctoruserselect == "activedoctoredit"
                            ? creatdoctorinfo.email
                            : null
                        }
                      ></input>
                    </div>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {EmailRequired
                        ? "Email Required"
                        : validEmail
                        ? "Enter valid Email"
                        : ""}{" "}
                    </p>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom03" class="form-label">
                      PhoneNumber
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="validationCustom03"
                      autoComplete="off"
                      name="phonenumber"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      onChange={(e) => formvalidation(e)}
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatphoneno
                          : creatphoneno
                      }
                      onWheel={(e) => {
                        document.activeElement.blur();
                      }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorphoneno
                        ? creatphoneno == ""
                          ? "Phonenumber Required"
                          : "Enter Valid Phonenumber"
                        : ""}{" "}
                    </p>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom03" class="form-label">
                      Experience
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      class="form-control"
                      id="validationCustom03"
                      name="experience"
                      onChange={(e) => formvalidation(e)}
                      value={
                        editdoctoruserselect == "activedoctoredit"
                          ? creatdoctorinfo.experience
                          : createxperience
                      }
                      onWheel={(e) => {
                        document.activeElement.blur();
                      }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorexperience ? "Experience Required" : ""}{" "}
                    </p>
                  </div>

                  <div class="col-md-6 mt-4">
                    <label for="validationCustommselect" class="form-label">
                      Speciality
                    </label>
                    <Multiselect
                      onSelect={(e) => mltiselect(e)}
                      onRemove={(e) => mltiselect(e)}
                      onClick={(e) => {
                        console.log("pppp");
                      }}
                      options={doctorspacilitylist}
                      selectedValues={doctorspacilityselected}
                      showArrow={true}
                      // autoBlur={true}
                      // closeOnSelect={true}
                      displayValue="cat"
                      showCheckbox={true}
                      placeholder="Search speciality"
                      // placeholder=""
                      closeOnSelect={true}
                      style={{
                        fontSize: "12px",
                        margin: "auto",
                        chips: { background: "#4D9BD7", borderRadius: "3px" },
                        option: { color: "black", backgroundColor: "white" },
                        inputField: { margin: "-5px 5px", height: "40px" },
                        searchBox: {
                          padding: "5px",
                          height: "130px",
                          overflow: "auto",
                        },
                      }}
                    />
                    {specialityerror ? (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                        }}
                      >
                        Speciality Required
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-md-3 mt-4">
                    <label for="validationCustomlang" class="form-label">
                      Language
                    </label>
                    <TagsInput
                      value={language}
                      id="taginput"
                      onChange={(e) => {
                        // console.log(e)
                        langfield(e);
                      }}
                      onChangeInput={(e) => {
                        console.log(e);
                      }}
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
                    {langerror ? (
                      <p
                        style={{
                          padding: 0,
                          fontSize: 12,
                          margin: 0,
                          color: "red",
                        }}
                      >
                        Languages Required
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-md-3 mt-4">
                    <label for="validationCustomquali" class="form-label">
                      Qualification
                    </label>
                    <TagsInput
                      value={selected}
                      onChange={(e) => docqualification(e)}
                      addOnBlur={true}
                      addOnPaste={true}
                      // validationRegex={/^[A-Za-z]+$/}
                      className="react-tagsinput-doctor"
                      name="doctor_qualifications"
                      inputProps={{
                        // placeholder: "Doctor Qualifications*",
                        placeholder: "",
                      }}
                    />
                    {docerror ? (
                      <p
                        style={{
                          padding: 0,
                          fontSize: 12,
                          margin: 0,
                          color: "red",
                        }}
                      >
                        Qualifications Required
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
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
                            boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
                            border: "none",
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
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {passworderror
                        ? "Password Required"
                        : creatpasswordvalue != "" &&
                          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                            creatpasswordvalue
                          )
                        ? "password must contain, At least one upper case ,At least one lower case,At least one digit,At least one special character,Minimum eight in length"
                        : ""}
                    </p>
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
                      onWheel={(e) => {
                        document.activeElement.blur();
                      }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorfees ? "Doctor Fees Required" : ""}
                    </p>
                  </div>
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
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"0"}>Male</option>
                      <option value={"1"}>Female</option>
                      <option value={"2"}>Others</option>
                      <option value={"3"}>Decline to State</option>
                    </select>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorgender ? "Gender Required" : ""}
                    </p>
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
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"0"}>Online</option>
                      <option value={"1"}>Hospital Visit</option>
                    </select>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {creatdoctorinfo.type == "" && locid
                        ? "Type Required"
                        : ""}
                    </p>
                  </div>
                  <div class="col-md-2 mt-4">
                    <label for="validationCustom04" class="form-label">
                      location
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      value={location}
                      name="location_id"
                      onChange={handleChangelocation}
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value={"90"}>CHETPET</option>
                      <option value={"91"}>VELACHERY</option>
                      <option value={"92"}>KOLATHUR</option>
                    </select>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {creatdoctorinfo.location_id == "" && typeerror
                        ? "Type Required"
                        : ""}
                    </p>
                  </div>
                  <div class="col-md-4 mt-4">
                    <label for="validationCustom03" class="form-label">
                      Consultation Code
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom03"
                      name="consultation_code"
                      variant="standard"
                      onChange={(e) => formvalidation(e)}
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      value={creatdoctorinfo.consultation_code}
                      // onWheel={(e) => {
                      //   document.activeElement.blur();
                      // }}
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorfees ? "Doctor Fees Required" : ""}
                    </p>
                  </div>

                  <div
                    class="col-md-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
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
                  <div
                    class="col-md-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={checkedfd}
                        onChange={(e) => {
                          setalert(true);
                          setCheckedfd(e.target.checked);
                          setcreatdoctorinfo({
                            ...creatdoctorinfo,
                            featured_doctor: e.target.checked,
                          });
                        }}
                        id="invalidCheck"
                      ></input>
                      <label class="form-check-label" for="invalidCheck">
                        Featured Doctor
                      </label>
                    </div>
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
                          onClick={(e) => {
                            window.open(url);
                          }}
                          className="pointer"
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
                          Upload Profile Picture
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
                  <div
                    class="col-md-6 mt-4"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <>
                      {urlsign ? (
                        <img
                          src={urlsign}
                          onClick={(e) => {
                            window.open(urlsign);
                          }}
                          className="pointer"
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
                          Upload Profile Picture
                        </p>
                      )}

                      {!urlsign ? (
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
                              onChange={(e) => handleFiles2(e)}
                            />
                          </p>
                        </Button>
                      ) : (
                        <></>
                      )}

                      {urlsign ? (
                        <Button
                          className="remove"
                          variant="contained"
                          onClick={(e) => cancel2(e)}
                        >
                          {" "}
                          <p>Remove Image</p>
                        </Button>
                      ) : (
                        ""
                      )}
                    </>
                  </div>
                  <div class="col-6">
                    <button
                      class="btn btn-primary"
                      type="submit"
                      onClick={(e) => {
                        newusercreat(e);
                      }}
                      disabled={
                        editdoctoruserselect == "activedoctoredit" && !alert
                          ? true
                          : false
                      }
                    >
                      {editdoctoruserselect == "activedoctoredit"
                        ? "Update form"
                        : "Submit form"}
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      class="btn btn-danger"
                      style={{ float: "right" }}
                      onClick={(e) => cancelnewuser(e)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {CroppImageView && (
        <div className="Cropper_Wrapper">
          <div className="Cropper_Inner_Wrapper">
            <ReactCrop
              src={imgsrc}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onChange={(c) => {
                setCrop(c);
                console.log(c);
              }}
              keepSelection
              // onComplete={(c) => setCompletedCrop(c)}
              cropSize={fixedCropSize}
            >
              <img src={imgsrc} ref={imgRef} id="localimg" />
            </ReactCrop>
          </div>
          <div className="CropperFooter">
            <button onClick={(e) => setCroppImageView(false)}>Cancel</button>
            <button onClick={(e) => setCompletedCrop(crop)}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}
