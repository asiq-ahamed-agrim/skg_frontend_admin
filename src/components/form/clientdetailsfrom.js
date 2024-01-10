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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientDetailsForm = (props) => {
  const [clientdata, setclientdata] = useState({
    org_name: "",
    org_domain: "",
    org_key: "",
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

  const clientstate = useSelector((state) => state.counter.clientaddstatevalue);
  const dispatch = useDispatch();

  const addItemToList = () => {
    setclientdata((prev) => {
      return {
        ...prev,
        store_info: [
          ...clientdata.store_info,
          {
            store_name: "",
            store_email: "",
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
    console.log(canvas);
    // if(crop&&crop.width!=undefined&&crop.width!=''){
    const image = document.getElementById("localimg");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    console.log(crop);
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

    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // const pixels = imageData.data;
    // const backgroundColor = [255, 255, 255,255]; // RGBA values for the background color
    // for (let i = 0; i < pixels.length; i += 4) {
    //   // Check if the pixel is transparent (alpha channel is 0)
    //   if (pixels[i + 3] === 0) {
    //     // Set the pixel to the background color
    //     pixels[i] = backgroundColor[0]; // Red
    //     pixels[i + 1] = backgroundColor[1]; // Green
    //     pixels[i + 2] = backgroundColor[2]; // Blue
    //     pixels[i + 3] = backgroundColor[3]; // Alpha
    //   }
    // }
    // ctx.putImageData(imageData, 0, 0);
    var dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1], // offset array
      s = 100, // thickness scale
      i = 0, // iterator
      x = 5, // final position
      y = 5;

    // draw images at offsets from the array scaled by s
    for (; i < dArr.length; i += 2)
      ctx.drawImage(image, x + dArr[i] * s, y + dArr[i + 1] * s);

    // fill with color
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw original image in normal mode
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y);
    // console.log(image1)

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        const croppedFile = new File([blob], "croppedimg.png", {
          type: "image/png",
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
            console.log(url);
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
                setcreatspeciality({
                  ...creatspeciality,
                  speciality_image: String(res.data.data).split("?")[0],
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
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgsrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    console.log(clientdata, "clientdata", localStorage.getItem("token") + "");
    // debugger;
    axios({
      method: "post",
      url: ClientCreate,
      data: clientdata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);

        dispatch(clientaddstate(""));
        toast.success('Client Created Successfully'); 
        // props.loaderchange("true");       
      })
      .catch((error) => {
        console.log(error, "err2");
        // debugger;
        // props.loaderchange("false");
        toast.error('Organization Name Already Exists');
       
      });
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
              <h5 class="modal-title">
                {/* {clientstate} */}
                Customer Creation
              </h5>
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
              <div class=" p-1" style={{ marginLeft: "15px" }}>
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
                          <div className="col-2 title">Organization:</div>
                          <div className="row mb-2">
                            <div className="col-3">
                              <input
                                type="text"
                                name="org_name"
                                className="form-control"
                                placeholder="Organization Name"
                                class="form-control name_list"
                                value={clientdata.org_name}
                                onChange={(e) => {
                                  setclientdata({
                                    ...clientdata,
                                    org_name: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-3">
                              <input
                                type="text"
                                name="org_domain"
                                className="form-control"
                                placeholder="Organization Domain"
                                class="form-control name_email"
                                value={clientdata.org_domain}
                                onChange={(e) => {
                                  setclientdata({
                                    ...clientdata,
                                    org_domain: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-3">
                              <input
                                type="text"
                                name="org_key"
                                className="form-control"
                                placeholder="Organization Key"
                                class="form-control name_email"
                                value={clientdata.org_key}
                                onChange={(e) => {
                                  setclientdata({
                                    ...clientdata,
                                    org_key: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-2 title">Store Details:</div>
                          <div className="store-wrap">
                            {clientdata.store_info.map((ele, index) => {
                              return (
                                <div
                                  className="row"
                                  style={{ marginBottom: "0px" }}
                                >
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      name="store_name"
                                      className="form-control"
                                      placeholder="Store Name"
                                      class="form-control name_list"
                                      value={ele.store_name}
                                      onChange={(e) => changedata(e, index)}
                                    />
                                  </div>
                                  <div className="col-3">
                                    <input
                                      type="email"
                                      name="store_email"
                                      className="form-control"
                                      placeholder="Store Email"
                                      class="form-control name_email"
                                      value={ele.store_email}
                                      onChange={(e) => changedata(e, index)}
                                    />
                                  </div>
                                  <div className="col-3">
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
                                    <div className="col-1">
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
                                    <div className="col-1">
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

                          <div className="col-2 title pt-0 mt-0">
                            Contact Person:{" "}
                          </div>
                          <div className="row mb-2">
                            <div className="col-3">
                              <input
                                type="text"
                                name="con_name"
                                className="form-control"
                                placeholder="Client Contact Name"
                                class="form-control name_list"
                                value={clientdata.con_name}
                                onChange={(e) => {
                                  setclientdata({
                                    ...clientdata,
                                    con_name: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-3">
                              <input
                                type="email"
                                name="con_email"
                                className="form-control"
                                placeholder="Client Contact Email"
                                class="form-control name_email"
                                value={clientdata.con_email}
                                onChange={(e) => {
                                  setclientdata({
                                    ...clientdata,
                                    con_email: e.target.value,
                                  });
                                }}
                              />
                            </div>
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
                                <p style={{ margin: 0, padding: 10 }}>
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
                        <div className="submit-btn-wrap">
                          <input
                            type="submit"
                            class="btn btn-success"
                            name="submit"
                            id="submit"
                            value="Submit"
                            onClick={handleSubmit}
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
                                Who Should Receive the Domain and Key ?
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
                                      className="col-10 form-group"
                                      style={{ paddingLeft: "0px" }}
                                    >
                                      <form
                                        name="add_name"
                                        id="add_name"
                                        onSubmit={handleSubmit}
                                      >
                                        <div className="modal2-email-wrap">
                                          <label className="email-label">
                                            Email :
                                          </label>
                                          <input
                                            type="email"
                                            name="org_admin"
                                            className="form-control-modal2"
                                            // placeholder="Email"
                                            class="form-control name_email"
                                            value={clientdata.org_admin}
                                            onChange={(e) => {
                                              setclientdata({
                                                ...clientdata,
                                                org_admin: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </form>
                                    </div>
                                    <div className="submit-btn-wrap-modal2">
                                      <input
                                        type="submit"
                                        class="btn btn-success"
                                        name="submit"
                                        id="Save"
                                        value="Save"
                                        onClick={handleSave}
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
