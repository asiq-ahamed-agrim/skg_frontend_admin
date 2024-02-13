import React from "react";
import "../../components/style/page/YourOrderItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import BasicTable from "../maincomponent/reacttable/table";
import { getYourOrdersItem } from "../../text/apidata";
import axios from "axios";
import { orderid } from "../redux/reducer/counterslice";

const YourOrderItem = (props) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();

  const [popup, setpopup] = useState(false);
  const sideactive = useSelector((state) => state.counter.sidebarnav);

  const [yourOrdersItem, setYourOrderItem] = useState([]);

  // your orders details
  useEffect(() => {
    props.loaderchange("true");

    console.log(orderid, "oooiii");

    axios({
      method: "get",
      url: getYourOrdersItem + orderid,
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
        setYourOrderItem(res.data.data.data);
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

  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_name}
              >
                <p>{String(row.row.original.product_name)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "Product SKU",
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
        Header: "Quantity",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.quantity}
                className="status"
              >
                {row.row.original.quantity}
              </p>
            </>
          );
        },
      },
      {
        Header: "Product description",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.product_desc}
                className="status"
              >
                {row.row.original.product_desc}
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
            <h3 class="page-title">Orders List</h3>
          </div>
        </div>

        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <NavLink
              style={{ textDecoration: "none", color: "#333333" }}
              to={"/"}
              // onClick={(e) => {
              //   dispatch(getSideBarfilesActions("Client"));
              // }}
            >
              Order Management
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
              Product List
            </NavLink>
          </li>
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
                  data={yourOrdersItem}
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

export default YourOrderItem;
