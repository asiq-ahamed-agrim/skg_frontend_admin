import React, { useEffect, useState, useRef } from "react";
import "../style/form/specialityform.scss";
import BasicTable from "../maincomponent/reacttable/table";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { editdoctoruser } from "../redux/reducer/counterslice";
import { TextField } from "@material-ui/core";
import { spacilitycreate, presignedurl } from "../../text/apidata";
import { useSelector, useDispatch } from "react-redux";
import { speciality, specialityid } from "../redux/reducer/counterslice";
import Swal from "sweetalert2";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// import 'bootstrap/dist/css/bootstrap.min.css';
function SpecialityForm(props) {
  const [preurl, setpreurl] = useState();

  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();
  const [isactive, setisactive] = useState(false);

  const [creatspeciality, setcreatspeciality] = useState({
    name: "",
    description: "",
    speciality_image: "",
    featured_product: false,
    is_active: false,
  });
  const settings = useNavigate();
  //
  const [specialityvalue, setspecialityvalue] = useState("");
  const [errorspecialityvalue, seterroespecialityvalue] = useState(false);
  const [disvalue, setdisvalue] = useState("");
  const [errordisvalue, seterrordisvalue] = useState(false);
  const [checked, setChecked] = useState(false);

  const specialityedit = useSelector((state) => state.counter.speciality);
  const dispatch = useDispatch();

  const specialityid = useSelector((state) => state.counter.specialityid);
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
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const checkbox2 = (e) => {
    setalert(true);
    setisactive(e.target.checked);
    setcreatspeciality({
      ...creatspeciality,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    if (specialityedit == "specialityedit") {
      props.loaderchange("true");

      axios({
        method: "get",
        url: spacilitycreate + specialityid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          console.log(res.data.data.speciality_image, "table");
          setspecialityvalue(res.data.data.name);
          setdisvalue(res.data.data.description);
          setUrl(res.data.data.speciality_image);
          setChecked(res.data.data.featured_product);

          const name = "name";
          setcreatspeciality({
            ...creatspeciality,
            [name]: res.data.data.name,
            description: res.data.data.description,
            speciality_image: res.data.data.speciality_image,
            is_active: res.data.data.is_active,
            featured_product: res.data.data.featured_product,
          });
          props.loaderchange("false");
          setisactive(res.data.data.is_active);
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
  }, []);

  const newusercreat = () => {
    console.log(creatspeciality);
    if (
      specialityvalue != "" &&
      specialityvalue != null &&
      disvalue != "" &&
      disvalue != null
    ) {
      if (specialityedit == "specialityedit") {
        if (
          creatspeciality.speciality_image &&
          creatspeciality.speciality_image.length > 0
        ) {
          props.loaderchange("true");
          async function editimage() {
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

            axios({
              method: "put",
              data: creatspeciality,
              url: spacilitycreate + specialityid + "/",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  setalert(false);

                  settings("/Speciality");
                  dispatch(speciality(""));
                  props.popupalert("true");
                  props.popuptext("Speciality  Updated Successfully");
                  // window.location.href = "/Speciality";
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
                "Content-Type": imgtype,
                "X-Amz-ACL": "public-read",
              },
            }).catch((err) => {
              console.log(err);
              return null;
            });

            axios({
              method: "post",
              data: creatspeciality,
              url: spacilitycreate,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                setalert(false);

                settings("/Speciality");
                dispatch(speciality(""));
                props.popupalert("true");
                props.popuptext("Speciality  Created Successfully");
                // window.location.href = "/Speciality";

                setTimeout(() => {
                  props.popupalert("false");
                }, 2000);

                props.loaderchange("false");
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
      if (specialityvalue == "" || specialityvalue == null) {
        seterroespecialityvalue(true);
      }
      if (disvalue == "" || disvalue == null) {
        seterrordisvalue(true);
      }
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
          dispatch(speciality(""));
          setalert(false);

          settings("/Speciality");
        }
      });
    } else {
      dispatch(speciality(""));
      setalert(false);

      settings("/Speciality");
    }
  };
  const specialityvalidation = (e) => {
    setalert(true);

    const { name, value } = e.target;
    const re = /^[A-Za-z ]+$/;
    if (value === "" || re.test(value)) {
      setspecialityvalue(e.target.value);
      seterroespecialityvalue(false);

      setcreatspeciality({
        ...creatspeciality,
        [name]: value.trim().split(/ +/).join(" "),
      });

      if (e.target.value == "") {
        seterroespecialityvalue(true);
      }
    }
  };

  const Descriptionvalidation = (e) => {
    setalert(true);

    setdisvalue(e.target.value);
    seterrordisvalue(false);
    const { name, value } = e.target;

    setcreatspeciality({
      ...creatspeciality,
      [name]: value.trim().split(/ +/).join(" "),
    });

    if (e.target.value == "") {
      seterrordisvalue(true);
    }
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

  const checkbox = (e) => {
    setalert(true);

    // console.log(e, e.target.checked);
    setChecked(e.target.checked);
    setcreatspeciality({
      ...creatspeciality,
      [e.target.name]: e.target.checked,
    });

    // console.log(checkboxvalue, "checkboxvalue");
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
  return (
    <>
      <div className="maincontainer">
        <div className="parent-specialityform">
          <div className="create-specialityform card">
            <div class="modal-header">
              <h5 class="modal-title">
                {specialityedit == "specialityedit"
                  ? "Speciality Edit"
                  : "Speciality Create"}
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

            <div class="modal-body" style={{ padding: "0 !important" }}>
              <form
                style={{ padding: "0 1.5rem 0rem" }}
                className="formspace"
                onSubmit={handleSubmit}
              >
                <div
                  class="form-row"
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    placeContent: "center space-between",
                    alignItems: "center",
                  }}
                >
                  <div class="form-group col-md-4 p-3 mb-5">
                    <label for="validationCustom01" class="form-label">
                      Speciality
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      name="name"
                      value={specialityvalue}
                      onChange={(e) => specialityvalidation(e)}
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      required
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorspecialityvalue ? "Speciality Required" : ""}{" "}
                    </p>
                  </div>
                  <div class="form-group col-md-8 p-3">
                    <label for="validationCustom01" class="form-label">
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      class="form-control"
                      id="validationCustom01"
                      name="description"
                      value={disvalue}
                      style={{ resize: "none" }}
                      onChange={(e) => Descriptionvalidation(e)}
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      rows="3"
                      required
                    ></textarea>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errordisvalue ? "Description Required" : ""}
                    </p>
                  </div>
                </div>

                <div
                  class="form-row"
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    placeContent: "start",
                    alignItems: "center",
                    height: "144px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <div
                    class="form-group col-md-6 p-4"
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
                          Upload Speciality Picture
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
                  <div class="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={checked}
                        name="featured_product"
                        onChange={(e) => checkbox(e)}
                        id="invalidCheck"
                      ></input>
                      <label class="form-check-label" for="invalidCheck">
                        Featured Speciality
                      </label>
                    </div>
                  </div>
                  <div
                    class="col-md-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="is_active"
                        checked={isactive}
                        onChange={(e) => checkbox2(e)}
                        id="invalidCheck"
                      ></input>
                      <label class="form-check-label" for="invalidCheck">
                        Is Active
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  class="form-row"
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    placeContent: "center space-between",
                    alignItems: "center",
                  }}
                >
                  <div class="form-group col-md-12">
                    <button
                      type="submit"
                      class="btn btn-primary  create"
                      onClick={(e) => newusercreat(e)}
                      disabled={
                        specialityedit == "specialityedit" && !alert
                          ? true
                          : false
                      }
                    >
                      {specialityedit == "specialityedit"
                        ? "Update Speciality "
                        : "Create Speciality"}
                    </button>
                  </div>
                </div>
              </form>
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
}

export default SpecialityForm;
