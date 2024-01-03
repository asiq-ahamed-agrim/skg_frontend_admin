import React, { useEffect, useState,useRef } from "react";
import "../style/form/symptomsform.scss";
import BasicTable from "../maincomponent/reacttable/table";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { editdoctoruser } from "../redux/reducer/counterslice";
import { TextField } from "@material-ui/core";
import {
  symptomscreate,
  spacilitylist,
  presignedurl,
} from "../../text/apidata";
import { Multiselect } from "multiselect-react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { symptoms, symptomsid } from "../redux/reducer/counterslice";
import Swal from "sweetalert2";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// import 'bootstrap/dist/css/bootstrap.min.css';
function SymptomsForm(props) {
  const [preurl, setpreurl] = useState();
  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();
  const [isactive, setisactive] = useState(false);

  const [creatsymptoms, setcreatsymptoms] = useState({
    symptoms: "",
    speciality: [],
    symptoms_image: "",
    featured_product: false,
    is_active:false
  });
  const settings = useNavigate();
  //
  const [specialityerror, setspecialityerror] = useState(false);
  const [symptomsvalue, setsymptomsvalue] = useState("");
  const [errorsymptomsvalue, seterroesymptomsvalue] = useState(false);
  const [doctorspacilityselected, setdoctorspacilityselected] = useState([]);
  const [doctorspacilitylist, setdoctorspacility] = useState([]);
  const [checked, setChecked] = useState(false);
  const [alert, setalert] = useState(false);
  const symptomsedit = useSelector((state) => state.counter.symptoms);
  const dispatch = useDispatch();
  const routehead = useNavigate();
  const symptomsid = useSelector((state) => state.counter.symptomsid);

  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);
  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [file, setFile] = useState([]);
  const [crop, setCrop] = useState();
  const checkbox2 = (e) => {
    setalert(true);
    setisactive(e.target.checked);
    setcreatsymptoms({
      ...creatsymptoms,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    console.log(symptomsedit);
    if (symptomsedit == "symptomsedit") {
      axios({
        method: "get",
        url: symptomscreate + symptomsid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          setsymptomsvalue(res.data.data.symptoms);
          setUrl(res.data.data.symptoms_image);
          setChecked(res.data.data.featured_product);

          let spacilityArray = [];
          let spacilityArrayid = [];
          // console.log(res.data.status.code);
          if (res.data.status.code) {
            res.data.data.speciality.forEach((element) => {
              spacilityArray.push({ key: element.id, cat: element.name });
              spacilityArrayid.push(element.id);
            });
            setisactive(res.data.data.is_active)

            setdoctorspacilityselected(spacilityArray);
          }
          const name = "symptoms";
          const name2 = "speciality";
          setcreatsymptoms({
            ...creatsymptoms,
            [name]: res.data.data.symptoms,
            [name2]: spacilityArrayid,
            symptoms_image: res.data.data.symptoms_image,
            is_active:res.data.data.is_active,
            featured_product:res.data.data.featured_product

          });
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
    axios({
      method: "get",
      url: spacilitylist,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") + "",
      },
    })
      .then((res) => {
        let objectArray = [];
        // console.log(res.data.status.code);
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

  const newusercreat = () => {
    if (symptomsvalue != "" && creatsymptoms.speciality != "") {
      if (symptomsedit == "symptomsedit") {
        if (
          creatsymptoms.symptoms_image &&
          creatsymptoms.symptoms_image.length > 0
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
              data: creatsymptoms,
              url: symptomscreate + symptomsid + "/",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  setalert(false);

                  settings("/Symptoms");
                  dispatch(symptoms(""));
                  props.popupalert("true");
                  props.popuptext("Symptoms Details Updated Successfully");
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
            console.log(resp, "test resp");

            axios({
              method: "post",
              data: creatsymptoms,
              url: symptomscreate,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                // console.log(res.data, "table");
                setalert(false);

                settings("/Symptoms");
                dispatch(symptoms(""));
                props.popupalert("true");
                props.popuptext("Symptoms Created Successfully");
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
      if (creatsymptoms.speciality == "") {
        setspecialityerror(true);
      }
      if (symptomsvalue == "") {
        seterroesymptomsvalue(true);
      } else {
        seterroesymptomsvalue(false);
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
          dispatch(symptoms(""));
          settings("/Symptoms");
          setalert(false);
        }
      });
    } else {
      dispatch(symptoms(""));
      settings("/Symptoms");
      setalert(false);
    }
  };
  const symptomvalidation = (e) => {
    setalert(true);
    const { name, value } = e.target;
    const re = /^[A-Za-z ]+$/;
    if (value === "" || re.test(value)) {
      setsymptomsvalue(e.target.value);
      seterroesymptomsvalue(false);

      setcreatsymptoms({
        ...creatsymptoms,
        [name]: value.trim().split(/ +/).join(" "),
      });

      if (e.target.value == "") {
        seterroesymptomsvalue(true);
      }
    }
  };
  const mltiselect = (e) => {
    setalert(true);

    setspecialityerror(false);
    let l1 = [];
    e.length > 0 &&
      e.map((ele) => {
        l1.push(ele.key);
      });
    setcreatsymptoms({
      ...creatsymptoms,
      speciality: l1,
    });
  };

  const handleFiles = (e) => {
    selectedImage(e);
    setCroppImageViewCount(1);
    setCroppImageView(true);
    setalert(true)
  };
  const cancel = (e) => {
    setUrl("");
    setcreatsymptoms({
      ...creatsymptoms,
      symptoms_image: "",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const checkbox = (e) => {
    setalert(true);

    // console.log(e, e.target.checked);
    setChecked(e.target.checked);
    setcreatsymptoms({
      ...creatsymptoms,
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
    const image = document.getElementById("localimg");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    if(crop){
      canvas.width = crop.width;
    canvas.height = crop.height;
    }
    else{
      canvas.width = image.width;
    canvas.height = image.height;
    }
    const ctx = canvas.getContext("2d");
if(crop){
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

}
else{
  ctx.drawImage(
    image,
    scaleX,
    scaleY,
    image.width* scaleX,
    image.height* scaleY,
    0,
    0,
    image.width,
    image.height,
  );

}


const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data;
const backgroundColor = [139, 69 ,19,255]; // RGBA values for the background color
for (let i = 0; i < pixels.length; i += 4) {
  // Check if the pixel is transparent (alpha channel is 0)
  if (pixels[i + 3] === 0) {
    // Set the pixel to the background color
    pixels[i] = backgroundColor[0]; // Red
    pixels[i + 1] = backgroundColor[1]; // Green
    pixels[i + 2] = backgroundColor[2]; // Blue
    pixels[i + 3] = backgroundColor[3]; // Alpha
  }
}
const image1 =ctx.putImageData(imageData, 0, 0);

// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const pixels = imageData.data;
// const backgroundColor = [229,246,249,255]; // RGBA values for the background color (fully transparent black)
// for (let i = 0; i < pixels.length; i += 4) {
//   // Check if the pixel is transparent (alpha channel is 0)
//   if (pixels[i + 3] === 0) {
//     // Set the pixel to the background color (fully transparent black)
//     pixels[i] = backgroundColor[0]; // Red
//     pixels[i + 1] = backgroundColor[1]; // Green
//     pixels[i + 2] = backgroundColor[2]; // Blue
//     pixels[i + 3] = backgroundColor[3]; // Alpha
//   }
// }
// ctx.putImageData(imageData, 0, 0);


// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//          ctx.globalAlpha = 0.0;

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
          console.log(croppedFile)
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
                setcreatsymptoms({
                  ...creatsymptoms,
                  symptoms_image: String(res.data.data).split("?")[0],
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
  
  }
  const setCompletedCrop = async (c) => {
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
        <div className="parent-symptomsform">
          <div className="create-symptomsform card">
            <div class="modal-header">
              <h5 class="modal-title">
                {symptomsedit == "symptomsedit"
                  ? "Symptoms Edit"
                  : "Symptoms Create"}
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
                  <div class="form-group col-md-4 mt-3">
                    <label for="validationCustom01" class="form-label">
                      Symptoms
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      name="symptoms"
                      value={
                          symptomsvalue
                      }
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => symptomvalidation(e)}
                      // onKeyDown={(e) => {
                      //   if (e.which == "32") {
                      //     e.preventDefault();
                      //   }
                      // }}

                      required
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorsymptomsvalue ? "symptoms Required" : ""}{" "}
                    </p>
                  </div>
                  <div class="form-group col-md-8 ">
                    <label for="validationCustom01" class="form-label">
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
                        chips: {
                          background: "#4D9BD7",
                          borderRadius: "3px",
                          margin: "3px",
                        },
                        option: { color: "black", backgroundColor: "white" },
                        inputField: { margin: "-5px 5px", height: "40px" },
                        searchBox: {
                          padding: "0px",
                        },
                      }}
                    />
                    {specialityerror ? (
                      <p style={{ fontSize: "12px", color: "red" }}>
                        Speciality Required
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  class="form-row"
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    placeContent: "start",
                    alignItems: "center",
                  }}
                >
                  <div
                    class="form-group col-md-6 "
                    style={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <>
                      {url ? (
                        <img
                          src={url}
                          onClick={(e)=>{window.open(url)}}
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
                          Upload Symptoms Picture
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
                        Featured Symptoms
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
                        symptomsedit == "symptomsedit" && !alert ? true : false
                      }
                    >
                      {symptomsedit == "symptomsedit"
                        ? "Update Symptoms"
                        : "Create Symptoms"}
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

export default SymptomsForm;
