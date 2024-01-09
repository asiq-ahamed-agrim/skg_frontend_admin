import "../style/page/report.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {clientaddstate,} from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo } from "react";
import { clientdata,  clientapprove } from "../../text/apidata";
import BasicTable from "../maincomponent/reacttable/table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import noimage1 from "../../assets/images/noimage.png";
import ClientDetailsForm from "../form/clientdetailsfrom";

import $ from 'jquery'; 
function Client(props) {
  const Token = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [tableheaderdata, settableheaderdata] = useState([]);
  const [datacount, setdatacount] = useState();
  const [popup, setpopup] = useState(false);
  const [filter,setfilter]=useState("pending")
  const [status,setstatus]=useState("")

  const [approvedata,setapprovedata]=useState({
    org_id : "",
    user_id: "",
    status:""
  })
  const dispatch = useDispatch();
  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const clientstate = useSelector((state) => state.counter.clientaddstatevalue);
  console.log(clientstate)
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(popup==false){
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
  }, [popup,filter]);

  const confirm = (e) => {
    if(e=="confirm"){
      props.loaderchange("true");

    axios
      .post(clientapprove,new URLSearchParams({
        org_id : approvedata.org_id,
        user_id: approvedata.user_id,
        status:"approved"
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
    }else{
      props.loaderchange("true");

      axios.post(clientapprove ,new URLSearchParams({
        org_id : approvedata.org_id,
        user_id: approvedata.user_id,
        status:"reject"
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

  }
$(document).ready(function() {
  $(".productorder").on("scroll", function(event) {
    console.log("Scroll event detected");
  });
});

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
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
                data-tooltip-content={row.row.original.username}
              >
                {String(row.row.original.username)}
              </p>
            </>
          );
        },
      },
      {
        Header: "Origination Name",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.org_name}
              >
                {row.row.original.org_name}
              </p>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.status}
                className="status"
                style={{color:row.row.original.status!="pending"?"green":"red"}}
              >
                {capitalizeFirstLetter(row.row.original.status)}
              </p>
            </>
          );
        },
      },

      {
        Header: "Actions",
        accessor: "",
        Cell: (row, index) => {
          // console.log(row.row);

          return (
            <>
              <div class="actions">
                <button
                  type="button"
                  class="approvebutton"
                  onClick={(e) => {
                    setpopup(true);
                    setstatus("Approve")
                    setapprovedata({
                      ...approvedata,
                      org_id : row.row.original.org_id,
                      user_id: row.row.original.user_id,
                    })
                  }}
                >
                   Approve
                </button>
                <button
                  type="button"
                  class="rejectbutton"
                  onClick={(e) => {
                    setpopup(true);
                    setstatus("Reject")
                    setapprovedata({
                      ...approvedata,
                      org_id : row.row.original.org_id,
                      user_id: row.row.original.user_id,
                    })
                  }}
                >
                   Reject
                </button>
              </div>
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
              <h3 class="page-title">Client Details</h3>
            </div>
            <div class="col-sm-5 col">
              <a
                onClick={(e) => {dispatch(clientaddstate("ClientCreate"))}}
                style={{
                  backgroundColor: "#1b5a90",
                  border: "1px solid #1b5a90",
                  color: "white",
                }}
                type="button"
                data-toggle="modal"
                class="btn btn-primary float-right mt-2"
              >
                Add
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body" style={{ padding: "1.5rem" }}>
                <form onSubmit={handleSubmit} className="d-flex justify-content-between">
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
            <div className="rounded d-flex ">
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
            </div>
                </form>

                <div className="table-responsive">
                  <BasicTable
                    columns={columns}
                    data={tableheaderdata}
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
      {clientstate == "ClientCreate" || clientstate == "ClientEdit" ?(
        <ClientDetailsForm/>
      ):""}
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
                  {`Do you Want to ${status=="Approve"?"Approve!":"Reject"} the  Client?`}
                </p>
                <div style={{ display: "flex" }}>
                  <button class="accept p-2 m-2" onClick={(e) => {
                    if(status=="Approve"){
                      confirm("confirm")

                    }else{
                      confirm("reject")

                    }}}>
                    {status=="Approve"?"Approve!":"Reject"}
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
