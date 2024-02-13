import "../style/page/report.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clientaddstate,
  orderid,
  ordername,
} from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo } from "react";
import { getYourOrdersList } from "../../text/apidata";
import BasicTable from "../maincomponent/reacttable/table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const YourOrder = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();

  const [popup, setpopup] = useState(false);
  const sideactive = useSelector((state) => state.counter.sidebarnav);

  const [yourOrdersDetails, setYourOrderDetails] = useState([]);

  // your orders details
  useEffect(() => {
    props.loaderchange("true");

    axios({
      method: "get",
      url: getYourOrdersList,
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
        setYourOrderDetails(res.data.data.data);
        console.log(res.data, "cdres");
        setdatacount(res.data.data.pagination.total);
        props.loaderchange("false");
      })
      .catch((error) => {
        console.log(error, "err");

        debugger;
        // props.popupalert("true");
        // props.popuptext(error.response.data.status.message);
        // setTimeout(() => {
        //   props.popupalert("false");
        // }, 2000);
        props.loaderchange("false");
      });
  }, [dtpageindex, dtpagesize, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTime = (timestamp) => {
    const date = new Date(timestamp);

    const optionsDate = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} ${formattedTime}`;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.order_name}
              >
                <p>{String(row.row.original.order_name)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "Store Name",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.store_name}
              >
                {row.row.original.store_name}
              </p>
            </>
          );
        },
      },
      {
        Header: "Created Date",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.created_date}
                className="status"
                style={{
                  fontWeight: "500",
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "start",
                  // gap: "3px",
                }}
              >
                {handleTime(row.row.original.created_date)}
              </p>
            </>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.created_by}
                className="status"
              >
                {row.row.original.created_by}
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
                onClick={() =>
                  handleOrderClick(
                    row.row.original.order_id,
                    row.row.original.order_name
                  )
                }
              >
                VIEW
              </button>
            </>
          );
        },
      },
    ],
    [popup]
  );

  const handleOrderClick = (order_id, order_name) => {
    dispatch(orderid(order_id));
    dispatch(ordername(order_name));
    navigate("/yourorderitem");

    console.log(order_id, "oioi", order_name);
    debugger;
  };

  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  return (
    <div className={sideactive ? "productorder-sa" : "productorder"}>
      <div class="page-header-PO">
        <div class="row">
          <div class="col-sm-7 col-auto">
            <h3 class="page-title">Orders List</h3>
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

        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <NavLink
              style={{ textDecoration: "none", color: "#333333" }}
              to={"/yourorders"}
              // onClick={(e) => {
              //   dispatch(getSideBarfilesActions("Client"));
              // }}
            >
              Order Management /
            </NavLink>
          </li>
          {/* <li class="breadcrumb-item">
              <NavLink
                style={{ textDecoration: "none", color: "#333333" }}
                to={"/storepage"}
                // onClick={(e) => {
                //   dispatch(getSideBarfilesActions("Client"));
                // }}
              >
                Store Details Page
              </NavLink>
            </li> */}
          {/* <li class="breadcrumb-item active">Client Profile </li> */}
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body" style={{ padding: "1.5rem" }}>
              <form
                //   onSubmit={handleSubmit}
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
                    // onInput={(e) => {
                    //   if (e.target.value.length <= "100") {
                    //     setSearchQuery(e.target.value);
                    //   } else {
                    //     e.preventDefault();
                    //   }
                    // }}
                    onChange={handleSearch}
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
                  data={yourOrdersDetails}
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
    </div>
  );
};

export default YourOrder;
