import "../style/page/report.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clientaddstate } from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo } from "react";
import { clientdata, clientapprove, CustomerDetails } from "../../text/apidata";
import BasicTable from "../maincomponent/reacttable/table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import noimage1 from "../../assets/images/noimage.png";
import ClientDetailsForm from "../form/clientdetailsfrom";

import $ from "jquery";
function Client(props) {
  const Token = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();

  const [popup, setpopup] = useState(false);
  const [filter, setfilter] = useState("pending");
  const [status, setstatus] = useState("");

  const [approvedata, setapprovedata] = useState({
    org_id: "",
    user_id: "",
    status: "",
  });
  const dispatch = useDispatch();

  const [customerdetails, setcustomerdetails] = useState([]);

  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const clientstate = useSelector((state) => state.counter.clientaddstatevalue);
  console.log(clientstate);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // get api
  useEffect(() => {
    axios({
      method: "get",
      url: CustomerDetails,
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
        console.log(res.data, "cdres", res.data.data.pagination.total);
        setcustomerdetails(res.data.data.data);
        setdatacount(res.data.data.pagination.total);
        // props.loaderchange("true");
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
  }, [popup, filter]);

  const confirm = (e) => {
    if (e == "confirm") {
      props.loaderchange("true");

      axios
        .post(
          clientapprove,
          new URLSearchParams({
            org_id: approvedata.org_id,
            user_id: approvedata.user_id,
            status: "approved",
          }),
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          props.loaderchange("false");
          props.popupalert("true");
          setpopup(false);
          props.popuptext("Client Approved");
          setTimeout(() => {
            props.popupalert("false");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);

          props.loaderchange("false");
          // props.popupalert("true");
          // setTimeout(() => {
          //   props.popupalert("false");
          // }, 2000);
        });
    } else {
      props.loaderchange("true");

      axios
        .post(
          clientapprove,
          new URLSearchParams({
            org_id: approvedata.org_id,
            user_id: approvedata.user_id,
            status: "reject",
          }),
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          props.loaderchange("false");
          props.popupalert("true");
          setpopup(false);
          props.popuptext("Client Rejected");
          setTimeout(() => {
            props.popupalert("false");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);

          props.loaderchange("false");
          // props.popupalert("true");
          // setTimeout(() => {
          //   props.popupalert("false");
          // }, 2000);
        });
    }
  };

  $(document).ready(function () {
    $(".productorder").on("scroll", function (event) {
      console.log("Scroll event detected");
    });
  });

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Organization Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.organization_name}
              >
                {String(row.row.original.organization_name)}
              </p>
            </>
          );
        },
      },
      {
        Header: "Origination Key",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.organization_key}
              >
                {row.row.original.organization_key}
              </p>
            </>
          );
        },
      },
      {
        Header: "Origination Subdomain",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.organization_domain}
                className="status"
                style={{
                  color:
                    row.row.original.contact_person != "pending"
                      ? "green"
                      : "red",
                }}
              >
                <a href={row.row.original.organization_domain}>
                  {row.row.original.organization_domain}
                </a>
              </p>
            </>
          );
        },
      },
      {
        Header: "Contact Person",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.contact_person}
                className="status"
              >
                {row.row.original.contact_person}
              </p>
            </>
          );
        },
      },
      {
        Header: "Contact Email",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.cp_email}
                className="status"
              >
                {row.row.original.cp_email}
              </p>
            </>
          );
        },
      },
    ],
    [popup]
  );

  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  return (
    <>
      <div className={sideactive ? "productorder-sa" : "productorder"}>
        <div class="page-header-PO">
          <div class="row">
            <div class="col-sm-7 col-auto">
              <h3 class="page-title">Customer Details</h3>
            </div>
            <div class="col-sm-5 col">
              <a
                onClick={(e) => {
                  dispatch(clientaddstate("ClientCreate"));
                }}
                style={{
                  backgroundColor: "#1b5a90",
                  border: "1px solid #1b5a90",
                  color: "white",
                }}
                type="button"
                data-toggle="modal"
                class="btn btn-primary float-right mt-2"
              >
                Create
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body" style={{ padding: "1.5rem" }}>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex justify-content-between"
                >
                  <div
                    class="input-group rounded"
                    style={{ width: "250px", height: "40px" }}
                  >
                    <input
                      type="search"
                      class="form-control rounded h-100"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchQuery}
                      onKeyDown={(e) => {
                        if (e.target.value.length === 0 && e.which === 32) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.length <= "100") {
                          setSearchQuery(e.target.value);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      // onKeyDown={(e)=>{if(e.which=="32"){
                      //   e.preventDefault()
                      // }}}

                      min="0"
                      max="10"
                      label="Search"
                      placeholder="Search..."
                      required
                    />
                    <span
                      class="input-group-text border-0 bg-transparent"
                      id="search-addon"
                    >
                      <i
                        class="bi bi-search"
                        style={{
                          color: "#1b5a90",
                          width: "20px",
                          height: "20px",
                        }}
                      ></i>
                    </span>
                  </div>
                  {/* <div className="rounded d-flex ">
              <label class="form-label mb-0 align-self-center mr-2" style={{width:"100px"}}>
                Filter
              </label>

              <select
                class="form-select w-9 0"
                id="validationCustom04"
                value={filter}
                onChange={(e)=>{
                  setfilter(e.target.value)
                }}
                name="IsActive"
                required
              >
                <option value={""} selected disabled>
                  Please Select...
                </option>
                <option value={"approved"} >
                approved
                </option>
                <option value={"pending"} >
                pending
                </option>

              </select>
            </div> */}
                </form>

                <div className="table-responsive">
                  <BasicTable
                    columns={columns}
                    data={customerdetails}
                    pagesize={pagesize}
                    pageindex={pageindex}
                    dtpagesize={dtpagesize}
                    dtpageindex={dtpageindex}
                    datacount={datacount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReactTooltip
          id="my-tooltip"
          arrowColor="transparent"
          place="bottom-start"
          delayShow={200}
          style={{
            backgroundColor: "#707070",
            fontSize: "10px",
            textAlign: "center",
            padding: "5px",
            fontWeight: 400,
          }}
        />
      </div>
      {clientstate == "ClientCreate" || clientstate == "ClientEdit" ? (
        <ClientDetailsForm />
      ) : (
        ""
      )}
      {popup && (
        <>
          <div className="logout_popup">
            <div class="container1">
              <div class="cookiesContent" id="cookiesPopup">
                <button
                  class="close"
                  onClick={(e) => {
                    setpopup(false);
                  }}
                >
                  ✖
                </button>
                {/* <img src={logoutimg} alt="cookies-img" /> */}
                <p style={{ marginTop: "20px" }}>
                  {`Do you Want to ${
                    status == "Approve" ? "Approve!" : "Reject"
                  } the  Client?`}
                </p>
                <div style={{ display: "flex" }}>
                  <button
                    class="accept p-2 m-2"
                    onClick={(e) => {
                      if (status == "Approve") {
                        confirm("confirm");
                      } else {
                        confirm("reject");
                      }
                    }}
                  >
                    {status == "Approve" ? "Approve!" : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Client;
