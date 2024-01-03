import React, { useEffect, useState,useRef } from "react";
import "../style/form/bannerform.scss";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { bannerdata, editdoctoruser } from "../redux/reducer/counterslice";
import {
  banner,
  presignedurl,
} from "../../text/apidata";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function BannerForm(props) {
  const [preurl, setpreurl] = useState();
  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();
  const [alert, setalert] = useState(false);

  const [creatsymptoms, setcreatsymptoms] = useState({
    banner_name: "",
    display_order: "",
    image_url: "",
    is_active: "true",
  });
  const settings = useNavigate();
  //
  const [order,setorder]=useState()
  const [ordererror, setordererror] = useState(false);
  const [bannername, setbannername] = useState("");
  const [errorbannername, seterrorbannername] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const symptomsedit = useSelector((state) => state.counter.bannerdata);
  const dispatch = useDispatch();
  const routehead = useNavigate();
  const bannereditid = useSelector((state) => state.counter.bannerid);
  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);
  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [file, setFile] = useState([]);
  const [crop, setCrop] = useState(
    // {
    //   unit: 'px', // Can be 'px' or '%'
    //   x: 25,
    //   y: 25,
    //   width: 510,
    //   height: 510
    // }

  );

  useEffect(() => {
    console.log(symptomsedit);
    if (symptomsedit == "banneredit") {
      axios({
        method: "get",
        url: banner + bannereditid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          console.log(res);
            setbannername(res.data.data.banner_name);
            setUrl(res.data.data.image_url);
            setorder(res.data.data.display_order)
            setcreatsymptoms({
              ...creatsymptoms,
              "banner_name": res.data.data.banner_name,
              "display_order": res.data.data.display_order,
              "image_url": res.data.data.image_url,
              "is_active": res.data.data.is_active,
                      });
                      setChecked(res.data.data.is_active)
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
    if (bannername != "" &&bannername != null && creatsymptoms.display_order != "" && (creatsymptoms.display_order != null&& creatsymptoms.display_order>=0)) {
      if (symptomsedit == "banneredit") {
        if (
          creatsymptoms.image_url &&
          creatsymptoms.image_url.length > 0
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
              url: banner + bannereditid + "/",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  setalert(false)

                  settings("/Banner");
                  
                  dispatch(bannerdata(""));
                  props.popupalert("true");
                  props.popuptext("Banner Details Updated Successfully");
                  // window.location.href = "/Banner";
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);

                  props.loaderchange("false");
                }
              })
              .catch((error) => {
                console.log(error);
                // if(error.response.data.data.display_order[0]=="banner_display_dashboard with this display order already exists."){
                //   props.popupalert("true");
                //   props.popuptext(error.response.data.data.display_order[0]);
  
                //   setTimeout(() => {
                //     props.popupalert("false");
                //   }, 2000);
                //   props.loaderchange("false");
  
                // }
                // else{
                  props.popupalert("true");
                  props.popuptext(error.response.data.status.message);
  
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);
                  props.loaderchange("false");
  
                // }
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
              url: banner,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                // console.log(res.data, "table");
                setalert(false)

                settings("/Banner");
                dispatch(bannerdata(""));
              props.popupalert("true");
                props.popuptext("Banner Created Successfully");
                // window.location.href = "/Banner";
                setTimeout(() => {
                  props.popupalert("false");
                }, 2000);

                props.loaderchange("false");
              })
              .catch((error) => {
                console.log(error);
                // if(error.response.data.data.display_order[0]=="banner_display_dashboard with this display order already exists."){
                //   props.popupalert("true");
                //   props.popuptext(error.response.data.data.display_order[0]);
  
                //   setTimeout(() => {
                //     props.popupalert("false");
                //   }, 2000);
                //   props.loaderchange("false");
  
                // }
                // else{
                  props.popupalert("true");
                  props.popuptext(error.response.data.status.message);
  
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);
                  props.loaderchange("false");
  
                // }
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
      if (creatsymptoms.display_order == "" || creatsymptoms.display_order>=0) {
        setordererror(true);
      }
      if(creatsymptoms.image_url==""){
        props.popupalert("true");
        props.popuptext("Upload Image to Continue");
        setTimeout(() => {
          props.popupalert("false");
        }, 2000);

      }
      if (bannername == "") {
        seterrorbannername(true);
      } else {
        seterrorbannername(false);
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
          dispatch(bannerdata(""));
          setalert(false)

          settings("/Banner");
              }
      });
    } else {
      dispatch(bannerdata(""));
      setalert(false)

      settings("/Banner");
      }

  };

const formvalidation=(e)=>{
  setalert(true);

  if (e.target.name == "display_order") {
    const { name, value } = e.target;
    if(e.target.value.length <= 2){
      setorder(e.target.value)
    setordererror(false);
    setcreatsymptoms({
      ...creatsymptoms,
      [name]: value,
    });
  }
  else{
    return false
  }
  }

  if(e.target.name=="banner_name"){
    setbannername(e.target.value);
    seterrorbannername(false);
    const { name, value } = e.target;

    setcreatsymptoms({
      ...creatsymptoms,
      [name]: value,
    });

    if (e.target.value == "") {
      seterrorbannername(true);
    }

  }

}

  const handleFiles = (e) => {
    selectedImage(e);
    setCroppImageViewCount(1);
    setCroppImageView(true);
    setalert(true)

  };
  const cancel = (e) => {
    setalert(true);

    setUrl("");
    setcreatsymptoms({
      ...creatsymptoms,
      image_url: "",
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const checkbox = (e) => {
    // console.log(e, e.target.checked);
    setalert(true)
    setChecked(e.target.checked);
    setcreatsymptoms({
      ...creatsymptoms,
      is_active: e.target.checked,
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
                  image_url: String(res.data.data).split("?")[0],
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
        <div className="parent-bannerform">
          <div className="create-bannerform card">
            <div class="modal-header">
              <h5 class="modal-title">
                {symptomsedit == "banneredit" ? "Banner Edit" : "Banner Create"}
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
                  <div class="form-group col-md-6 mt-3">
                    <label for="validationCustom01" class="form-label">
                      Banner Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      name="banner_name"
                      value={
                        symptomsedit == "banneredit"
                          ? creatsymptoms.banner_name
                          : bannername
                      }
                      onKeyDown={(e)=>{  if (e.target.value.length === 0 && e.which === 32)
                        { e.preventDefault();  }
}}

                      onChange={(e) => formvalidation(e)}
                      required
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errorbannername ? "Required Bannername" : ""}{" "}
                    </p>
                  </div>
                  <div class="form-group col-md-6 mt-3">
                    <label for="validationCustom01" class="form-label">
                      Display Order
                    </label>

                    <input
                      autoComplete="off"
                      type="number"
                      min="0"
                      onWheel={(e)=>{    document.activeElement.blur();                        }}
                      onKeyDown={(e) => {
                        if (
                          !(
                            (e.keyCode > 95 && e.keyCode < 106) ||
                            (e.keyCode > 47 && e.keyCode < 58) ||
                            e.keyCode == 8
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                      class="form-control"
                      id="validationCustom03"
                      name="display_order"
                        onChange={(e) => formvalidation(e)}
                        value={
                          symptomsedit == "banneredit"
                            ? creatsymptoms.display_order
                            : order
                        }
                        required
                    ></input>
                    <p style={{ fontSize: "12px", color: "red" }}>
                      { ordererror ? "Order Required" : ""}                
                    </p>
                  </div>
                </div>
                <div
                  class="form-row"
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div class="form-group col-md-6 " style={{ width: "90px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => checkbox(e)}
                      id="invalidCheck"
                      required
                    ></input>
                    <label class="form-check-label" for="invalidCheck">
                      Is Active
                    </label>
                  </div>
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
                      disabled={symptomsedit == "banneredit"&&!alert?true:false}
                    >
                      {symptomsedit == "banneredit"
                        ? "Update Banner"
                        : "Create Banner"}
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

export default BannerForm;
