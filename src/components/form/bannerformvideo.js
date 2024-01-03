import React, { useEffect, useState,useRef } from "react";
import "../style/form/bannerform.scss";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  videobannerstate,
  editdoctoruser,
} from "../redux/reducer/counterslice";
import { bannervideo, presignedurl } from "../../text/apidata";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function BannerFormVideo(props) {
  const [preurl, setpreurl] = useState();
  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();

  const [creatsymptoms, setcreatsymptoms] = useState({
    banner_name: "",
    display_order: "",
    file_url: "",
    is_active: "true",
    file_type: "",
    description:"",
  });
  const settings = useNavigate();
  //
  const [order, setorder] = useState();
  const [ordererror, setordererror] = useState(false);
  const [bannername, setbannername] = useState("");
  const [errorbannername, seterrorbannername] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [disvalue, setdisvalue] = useState("");
  const [errordisvalue, seterrordisvalue] = useState(false);



  const symptomsedit = useSelector((state) => state.counter.videobannerstate);
  const dispatch = useDispatch();
  const routehead = useNavigate();
  const bannereditid = useSelector((state) => state.counter.videobannerid);
  const [alert, setalert] = useState(false);

  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);
  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [file, setFile] = useState([]);
  const [crop, setCrop] = useState();

  useEffect(() => {
    console.log(symptomsedit);
    if (symptomsedit == "banneredit") {
      axios({
        method: "get",
        url: bannervideo + bannereditid + "/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") + "",
        },
      })
        .then((res) => {
          console.log(res);
          setbannername(res.data.data.banner_name);
          setUrl(res.data.data.file_url);
          setorder(res.data.data.display_order);
          setdisvalue(res.data.data.description)
          setcreatsymptoms({
            ...creatsymptoms,
            banner_name: res.data.data.banner_name,
            display_order: res.data.data.display_order,
            file_url: res.data.data.file_url,
            file_type: res.data.data.file_type,
            is_active: res.data.data.is_active,
            description:res.data.data.description
          });
          setChecked(res.data.data.is_active);
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
    console.log(creatsymptoms);
    if (
      bannername != "" &&
      bannername != null &&
      creatsymptoms.display_order != "" &&
      creatsymptoms.display_order != null &&
      creatsymptoms.display_order >= 0
    ) {
      if (symptomsedit == "banneredit") {
        if (creatsymptoms.file_url && creatsymptoms.file_url.length > 0) {
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
              url: bannervideo + bannereditid + "/",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  setalert(false);

                  settings("/BannerVideo");
                  dispatch(videobannerstate(""));
                  props.popupalert("true");
                  props.popuptext("Banner Details Updated Successfully");
                  // window.location.href = "/BannerVideo";
                  setTimeout(() => {
                    props.popupalert("false");
                  }, 2000);
                  window.location.reload();
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
              url: bannervideo,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") + "",
              },
            })
              .then((res) => {
                // console.log(res.data, "table");
                setalert(false);

                settings("/BannerVideo");
                dispatch(videobannerstate(""));
                props.popupalert("true");
                props.popuptext("Banner Created Successfully");
                // window.location.href = "/BannerVideo";
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
      if (
        creatsymptoms.display_order == "" ||
        creatsymptoms.display_order >= 0
      ) {
        setordererror(true);
      }
      if (creatsymptoms.file_url == "") {
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
          dispatch(videobannerstate(""));
          setalert(false);

          settings("/BannerVideo");
        }
      });
    } else {
      dispatch(videobannerstate(""));
      setalert(false);

      settings("/BannerVideo");
    }
  };

  const formvalidation = (e) => {
    setalert(true);

    if (e.target.name == "display_order") {
      const { name, value } = e.target;
      if (e.target.value.length <= 2) {
        setorder(e.target.value);
        setordererror(false);
        setcreatsymptoms({
          ...creatsymptoms,
          [name]: value,
        });
      } else {
        return false;
      }
    }
    if (e.target.name == "description") {
      setdisvalue(e.target.value);
      seterrordisvalue(false);
      const { name, value } = e.target;
  
      setcreatsymptoms({
        ...creatsymptoms,
        [name]: value.trim().split(/ +/).join(" "),
      });
  
      if (e.target.value == "") {
        seterrordisvalue(true);
      }
  
    }
    if (e.target.name == "banner_name") {
      
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
  };

  const handleFiles = (e) => {
    if(e.target.files[0].type=="image/png"||e.target.files[0].type=="image/jpeg"){
      selectedImage(e);
      setCroppImageViewCount(1);
      setCroppImageView(true);
      setalert(true)
      setcreatsymptoms({
        ...creatsymptoms,
        file_type: e.target.files[0].type,
      });
  
  
    }
    else{
    setalert(true);
    console.log(e.target, e.target.files[0].type);
    setimgfile(e.target.files[0]);
    setimgtype(e.target.files[0].type);
    setcreatsymptoms({
      ...creatsymptoms,
      file_type: e.target.files[0].type,
    });
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);

    var val = Math.floor(1000 + Math.random() * 9000);
    var url = {
      multiple_files: [
        {
          filename:
            "assestsfortesting" +
            "/" +
            String(val) +
            String(e.target.files[0].name).replace(/ +/g, ""),
          file_type: e.target.files[0].type,
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
            file_url: String(res.data.data).split("?")[0],
            file_type: e.target.files[0].type,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }
  };
  const cancel = (e) => {
    setalert(true);

    setUrl("");
    setcreatsymptoms({
      ...creatsymptoms,
      file_url: "",
      file_type: "",
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
                  file_url: String(res.data.data).split("?")[0],
                  file_type: croppedFile.type,
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
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      value={
                        symptomsedit == "banneredit"
                          ? creatsymptoms.banner_name
                          : bannername
                      }
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
                      onWheel={(e) => {
                        document.activeElement.blur();
                      }}
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
                      {ordererror ? "Order Required" : ""}
                    </p>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="validationCustom01" class="form-label">
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      class="form-control"
                      id="validationCustom01"
                      name="description"
                      value={
                          disvalue
                      }
                      style={{ resize: "none" }}
                      onChange={(e) => formvalidation(e)}
                      onKeyDown={(e)=>{  if (e.target.value.length === 0 && e.which === 32)
                        { e.preventDefault();  }
}}

                      rows="4"
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
                        creatsymptoms.file_type == "video/mp4" ? (
                          <>
                            <video width="100" height="100" controls autoplay>
                              <source src={url} type="video/mp4"></source>
                            </video>
                          </>
                        ) : (
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
                        )
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
                            Upload Image or Videos
                            <input
                              type="file"
                              hidden
                              accept="image/png, image/jpeg ,video/mp4,video/x-m4v,video/*"
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
                      disabled={
                        symptomsedit == "banneredit" && !alert ? true : false
                      }
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

export default BannerFormVideo;
