import "../style/page/report.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStoreId, setProductId } from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo, useRef } from "react";
import { StoreDetails, OrgUserDetails } from "../../text/apidata";
import BasicTable from "../maincomponent/reacttable/table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "../../components/style/page/storepage.scss";
import $ from "jquery";
import Button from "@mui/material/Button";
import { presignedurl, presignedurl2 } from "../../text/apidata";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import {
  CreateProductData,
  getProductList,
  EditProductData,
} from "../../text/apidata";

const StorePage = (props) => {
  const Token = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabname) => {
    setActiveTab(tabname);
  };

  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const orgid = useSelector((state) => state.counter.origanisationid);
  const orgname = useSelector((state) => state.counter.origanisationname);
  console.log(orgid, "oid", orgname);

  const sid = useSelector((state) => state.counter.storeid);
  console.log(sid, "siddd");

  const pid = useSelector((state) => state.counter.productid);
  console.log(pid, "pidd");

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();
  const [datacount2, setdatacount2] = useState();

  const [popup, setpopup] = useState(false);

  const [storedetails, setstoredetails] = useState([]);

  const [editstoredetails, seteditstoredetails] = useState({
    name: "",
    email: "",
    c_person: "",
    address: "",
    store_id: sid,
  });

  console.log(editstoredetails, "sted", storedetails);

  const [orguserdata, setorguserdata] = useState([]);
  console.log(orgid);

  // product list
  const [productList, setProductList] = useState([]);

  const [productList2, setProductList2] = useState({
    name: "",
    sku: "",
    desc: "",
    logo: "",
    org_id: orgid,
  });

  console.log(productList, "pppppp", productList2);
  const [showProductModal, setProductModal] = useState(false);
  const [showProductEditModal, setProductEditModal] = useState(false);
  const [storeEditModal, setstoreEditModal] = useState(false);

  const [preurl, setpreurl] = useState();
  const [preurl2, setpreurl2] = useState();

  const [imgfile, setimgfile] = useState();
  const [imgtype, setimgtype] = useState();
  const [url, setUrl] = useState();

  const [url2, setUrl2] = useState();

  console.log(url, "uuuuu", url2);

  const [alert, setalert] = useState(false);
  const [file, setFile] = useState([]);

  const [CroppImageView, setCroppImageView] = useState(false);
  const [CroppImageViewCount, setCroppImageViewCount] = useState(0);

  const [imgsrc, setImgsrc] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();

  const [createproduct, setcreateproduct] = useState({
    name: "",
    sku: "",
    desc: "",
    logo: "",
    org_id: orgid,
  });
  console.log(createproduct, "prolist");

  const [productNameError, setProductNameError] = useState("");
  const [productSkuError, setproductSkuError] = useState("");
  const [productDescError, setproductDescError] = useState("");
  const [customerdetails3, setcustomerdetails3] = useState(false);

  // org_user
  useEffect(() => {
    props.loaderchange("true");

    axios({
      method: "get",
      url: OrgUserDetails + orgid,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        page: dtpageindex,
        page_size: dtpagesize,
        search: searchQuery,
        // is_active:isactivefilterdata
      },
    })
      .then((res) => {
        console.log(res.data.data, "orgdata");
        if (res.data.data.data != undefined && res.data.data.data != "") {
          setorguserdata(res.data.data.data);
        }
        setdatacount(res.data.data.pagination.total);
        props.loaderchange("false");
      })
      .catch((error) => {
        console.log(error, "error");
        props.loaderchange("false");
      });
  }, [dtpageindex, dtpagesize]);

  // get api store details
  useEffect(() => {
    props.loaderchange("true");

    axios({
      method: "get",
      url: `${StoreDetails}/${orgid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data, "storedata");
        if (res.data.data != undefined && res.data.data != "") {
          setstoredetails(res.data.data);
        }
        // Set initial state for editstoredetails
        seteditstoredetails(res.data.data);

        props.loaderchange("false");
      })
      .catch((error) => {
        console.log(error, "error");
        // props.popupalert("true");
        // props.popuptext(error.response.data.status.message);
        // setTimeout(() => {
        //   props.popupalert("false");
        // }, 2000);
        props.loaderchange("false");
      });
  }, []);

  // store edit function
  const handleStoreEdit = (storeID) => {
    setstoreEditModal(true);
    dispatch(setStoreId(storeID));
    console.log(storeID, "sisi");
  };

  const handleStoreEditCloseModal = () => {
    setstoreEditModal(false);
  };

  useEffect(() => {
    if (popup == false) {
      // props.loaderchange("true");
      // console.log(Token);
      // axios
      //   .get(clientdata+"/"+filter, {headers:Token.headers},)
      //   .then((res) => {
      //     const correctedDataString = res.data.data
      //       .replace(/'/g, '"')
      //       .replace(/UUID\("(.*?)"\)/g, '"$1"');
      //     console.log(JSON.parse(correctedDataString));
      //     settableheaderdata(JSON.parse(correctedDataString));
      //     props.loaderchange("false");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     props.loaderchange("false");
      //     props.popupalert("true");
      //     setTimeout(() => {
      //       props.popupalert("false");
      //     }, 2000);
      //   });
    }
  }, [popup]);

  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.user_name}
              >
                {String(row.row.original.user_name)}
              </p>
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.user_email}
              >
                <a href="">{row.row.original.user_email}</a>
              </p>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "",
        Cell: (row) => {
          const status = row.row.original.user_status ? "Active" : "Inactive";
          return (
            <>
              <p data-tooltip-id="my-tooltip" data-tooltip-content={status}>
                {status}
              </p>
            </>
          );
        },
      },
      {
        Header: "Type",
        accessor: "",
        Cell: (row) => {
          const UserType = row.row.original.user_type ? "Admin" : "User";
          return (
            <>
              <p data-tooltip-id="my-tooltip" data-tooltip-content={UserType}>
                {UserType}
              </p>
            </>
          );
        },
      },
    ],
    [popup]
  );

  // product function
  const handleProductCreateModal = () => {
    setProductModal(true);
    // dispatch(clientaddstate("ClientCreate"));
  };

  const handleProductCloseModal = () => {
    setProductModal(false);
  };

  // product image upload
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
    setUrl("");
    setcreateproduct({
      ...createproduct,
      logo: "",
    });
  };

  const cancel2 = (e) => {
    setUrl2("");
    setProductList2({
      ...productList2,
      logo: "",
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
            console.log(presignedurl, "prseurl");

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
                setcreateproduct({
                  ...createproduct,
                  logo: res.data.data.data.url.split("?")[0],
                });

                console.log(res.data.data.data.url.split("?")[0], "spliturl");
              })
              .catch((error) => {
                console.log(error);
              });
          }, 500);
        } else {
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
            setUrl2(reader.result);
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
            console.log(presignedurl, "preusrl");

            axios({
              method: "post",
              url: presignedurl,
              data: url,
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
              .then((res) => {
                console.log(res.data.data.data.url, "purl");
                setpreurl2(res.data.data.data.url);
                setProductList2({
                  ...productList2,
                  logo: res.data.data.data.url.split("?")[0],
                });

                console.log(res.data.data.data.url.split("?")[0], "spliturl");
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
    console.log(c, "cccc");
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

  // create product validation
  const validateProductName = (e) => {
    const productname = e.target.value;

    if (validator.isEmpty(productname.trim())) {
      setProductNameError("*Product Name cannot be empty!");
    } else {
      setProductNameError("");
    }

    setcreateproduct((prevState) => ({
      ...prevState,
      name: productname,
    }));
  };

  const validateProductSku = (e) => {
    const productsku = e.target.value;

    if (validator.isEmpty(productsku.trim())) {
      setproductSkuError("*SKU cannot be empty!");
    } else {
      setproductSkuError("");
    }

    setcreateproduct((prevState) => ({
      ...prevState,
      sku: productsku,
    }));
  };

  const validateProductDesc = (e) => {
    const productdesc = e.target.value;

    if (validator.isEmpty(productdesc.trim())) {
      setproductDescError("*Description cannot be empty!");
    } else {
      setproductDescError("");
    }

    setcreateproduct((prevState) => ({
      ...prevState,
      desc: productdesc,
    }));
  };

  // edit product validation
  const validateEditProductName = (e) => {
    const editproductname = e.target.value;

    if (validator.isEmpty(editproductname.trim())) {
      setProductNameError("*Product Name cannot be empty!");
    } else {
      setProductNameError("");
    }

    setProductList2((prevProductList) => ({
      ...prevProductList,
      name: editproductname,
    }));
  };

  const validateEditProductSku = (e) => {
    const editproductsku = e.target.value;

    if (validator.isEmpty(editproductsku.trim())) {
      setproductSkuError("*SKU cannot be empty!");
    } else {
      setproductSkuError("");
    }

    setProductList2((prevProductList) => ({
      ...prevProductList,
      sku: editproductsku,
    }));
  };

  const validateEditProductDesc = (e) => {
    const editproductdesc = e.target.value;

    if (validator.isEmpty(editproductdesc.trim())) {
      setproductDescError("*Description cannot be empty!");
    } else {
      setproductDescError("");
    }

    setProductList2((prevProductList) => ({
      ...prevProductList,
      desc: editproductdesc,
    }));
  };

  // product table
  const columnsProduct = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_logo}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(row.row.original.product_logo, "_blank")
                }
              >
                <img
                  src={row.row.original.product_logo}
                  alt="Product Image"
                  className="product-image"
                />
              </p>
            </>
          );
        },
      },
      {
        Header: "Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_name}
              >
                {String(row.row.original.product_name)}
              </p>
            </>
          );
        },
      },
      {
        Header: "SKU",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_sku}
              >
                {row.row.original.product_sku}
              </p>
            </>
          );
        },
      },
      {
        Header: "Description",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_desc}
              >
                {String(row.row.original.product_desc)}
              </p>
            </>
          );
        },
      },
      {
        Header: "Action",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <button
                className="action-btn"
                style={{ border: "none", background: "none" }}
                onClick={(e) =>
                  handleProductEdit(
                    row.row.original.product_id,
                    row.row.original,
                    e
                  )
                }
              >
                <EditIcon />
              </button>
            </>
          );
        },
      },
    ],
    [popup]
  );

  const handleProductCreate = () => {
    if (
      createproduct.name != "" &&
      createproduct.sku != "" &&
      createproduct.desc != "" &&
      createproduct.logo != ""
    ) {
      props.loaderchange("true");
      async function uploadimage() {
        console.log(createproduct, "asyn");

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
          url: CreateProductData,
          data: createproduct,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            console.log(res, "prores");

            props.loaderchange("false");
            toast.success("Product Created Successfully");

            setProductModal(false);
            setcustomerdetails3(true);
          })
          .catch((error) => {
            console.log(error, "err2");
            props.loaderchange("false");
            // toast.error("Organization Name Already Exists");
          });
      }
      uploadimage();
    }
  };

  // get product
  useEffect(() => {
    props.loaderchange("true");

    axios({
      method: "get",
      url: getProductList + orgid,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        page: dtpageindex,
        page_size: dtpagesize,
        search: searchQuery,
        // is_active:isactivefilterdata
      },
    })
      .then((res) => {
        console.log(res.data.data, "prodata");
        if (res.data.data.data != undefined && res.data.data.data != "") {
          setProductList(res.data.data.data);
        }
        setdatacount2(res.data.data.pagination.total);
        props.loaderchange("false");
        setcustomerdetails3(false);
      })
      .catch((error) => {
        console.log(error, "error");
        // setTimeout(() => {
        //   props.popupalert("false");
        // }, 2000);
        props.loaderchange("false");
      });
  }, [dtpageindex, dtpagesize, customerdetails3]);

  // product edit function
  const handleProductEdit = (e, item) => {
    setProductEditModal(true);
    dispatch(setProductId(e));
    setUrl2(item.product_logo);
    console.log(item, "iittt");
    setProductList2({
      ...productList2,
      name: item.product_name,
      sku: item.product_sku,
      desc: item.product_desc,
      logo: item.product_logo,
      org_id: orgid,
    });
  };

  const handleProductUpdate = () => {
    // if (
    //   createproduct.name != "" &&
    //   createproduct.sku != "" &&
    //   createproduct.desc != "" &&
    //   createproduct.logo != ""
    // ) {
    props.loaderchange("true");
    async function uploadimage() {
      console.log(productList2, "ededed");

      if (preurl2 && preurl2.length > 0) {
        const resp = await fetch(preurl2, {
          method: "PUT",
          body: imgfile,
          headers: {
            "Content-Type": imgtype,
            "X-Amz-ACL": "public-read",
          },
        }).catch((err) => {
          console.log(err);
          return null;
        });
      }
      axios({
        method: "put",
        url: EditProductData + pid,
        data: productList2,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res, "produpd");

          props.loaderchange("false");
          toast.success("Product Updated Successfully");

          setProductEditModal(false);
          setcustomerdetails3(true);
        })
        .catch((error) => {
          console.log(error, "err2");
          props.loaderchange("false");
          // toast.error("Organization Name Already Exists");
        });
    }
    uploadimage();
    // }
  };

  const handleProductEditCloseModal = () => {
    setProductEditModal(false);
  };
  return (
    <div className={sideactive ? "productorder-sa" : "productorder"}>
      <div class="page-header-PO">
        <div class="row">
          <div class="col-sm-7 col-auto">
            <h3 class="page-title">Organization: {orgname}</h3>
          </div>
          {/* <div class="col-sm-5 col">
              <a
                // onClick={(e) => {
                //   dispatch(clientaddstate("ClientCreate"));
                // }}
                style={{
                //   backgroundColor: "#1b5a90",
                //   border: "1px solid #1b5a90",
                  color: "black",
                }}
                // type="button"
                // data-toggle="modal"
                class=" float-right mt-2"
              >
               Organization Name: {orgname}
              </a>
            </div> */}

          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <NavLink
                style={{ textDecoration: "none", color: "#333333" }}
                to={"/"}
                // onClick={(e) => {
                //   dispatch(getSideBarfilesActions("Client"));
                // }}
              >
                Org Management
              </NavLink>
            </li>
            <li class="breadcrumb-item">
              <NavLink
                style={{ textDecoration: "none", color: "#333333" }}
                to={"/storepage"}
                // onClick={(e) => {
                //   dispatch(getSideBarfilesActions("Client"));
                // }}
              >
                {orgname}
              </NavLink>
            </li>
            {/* <li class="breadcrumb-item active">Client Profile </li> */}
          </ul>
        </div>
      </div>

      <div className="row">
        {/* tabs */}
        <div className="inner-tabs">
          <div className="subnavbar">
            <div
              className={`tab ${activeTab === "tab1" ? "active-tab-line" : ""}`}
            >
              <button
                className={activeTab === "tab1" ? "active" : ""}
                onClick={() => handleTabClick("tab1")}
              >
                User
              </button>
            </div>
            <div
              className={`tab ${activeTab === "tab2" ? "active-tab-line" : ""}`}
            >
              <button
                className={activeTab === "tab2" ? "active" : ""}
                onClick={() => handleTabClick("tab2")}
              >
                Store
              </button>
            </div>
            <div
              className={`tab ${activeTab === "tab3" ? "active-tab-line" : ""}`}
            >
              <button
                className={activeTab === "tab3" ? "active" : ""}
                onClick={() => handleTabClick("tab3")}
              >
                Product
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === "tab1" && (
              <div class="row org-wrap">
                <div className="table-responsive">
                  <BasicTable
                    columns={columns}
                    data={orguserdata}
                    pagesize={pagesize}
                    pageindex={pageindex}
                    dtpagesize={dtpagesize}
                    dtpageindex={dtpageindex}
                    datacount={datacount}
                  />
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div class="row org-wrap">
                {storedetails.map((store, index) => (
                  <div key={index} className="col-md-4 mt-3">
                    <div className="card" style={{ borderRadius: "15px" }}>
                      <div
                        className="card-body"
                        style={{
                          padding: "1.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="store-details-wrap">
                          <p className="store-desc">
                            <b>Store Name : </b> {store.name}
                          </p>
                          <p className="store-desc">
                            <b>Email : </b> {store.email}
                          </p>
                          <p className="store-desc">
                            <b>Contact Person : </b> {store.c_person}
                          </p>
                          <p className="store-desc">
                            <b>Address : </b> {store.address}
                          </p>
                        </div>
                        <div
                          className="store-action"
                          onClick={() => handleStoreEdit(store.store_id)}
                        >
                          <button className="action-btn">
                            <EditIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* store edit modal */}
                    <div
                      className={
                        storeEditModal
                          ? "modal display-block"
                          : "modal display-none"
                      }
                    >
                      <section className="product-modal-main">
                        <div className="modal-header">
                          <h5 className="product-modal-title-modal2">
                            Edit Store
                          </h5>

                          <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={handleStoreEditCloseModal}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                        <div
                          className="modal-body"
                          style={{ padding: "0 !important" }}
                        >
                          <div
                            className="product-modal2-body-inner"
                            style={{ marginLeft: "15px" }}
                          >
                            <div className="row">
                              <div
                                className="col-md-12"
                                style={{ paddingLeft: "0px" }}
                              >
                                <div
                                  className="col-12 product-form-group"
                                  style={{ paddingLeft: "0px" }}
                                >
                                  <form
                                    name="add_name"
                                    id="add_name"
                                    onSubmit={handleStoreEdit}
                                  >
                                    <div className="modal2-email-wrap">
                                      <div className="row mb-2">
                                        <div
                                          className="col-6"
                                          style={{
                                            textAlign: "left",
                                            marginBottom: "15px",
                                          }}
                                        >
                                          <label>
                                            Store Name{" "}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            class="form-control name_list"
                                            value={editstoredetails.name}
                                            onChange={(e) =>
                                              seteditstoredetails({
                                                ...editstoredetails,
                                                name: e.target.value,
                                              })
                                            }
                                            // onChange={(e) => validateOrganizationName(e)}
                                          />
                                        </div>
                                        <div
                                          className="col-6"
                                          style={{
                                            textAlign: "left",
                                            marginBottom: "15px",
                                          }}
                                        >
                                          <label>
                                            Email{" "}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            class="form-control name_email"
                                            value={editstoredetails.email}
                                            onChange={(e) =>
                                              seteditstoredetails({
                                                ...editstoredetails,
                                                email: e.target.value,
                                              })
                                            }
                                            // onChange={(e) => validateDomain(e)}
                                          />
                                        </div>

                                        <div
                                          className="col-6"
                                          style={{
                                            textAlign: "left",
                                            marginBottom: "15px",
                                          }}
                                        >
                                          <label>
                                            Contact Person{" "}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            name="c_person"
                                            className="form-control"
                                            placeholder="Contact Person"
                                            class="form-control name_email"
                                            value={editstoredetails.c_person}
                                            onChange={(e) =>
                                              seteditstoredetails({
                                                ...editstoredetails,
                                                c_person: e.target.value,
                                              })
                                            }
                                            // onChange={(e) => validateProductDesc(e)}
                                          />
                                        </div>

                                        <div
                                          className="col-6"
                                          style={{
                                            textAlign: "left",
                                            marginBottom: "15px",
                                          }}
                                        >
                                          <label>
                                            Address{" "}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            placeholder="Address"
                                            class="form-control name_email"
                                            value={editstoredetails.address}
                                            onChange={(e) =>
                                              seteditstoredetails({
                                                ...editstoredetails,
                                                address: e.target.value,
                                              })
                                            }
                                            // onChange={(e) => validateProductDesc(e)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="product-submit-btn">
                                  <input
                                    type="submit"
                                    class="btn btn-success"
                                    name="submit"
                                    id="Save"
                                    value="Update"
                                    // onClick={handleSave}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    {/* End of product edit  */}
                  </div>
                ))}
              </div>
            )}
            {activeTab === "tab3" && (
              <div class="row org-wrap" style={{ textAlign: "center" }}>
                <div className="table-responsive">
                  <div class="col-sm-12 col">
                    <button
                      // onClick={(e) => {
                      //   dispatch(clientaddstate("ClientCreate"));
                      // }}
                      style={{
                        backgroundColor: "#1b5a90",
                        border: "1px solid #1b5a90",
                        color: "white",
                      }}
                      type="button"
                      data-toggle="modal"
                      class="btn btn-primary float-right mt-2"
                      onClick={handleProductCreateModal}
                    >
                      Create
                    </button>
                  </div>{" "}
                  <BasicTable
                    columns={columnsProduct}
                    data={productList}
                    pagesize={pagesize}
                    pageindex={pageindex}
                    dtpagesize={dtpagesize}
                    dtpageindex={dtpageindex}
                    datacount={datacount2}
                  />
                </div>

                {/* product create modal */}
                <div
                  className={
                    showProductModal
                      ? "modal display-block"
                      : "modal display-none"
                  }
                >
                  <section className="product-modal-main">
                    <div className="modal-header">
                      <h5 className="product-modal-title-modal2">
                        Create Product
                      </h5>

                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={handleProductCloseModal}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ padding: "0 !important" }}
                    >
                      <div
                        className="product-modal2-body-inner"
                        style={{ marginLeft: "15px" }}
                      >
                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{ paddingLeft: "0px" }}
                          >
                            <div
                              className="col-12 product-form-group"
                              style={{ paddingLeft: "0px" }}
                            >
                              <form
                                name="add_name"
                                id="add_name"
                                // onSubmit={handleProductCreate}
                                onSubmit={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <div className="modal2-email-wrap">
                                  <div className="row mb-2">
                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        Name{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        class="form-control name_list"
                                        value={createproduct.name}
                                        onChange={(e) => validateProductName(e)}
                                      />

                                      <div
                                        className={`${
                                          productNameError ? "show" : "hide"
                                        }`}
                                        style={{ color: "red" }}
                                      >
                                        &nbsp; Product Name required!
                                      </div>
                                    </div>
                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        SKU{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="sku"
                                        className="form-control"
                                        placeholder="SKU"
                                        class="form-control name_email"
                                        value={createproduct.sku}
                                        onChange={(e) => validateProductSku(e)}
                                      />
                                      <div
                                        className={`${
                                          productSkuError ? "show" : "hide"
                                        }`}
                                        style={{ color: "red" }}
                                      >
                                        &nbsp; SKU required!
                                      </div>
                                    </div>

                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        Description{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <textarea
                                        type="text"
                                        name="desc"
                                        // className="form-control"
                                        placeholder="Description"
                                        class="form-control name_email"
                                        style={{
                                          height: "0px",
                                          padding: "5px",
                                        }}
                                        value={createproduct.desc}
                                        onChange={(e) => validateProductDesc(e)}
                                      />
                                      <div
                                        className={`${
                                          productDescError ? "show" : "hide"
                                        }`}
                                        style={{ color: "red" }}
                                      >
                                        &nbsp; Description required!
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
                                          <p
                                            style={{
                                              margin: 0,
                                              padding: 5,
                                              marginRight: 8,
                                            }}
                                          >
                                            Product Image:
                                          </p>
                                        )}

                                        {!url ? (
                                          <Button
                                            className="doctorupload"
                                            variant="contained"
                                            component="label"
                                            style={{ cursor: "pointer" }}
                                          >
                                            <p style={{ cursor: "pointer" }}>
                                              Upload Image
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
                              </form>
                            </div>
                            <div className="product-submit-btn">
                              <input
                                type="submit"
                                class="btn btn-success"
                                name="submit"
                                id="Save"
                                value="Create"
                                onClick={handleProductCreate}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/* End of product create  */}

                {/* product edit modal */}
                <div
                  className={
                    showProductEditModal
                      ? "modal display-block"
                      : "modal display-none"
                  }
                >
                  <section className="product-modal-main">
                    <div className="modal-header">
                      <h5 className="product-modal-title-modal2">
                        Edit Product
                      </h5>

                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={handleProductEditCloseModal}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ padding: "0 !important" }}
                    >
                      <div
                        className="product-modal2-body-inner"
                        style={{ marginLeft: "15px" }}
                      >
                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{ paddingLeft: "0px" }}
                          >
                            <div
                              className="col-12 product-form-group"
                              style={{ paddingLeft: "0px" }}
                            >
                              <form
                                name="add_name"
                                id="add_name"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <div className="modal2-email-wrap">
                                  <div className="row mb-2">
                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        Name{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        class="form-control name_list"
                                        value={productList2.name}
                                        onChange={(e) =>
                                          validateEditProductName(e)
                                        }
                                      />

                                      {productNameError && (
                                        <div style={{ color: "red" }}>
                                          {productNameError}
                                        </div>
                                      )}
                                    </div>
                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        SKU{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="sku"
                                        className="form-control"
                                        placeholder="SKU"
                                        class="form-control name_email"
                                        value={productList2.sku}
                                        onChange={(e) =>
                                          validateEditProductSku(e)
                                        }
                                      />
                                      {productSkuError && (
                                        <div style={{ color: "red" }}>
                                          {productSkuError}
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className="col-4"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>
                                        Description{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <textarea
                                        type="text"
                                        name="desc"
                                        // className="form-control"
                                        placeholder="Description"
                                        class="form-control name_email"
                                        style={{
                                          height: "0px",
                                          padding: "5px",
                                        }}
                                        value={productList2.desc}
                                        onChange={(e) =>
                                          validateEditProductDesc(e)
                                        }
                                      />
                                      {productDescError && (
                                        <div style={{ color: "red" }}>
                                          {productDescError}
                                        </div>
                                      )}
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
                                        {url2 ? (
                                          <img
                                            src={url2}
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
                                            alt="Imagel"
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

                                        {!url2 ? (
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
                                                onChange={(e) =>
                                                  handleFiles2(e)
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                            </p>
                                          </Button>
                                        ) : (
                                          <></>
                                        )}

                                        {url2 ? (
                                          <Button
                                            className="remove"
                                            variant="contained"
                                            onClick={(e) => cancel2(e)}
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
                              </form>
                            </div>
                            <div className="product-submit-btn">
                              <input
                                type="submit"
                                class="btn btn-success"
                                name="submit"
                                id="Save"
                                value="Update"
                                onClick={handleProductUpdate}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/* End of product edit  */}
              </div>
            )}
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
    </div>
  );
};

export default StorePage;
