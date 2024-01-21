import "../style/form/clientform.scss";
import { useDispatch, useSelector } from "react-redux";
import { clientaddstate } from "../redux/reducer/counterslice";
import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { spacilitycreate, presignedurl } from "../../text/apidata";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ClientCreate } from "../../text/apidata";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import WarningIcon from "@mui/icons-material/Warning";
import EmailIcon from "@mui/icons-material/Email";
import { ContactSupportOutlined } from "@mui/icons-material";

const ClientDetailsForm = (props) => {
  const [clientdata, setclientdata] = useState({
    org_name: "",
    org_domain: "",
    org_key: "",
    org_logo: "",
    store_info: [
      {
        store_name: "",
        store_email: "",
        store_address: "",
        store_cp: "",
      },
    ],
    con_name: "",
    con_email: "",
    org_admin: "",
  });

  console.log("mmm", clientdata.store_info[0]?.org_admin);

  // validtion state
  const [organizationNameError, setOrganizationNameError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const [storeNameError, setStoreNameError] = useState("");
  const [storeMailError, setStoreMailError] = useState("");

  const [customerNameError, setCustomerNameError] = useState(false);
  const [customerEmailError, setCustomerEmailError] = useState(false);

  const [orgAdminEmailError, setOrgAdminEmailError] = useState(false);
  // const [orgemail, setorgemail] = useState({
  //   org_admin: ""
  // })

  const [preurl, setpreurl] = useState();
  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();

  const [alert, setalert] = useState(false);
  const [file, setFile] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);
  const [creatspeciality, setcreatspeciality] = useState({
    name: "",
    description: "",
    speciality_image: "",
    featured_product: false,
    is_active: false,
  });
  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();

  const dispatch = useDispatch();

  // validation function
  // const validateOrganizationName = (e) => {
  //   const orgname = e.target.value;

  //   if (validator.isEmpty(orgname.trim())) {
  //     setOrganizationNameError("*Org Name cannot be empty!");
  //   } else {
  //     setOrganizationNameError("");
  //   }

  //   setclientdata((prevState) => ({
  //     ...prevState,
  //     org_name: orgname,
  //   }));
  // };

  // const validateOrganizationName = (subdomain) => {
  //   // Ensure that the subdomain is a string
  //   if (typeof subdomain === "string" || subdomain instanceof String) {

  //     setclientdata((prevState) => ({
  //       ...prevState,
  //       org_name: subdomain,
  //     }));
  //     setOrganizationNameError(subdomain.trim() === "");

  //     console.log(subdomain, "onon");

  //     if (validator.isEmpty(subdomain.trim())) {
  //       setOrganizationNameError("*Org Name cannot be empty!");
  //     } else {
  //       setOrganizationNameError("");
  //     }
  //   } else {
  //     console.error("Invalid subdomain");
  //   }
  // };

  const validateOrganizationName = (input) => {
    let orgName = input;

    if (input.target) {
      // If input comes from an event (e.g., input field), use e.target.value
      orgName = input.target.value;

      if (validator.isEmpty(orgName.trim())) {
        setOrganizationNameError("*Org Name cannot be empty!");
      } else {
        setOrganizationNameError("");
      }
    } else if (typeof input === "string" || input instanceof String) {
      // If input is a string (e.g., from some other source), use the provided value
      setOrganizationNameError(input.trim() === "");

      if (validator.isEmpty(input.trim())) {
        setOrganizationNameError("*Org Name cannot be empty!");
      } else {
        setOrganizationNameError("");
      }
    } else {
      console.error("Invalid input");
    }

    setclientdata((prevState) => ({
      ...prevState,
      org_name: orgName,
    }));
  };

  // const validateDomain = (e) => {
  //   const domain = e.target.value;

  //   setclientdata({ ...clientdata, org_domain: domain });
  //   setDomainError(domain.trim() === "");

  //   // Extract the subdomain or domain name from the URL and update the organization name
  //   const url = new URL(domain);
  //   const subdomain = url.hostname.split(".")[0];

  //   console.log(domain, "AAA", "BBB", url, "CCC", subdomain);

  //   if (validator.isEmpty(domain.trim())) {
  //     setDomainError("*Domain cannot be empty!");
  //   } else {
  //     setDomainError("");
  //   }

  //   setclientdata((prevState) => ({
  //     ...prevState,
  //     org_domain: domain,
  //   }));

  //     // Pass the subdomain to validateOrganizationName function for updating the organization name
  //     validateOrganizationName(subdomain);
  // };

  const validateDomain = (e) => {
    const domain = e.target.value;
    setclientdata({ ...clientdata, org_domain: domain });
    setDomainError(domain.trim() === "");

    if (validator.isEmpty(domain.trim())) {
      setDomainError("*Domain cannot be empty!");
      // Reset the organization name when the domain is empty
      setclientdata((prevState) => ({
        ...prevState,
        org_name: "",
      }));
      return; // Skip further processing if the domain is empty
    }

    try {
      // Attempt to construct a URL object
      const url = new URL(domain);
      let subdomain = "";
      if (url.hostname.startsWith("www")) {
        subdomain = url.hostname.split(".")[1];
      } else {
        subdomain = url.hostname.split(".")[0];
      }

      console.log(domain, "AAA", "BBB", url, "CCC", subdomain);

      // Update the organization name
      setclientdata((prevState) => ({
        ...prevState,
        org_domain: domain,
      }));

      // Pass the subdomain to validateOrganizationName function for updating the organization name
      validateOrganizationName(subdomain);
    } catch (error) {
      console.error("Invalid URL:", error.message);
      setDomainError("*Invalid URL");
    }
  };

  const validateCode = (e) => {
    const code = e.target.value;

    if (validator.isEmpty(code.trim())) {
      setCodeError("*code cannot be empty!");
    } else {
      setCodeError("");
    }

    setclientdata((prevState) => ({
      ...prevState,
      org_key: code,
    }));
  };

  const validateStoreName = (e, index) => {
    const storename = e.target.value;
    if (validator.isEmpty(storename.trim())) {
      setStoreNameError("*Store Name cannot be empty!");
    } else {
      setStoreNameError("");
    }

    setclientdata((prevState) => ({
      ...prevState,
      store_name: storename,
    }));

    let l1 = [];
    for (let i = 0; i < clientdata.store_info.length; i++) {
      if (index == i) {
        clientdata.store_info[i][e.target.name] = e.target.value;
        l1.push(clientdata.store_info[i]);
      } else {
        l1.push(clientdata.store_info[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: l1,
      };
    });
  };

  const validateStoreEmail = (e, index) => {
    var storeemail = e.target.value;
    const { name, value } = e.target;
    setclientdata({
      ...clientdata,
      [name]: value,
    });
    if (validator.isEmpty(storeemail)) {
      setStoreMailError("Email Cannot be empty!");
    } else if (validator.isEmail(storeemail)) {
      setStoreMailError("");
    } else {
      setStoreMailError("valid Email!");
    }

    let l1 = [];
    for (let i = 0; i < clientdata.store_info.length; i++) {
      if (index == i) {
        clientdata.store_info[i][e.target.name] = e.target.value;
        l1.push(clientdata.store_info[i]);
      } else {
        l1.push(clientdata.store_info[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: l1,
      };
    });
  };

  const validateCustomerName = (e) => {
    const customername = e.target.value;

    if (validator.isEmpty(customername.trim())) {
      setCustomerNameError("*Customer Name cannot be empty!");
    } else {
      setCustomerNameError("");
    }

    setclientdata((prevState) => ({
      ...prevState,
      con_name: customername,
    }));
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    const { name, value } = e.target;
    setclientdata({
      ...clientdata,
      [name]: value,
    });
    if (validator.isEmpty(email)) {
      setCustomerEmailError("Email Cannot be empty!");
    } else if (validator.isEmail(email)) {
      setCustomerEmailError("");
    } else {
      setCustomerEmailError("valid Email!");
    }
  };

  const validateOrgEmail = (e) => {
    var orgemail = e.target.value;
    const { name, value } = e.target;
    setclientdata({
      ...clientdata,
      [name]: value,
    });
    if (validator.isEmpty(orgemail)) {
      setOrgAdminEmailError("Email Cannot be empty!");
    } else if (validator.isEmail(orgemail)) {
      setOrgAdminEmailError("");
    } else {
      setOrgAdminEmailError("valid Email!");
    }
  };

  const addItemToList = () => {
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: [
          ...clientdata.store_info,
          {
            store_name: "",
            org_admin: "",
            store_address: "",
            store_cp: "",
          },
        ],
      };
    });
  };

  const removeItemFromList = (index) => {
    console.log(index, clientdata);

    let l1 = [];
    for (let i = 0; i < clientdata.store_info.length; i++) {
      if (index != i) {
        l1.push(clientdata.store_info[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: l1,
      };
    });
  };

  const initialStoreInfoLengthRef = useRef(clientdata.store_info.length);

  const changedata = (e, index) => {
    console.log(e.target.name);
    let l1 = [];
    for (let i = 0; i < clientdata.store_info.length; i++) {
      if (index == i) {
        clientdata.store_info[i][e.target.name] = e.target.value;
        l1.push(clientdata.store_info[i]);
      } else {
        l1.push(clientdata.store_info[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: l1,
      };
    });
  };

  const handleFiles = (e) => {
    selectedImage(e);
    setCroppImageViewCount(1);
    setCroppImageView(true);
    setalert(true);
  };

  const cancel = (e) => {
    setUrl("");
    setcreatspeciality({
      ...creatspeciality,
      speciality_image: "",
    });
  };

  const onImageLoaded = (image) => {
    // imgRef = image;
    imgRef.current = image;
  };

  function getCroppedImg(a, crop, fileName) {
    const canvas = document.createElement("canvas");
    const image = document.getElementById("localimg");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    console.log(crop, "crop");
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
            ["filename"]:
              "test" +
              "/" +
              String(val) +
              String(croppedFile.name).replace(/ +/g, ""),
            // ["file_type"]: e.target.files[0].type,
            ["file_type"]: croppedFile.type,
          };

          setTimeout(() => {
            console.log(url, presignedurl, "preurl");

            axios({
              method: "post",
              url: presignedurl,
              data: url,

              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
              .then((res) => {
                setpreurl(res.data.data.data.url);
                console.log(res.data.data.data.url, "purl");
                setclientdata({
                  ...clientdata,
                  org_logo: res.data.data.data.url.split("?")[0],
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }, 500);
        }
        blob.name = fileName;
        setCroppImageView(false);
        let fileUrl = window.URL.createObjectURL(blob);
        console.log(fileUrl);
        resolve(fileUrl);
      }, "image/jpeg");
    });
    // }
  }

  const setCompletedCrop = async (c) => {
    console.log(c);
    const url = await getCroppedImg(imgRef.current, c, "newfile.jpeg");
  };

  const selectedImage = (e) => {
    console.log(e.target.files[0], "ppp");
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgsrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    debugger;
    if (
      clientdata.org_name != "" &&
      clientdata.org_domain != "" &&
      clientdata.org_key != "" &&
      clientdata.store_info[0].store_name != "" &&
      clientdata.store_info[0]?.org_admin != "" &&
      clientdata.con_name != "" &&
      clientdata.con_email != ""
    ) {
      setShowModal(true);
    } else {
      if (clientdata.org_name == "") {
        setOrganizationNameError("Organization Name cannot be empty!");
      }
      if (clientdata.org_domain == "") {
        setDomainError("Domain cannot be empty!");
      }
      if (clientdata.org_key == "") {
        setCodeError("Code cannot be empty!");
      }
      if (clientdata.store_info[0].store_name == "") {
        setStoreNameError("Store Name cannot be empty!");
      }
      if (clientdata.store_info[0]?.org_admin == "") {
        setStoreMailError("Email cannot be empty!");
      }
      if (clientdata.con_name == "") {
        setCustomerNameError("Customer Name cannot be empty!");
      }
      if (clientdata.con_email == "") {
        setCustomerEmailError("Email cannot be empty!");
      }
    }
  };

  const handleSave = () => {
    debugger;
    // if (clientdata.org_admin != "") {
    console.log(clientdata, "clientdata");
    props.loaderchange("true");

    async function uploadimage() {
      console.log(clientdata, "asyn");

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

      axios({
        method: "post",
        url: ClientCreate,
        data: clientdata,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res, "clires", props.loaderchange("false"));

          dispatch(clientaddstate(""));
          props.loaderchange("false");
          toast.success("Customer Created Successfully");
          props.setcustomerdetails2(true);
        })
        .catch((error) => {
          console.log(error, "err2");
          props.loaderchange("false");
          toast.error("Organization Name Already Exists");
        });
    }
    uploadimage();
    // } else {
    //   if (clientdata.org_admin == "") {
    //     setOrgAdminEmailError("Email cannot be empty!");
    //   }
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="maincontainer">
        <div className="parent-Clientform">
          <div className="create-Clientform card">
            <div class="modal-header">
              <h5 class="modal-title">Customer Creation</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  dispatch(clientaddstate(""));
                }}
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body" style={{ padding: "0 !important" }}>
              <div class=" p-1" style={{ marginLeft: "0px" }}>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <form
                        name="add_name"
                        id="add_name"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="form_parent">
                          <div className="form_parent_inner">
                            <div
                              className="col-8 title"
                              style={{ paddingBottom: "3px" }}
                            >
                              Organization:
                            </div>
                            <div className="row mb-2">
                              <div className="col-3">
                                <label>
                                  Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  name="org_name"
                                  className="form-control"
                                  placeholder="Name"
                                  class="form-control name_list"
                                  value={clientdata.org_name}
                                  // onChange={(e) => {
                                  //   setclientdata({
                                  //     ...clientdata,
                                  //     org_name: e.target.value,
                                  //   });
                                  // }}
                                  onChange={(e) => validateOrganizationName(e)}
                                />

                                <div
                                  className={`${
                                    organizationNameError ? "show" : "hide"
                                  }`}
                                  style={{ color: "red" }}
                                >
                                  {/* <WarningIcon /> */}
                                  &nbsp; Organization Name required!
                                </div>
                              </div>
                              <div className="col-3">
                                <label>
                                  Domain <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  name="org_domain"
                                  className="form-control"
                                  placeholder="Domain"
                                  class="form-control name_email"
                                  value={clientdata.org_domain}
                                  // onChange={(e) => {
                                  //   setclientdata({
                                  //     ...clientdata,
                                  //     org_domain: e.target.value,
                                  //   });
                                  // }}
                                  onChange={(e) => validateDomain(e)}
                                />
                                <div
                                  className={`${domainError ? "show" : "hide"}`}
                                  style={{ color: "red" }}
                                >
                                  {/* <WarningIcon /> */}
                                  &nbsp; Domain required!
                                </div>
                              </div>

                              <div className="col-3">
                                <label>
                                  Code <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  name="org_key"
                                  className="form-control"
                                  placeholder="Code"
                                  class="form-control name_email"
                                  value={clientdata.org_key}
                                  // onChange={(e) => {
                                  //   setclientdata({
                                  //     ...clientdata,
                                  //     org_key: e.target.value,
                                  //   });
                                  // }}
                                  onChange={(e) => validateCode(e)}
                                />
                                <div
                                  className={`${codeError ? "show" : "hide"}`}
                                  style={{ color: "red" }}
                                >
                                  {/* <WarningIcon /> */}
                                  &nbsp; Code required!
                                </div>
                              </div>
                            </div>

                            <div className="col-8 title">Store Details:</div>
                            <div className="store-wrap">
                              {clientdata.store_info.map((ele, index) => {
                                const isNewlyAdded =
                                  index >= initialStoreInfoLengthRef.current;

                                return (
                                  <div
                                    className="row"
                                    style={{
                                      marginBottom: "0px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div className="col-2">
                                      <label
                                        className={
                                          !isNewlyAdded
                                            ? "visible-label"
                                            : "hidden-label"
                                        }
                                      >
                                        Name{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="store_name"
                                        className="form-control"
                                        placeholder="Name"
                                        class="form-control name_list"
                                        value={ele.store_name}
                                        // onChange={(e) => changedata(e, index)}
                                        onChange={(e) =>
                                          validateStoreName(e, index)
                                        }
                                      />
                                      <div
                                        className={`${
                                          storeNameError ? "show" : "hide"
                                        }`}
                                        style={{ color: "red" }}
                                      >
                                        {/* <WarningIcon /> */}
                                        &nbsp; Store Name required!
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <label
                                        className={
                                          !isNewlyAdded
                                            ? "visible-label"
                                            : "hidden-label"
                                        }
                                      >
                                        Email{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="email"
                                        name="org_admin"
                                        className="form-control"
                                        placeholder="Email"
                                        class="form-control name_email"
                                        value={ele.org_admin}
                                        // onChange={(e) => changedata(e, index)}
                                        onChange={(e) =>
                                          validateStoreEmail(e, index)
                                        }
                                      />
                                      <div
                                        className={`${
                                          storeMailError ? "show" : "hide"
                                        }`}
                                        style={{ color: "red" }}
                                      >
                                        {/* <WarningIcon /> */}
                                        &nbsp; {storeMailError}
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <label
                                        className={
                                          !isNewlyAdded
                                            ? "visible-label"
                                            : "hidden-label"
                                        }
                                      >
                                        Contact Person{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name="store_cp"
                                        className="form-control"
                                        placeholder="Contact Person"
                                        class="form-control name_list"
                                        value={ele.store_cp}
                                        onChange={(e) => changedata(e, index)}
                                      />
                                    </div>
                                    <div className="col-3">
                                      <label
                                        className={
                                          !isNewlyAdded
                                            ? "visible-label"
                                            : "hidden-label"
                                        }
                                      >
                                        Store Address{" "}
                                      </label>
                                      <textarea
                                        type="text"
                                        name="store_address"
                                        placeholder="Store Address"
                                        class="form-control total_amount"
                                        value={ele.store_address}
                                        onChange={(e) => changedata(e, index)}
                                      />
                                    </div>

                                    {index == 0 && (
                                      <div
                                        className="col-1"
                                        style={{
                                          height: "70px",
                                          paddingTop: "25px",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          name="add"
                                          id="add"
                                          class="btn add-more-btn"
                                          onClick={() => addItemToList()}
                                          disabled={index > 5 ? true : false}
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    )}
                                    {index != 0 && (
                                      <div
                                        className="col-1"
                                        style={{
                                          height: "70px",
                                          paddingTop: "15px",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          name="add"
                                          id="add"
                                          class="btn  remove-btn"
                                          onClick={() =>
                                            removeItemFromList(index)
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div
                              className="col-8 title pt-10 mt-0"
                              style={{ paddingBottom: "3px" }}
                            >
                              Contact Person:{" "}
                            </div>
                            {/* <div className="store-wrap"> */}
                            <div className="row mb-2">
                              <div className="col-3">
                                <label>
                                  Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  name="con_name"
                                  className="form-control"
                                  placeholder="Name"
                                  class="form-control name_list"
                                  value={clientdata.con_name}
                                  // onChange={(e) => {
                                  //   setclientdata({
                                  //     ...clientdata,
                                  //     con_name: e.target.value,
                                  //   });
                                  // }}
                                  onChange={(e) => validateCustomerName(e)}
                                />
                                <div
                                  className={`${
                                    customerNameError ? "show" : "hide"
                                  }`}
                                  style={{ color: "red" }}
                                >
                                  {/* <WarningIcon /> */}
                                  &nbsp; Customer Name required!
                                </div>
                              </div>
                              <div className="col-3">
                                <label>
                                  Email <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="email"
                                  name="con_email"
                                  className="form-control"
                                  placeholder="Email"
                                  class="form-control name_email"
                                  value={clientdata.con_email}
                                  // onChange={(e) => {
                                  //   setclientdata({
                                  //     ...clientdata,
                                  //     con_email: e.target.value,
                                  //   });
                                  // }}
                                  onChange={(e) => validateEmail(e)}
                                />
                                <div
                                  className={`${
                                    customerEmailError ? "show" : "hide"
                                  }`}
                                  style={{ color: "red" }}
                                >
                                  {/* <WarningIcon /> */}
                                  &nbsp; {customerEmailError}
                                </div>
                              </div>
                              {/* </div> */}
                            </div>

                            {/* file upload */}
                            <div
                              class="form-group col-md-6 p-4 pl-0 file-upload-wrap"
                              style={{
                                display: "flex",
                                justifyContent: "start",
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
                                      marginTop: "-20px",
                                    }}
                                    alt="Image"
                                  />
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      padding: 5,
                                      marginRight: 8,
                                    }}
                                  >
                                    Upload Logo:
                                  </p>
                                )}

                                {/* <ReactFileReader
                  fileTypes={[".png", ".jpg"]}
                  base64={"true"}
                  handleFiles={handleFiles}
                > */}

                                {!url ? (
                                  <Button
                                    className="doctorupload"
                                    variant="contained"
                                    component="label"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p style={{ cursor: "pointer" }}>
                                      Upload Logo
                                      <input
                                        type="file"
                                        hidden
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleFiles(e)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </p>
                                  </Button>
                                ) : (
                                  <></>
                                )}

                                {/* </ReactFileReader> */}
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
                                  <></>
                                )}
                              </>
                            </div>
                          </div>
                        </div>
                        <div className="submit-btn-wrap">
                          <input
                            type="submit"
                            class="btn btn-success"
                            name="submit"
                            id="submit"
                            value="Submit"
                            // onClick={handleSubmit}
                            onClick={handleSave}
                          ></input>
                        </div>

                        {/* email second modal */}
                        <div
                          className={
                            showModal
                              ? "modal display-block"
                              : "modal display-none"
                          }
                        >
                          <section className="modal-main">
                            <div className="modal-header">
                              <h5 className="modal-title-modal2">
                                Who Should Receive the Domain and Credentials ?
                              </h5>
                              <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={handleCloseModal}
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                            <div
                              className="modal-body"
                              style={{ padding: "0 !important" }}
                            >
                              <div
                                className="modal2-body-inner"
                                style={{ marginLeft: "15px" }}
                              >
                                <div className="row">
                                  <div
                                    className="col-md-12"
                                    style={{ paddingLeft: "0px" }}
                                  >
                                    <div
                                      className="col-12 form-group"
                                      style={{ paddingLeft: "0px" }}
                                    >
                                      <form
                                        name="add_name"
                                        id="add_name"
                                        onSubmit={handleSubmit}
                                      >
                                        <div className="modal2-email-wrap">
                                          <label className="email-label">
                                            Email{" "}
                                            <span style={{ color: "red" }}>
                                              *{" "}
                                            </span>{" "}
                                            :
                                          </label>
                                          <input
                                            type="email"
                                            name="org_admin"
                                            className="form-control-modal2"
                                            // placeholder="Email"
                                            class="form-control name_email"
                                            value={clientdata.org_admin}
                                            style={{ marginLeft: "2px" }}
                                            // onChange={(e) => {
                                            //   setclientdata({
                                            //     ...clientdata,
                                            //     org_admin: e.target.value,
                                            //   });
                                            // }}
                                            onChange={(e) =>
                                              validateOrgEmail(e)
                                            }
                                          />
                                        </div>
                                        <div
                                          className={`${
                                            orgAdminEmailError ? "show" : "hide"
                                          }`}
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                            textAlign: "left",
                                            paddingLeft: "66px",
                                          }}
                                        >
                                          {/* <WarningIcon /> */}
                                          &nbsp; {orgAdminEmailError}
                                        </div>
                                      </form>
                                    </div>
                                    <div className="submit-btn-wrap-modal2">
                                      <input
                                        type="submit"
                                        class="btn btn-success"
                                        name="submit"
                                        id="Save"
                                        value="Send"
                                        // onClick={handleSave}
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                        {/* End of Modal */}
                      </form>
                    </div>
                  </div>
                </div>
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
              // onComplete={(c) => setCompletedCrop(c)}
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
};

export default ClientDetailsForm;
