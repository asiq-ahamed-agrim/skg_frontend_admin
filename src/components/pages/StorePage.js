
import "../style/page/report.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clientaddstate } from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo } from "react";
import { StoreDetails, OrgUserDetails } from "../../text/apidata";
import BasicTable from "../maincomponent/reacttable/table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "../../components/style/page/storepage.scss";
import $ from "jquery";

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

  console.log(orgid, "oi", orgname);

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();

  const [popup, setpopup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [storedetails, setstoredetails] = useState([]);
  const [orguserdata, setorguserdata] = useState([]);
  console.log(orgid);
  //   const [organizationId, setOrganizationId] = useState('');

  //   useEffect(() => {
  //     const storedOrganizationId = localStorage.getItem('organizationId');
  //     if (storedOrganizationId) {
  //       setOrganizationId(storedOrganizationId);
  //           }
  //   }, []);

  // child get api store details
  useEffect(() => {
    props.loaderchange("true");

    axios({
      method: "get",
      //   url: StoreDetails,
      url: `${StoreDetails}/${orgid}`,

      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.data, "storedata");
        setstoredetails(res.data.data);
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

  //   org_user
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
        console.log(res.data.data.data, "orgdata");
        setorguserdata(res.data.data.data);
        setdatacount(res.data.data.pagination.total);
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
  }, [dtpageindex, dtpagesize]);

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

  const handleSubmit = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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
              <div class="row govt-wrap">
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
              <div class="row govt-wrap">
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
                        <div className="store-action">
                          <button className="action-btn">
                            <EditIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "tab3" && (
              <div class="row govt-wrap" style={{ textAlign: "center" }}>
                <p style={{ textAlign: "center" }}>No Data</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* email second modal */}
      <div className={showModal ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          <div className="modal-header">
            <h5 className="modal-title-modal2">Edit Store Details</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body" style={{ padding: "0 !important" }}>
            <div className="modal2-body-inner" style={{ marginLeft: "15px" }}>
              <div className="row">
                <div className="col-md-12" style={{ paddingLeft: "0px" }}>
                  <div
                    className="col-10 form-group"
                    style={{ paddingLeft: "0px" }}
                  >
                    <form name="add_name" id="add_name" onSubmit={handleSubmit}>
                      <div className="modal2-email-wrap">
                        <label className="email-label">Email :</label>
                        <input
                          type="email"
                          name="org_admin"
                          className="form-control-modal2"
                          // placeholder="Email"
                          class="form-control name_email"
                          //   value={clientdata.org_admin}
                          // onChange={(e) => {
                          //   setclientdata({
                          //     ...clientdata,
                          //     org_admin: e.target.value,
                          //   });
                          // }}
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
    </div>
  );
};

export default StorePage;
