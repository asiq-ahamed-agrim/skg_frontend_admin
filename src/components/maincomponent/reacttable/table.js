import React, { useEffect, useState, useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import "./tablestyle.scss";
var pageindexloc;

function BasicTable(props) {
  const columns = useMemo(() => props.columns);
  const data = props.data;
  // console.log(props.isactivefilterdata,"tabledata87868768768")
  const [isactivefilter, setisactivefilter] = useState([
    { value: "All", id: "" },
    { value: "Active", id: "true" },
    { value: "In Active", id: "false" },
  ]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    rowsPerPage,
  } = useTable({
    columns,
    data,
  });

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: props.dtpageindex,
        pageSize: props.dtpagesize,
      },
      manualPagination: true,
      pageCount:
        props.datacount < 10 || props.datacount == null
          ? 1
          : Math.ceil(props.datacount / props.dtpagesize + 1),
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );
  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    state,
    visibleColumns,
    setGlobalFilter,
    preGlobalFilteredRows,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = tableInstance;
  // console.log(props.pageindex,props.pagesize,props.datacount,pageIndex,pageSize)

  const fetchData = ({ pageSize, pageIndex }) => {
    // console.log("fetchData is being called", pageSize, pageIndex);
    pageindexloc = pageIndex;
    if (pageindexloc == 0) {
      pageindexloc = 1;
    }

    props.pagesize(pageSize);
    props.pageindex(pageindexloc);
  };

  React.useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const dropdowntable = () => {
    gotoPage(1);
  };

  return (
    <>
      <div className="row" style={{width:"100%",padding:"5px"}}>
        <div className="col-md-9">
          {props.datacount > 10 ? (
            <div
              className="showrow"
              style={{ padding: "10px", fontSize: "8px", display: "flex" }}
            >
              <p
                style={{
                  padding: "5px",
                  marginRight: "4px",
                  marginBottom: "0",
                  fontSize: "15px",
                }}
              >
                Show
              </p>
              <FormControl variant="standard" sx={{ width: 60 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  disableUnderline
                  // value={age}
                  value={pageSize}
                  // onChange={(e) => dropdownhandlechange(row.row.original.id)}
                  onChange={(e) => {
                    // console.log(e)
                    setPageSize(Number(e.target.value));
                    dropdowntable(e);
                  }}
                  IconComponent={ArrowDropDownIcon}
                  inputProps={{
                    padding: "0",
                    // IconComponent: {() => (<ArrowDropDownIcon/>)},
                    MuiSelect: {
                      outlined: {
                        "&:focus": {
                          backgroundColor: "#FFF",
                        },
                      },
                    },
                  }}
                  label="Age"
                  defaultValue="none"
                  style={{
                    fontSize: "15px",
                    border: "1px solid #dddddd",
                    borderRadius: "5px",
                    boxShadow: "none",
                    width: "49px",
                    height: "calc(1.5em + 0.5rem + -1px)",
                    paddingLeft: "6px",
                  }}
                >
                  <MenuItem value="none" disabled style={{ display: "none" }}>
                    Select
                  </MenuItem>
                  {/* {[10,20,50].map((pageSize) => (
                  <MenuItem value={pageSize} style={{alignItems:"center"}}>{pageSize}</MenuItem> */}
                  <MenuItem
                    value={10}
                    style={{ alignItems: "center" }}
                    disabled={props.datacount < 10}
                  >
                    {10}
                  </MenuItem>
                  <MenuItem
                    value={20}
                    style={{ alignItems: "center" }}
                    disabled={props.datacount < 10}
                  >
                    {20}
                  </MenuItem>
                  <MenuItem
                    value={50}
                    style={{ alignItems: "center" }}
                    disabled={props.datacount < 51}
                  >
                    {50}
                  </MenuItem>

                  {/* ))} */}
                </Select>
              </FormControl>
              <p
                style={{
                  padding: "5px",
                  marginRight: "4px",
                  marginBottom: "0",
                  fontSize: "15px",
                }}
              >
                Entries
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-3">
          {props.isactive == true ? (
            <div className="w-100 rounded d-flex">
              <label class="form-label mb-0 align-self-center mr-2" style={{width:"100px"}}>
                Is Active
              </label>

              <select
                class="form-select w-9 0"
                id="validationCustom04"
                value={props.isactivefilterdata}
                name="IsActive"
                onChange={(e) => {
                  props.setisactivefilterdata(e.target.value);
                }}
                required
              >
                <option value={"1"} selected disabled>
                  Please Select...
                </option>
                {isactivefilter.map((data) => {
                  console.log(data);
                  return <option value={data.id}>{data.value}</option>;
                })}
              </select>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {page.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={(e) => {
                    if (props.stateid == "0") {
                      props.settrackorderid(row.original.id);
                      props.settrackorderstate(true);
                    } else if (props.stateid == "1") {
                      props.settrackorderidp(row.original.id);
                      props.settrackorderstatep(true);
                    }
                    else if(props.stateid == "2"){
                      props.setorderdata(row.original);
                      props.setorderstate(true);
                    }
                  }}
                  style={{
                    cursor:
                      props.stateid == "0" || props.stateid == "1" || props.stateid == "2"
                        ? "pointer"
                        : "",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          // <div style={{ position: "relative", left: "10%" }}>No Data....</div>
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No Data....
            </td>
          </tr>
        )}
      </table>
      {props.datacount > 10 ? (
        <div
          className="row"
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: "14px 0px 0px 0px",
          }}
        >
          <div className=" pagination" style={{ justifyContent: "end" }}>
            <div className="showrow1" style={{ padding: "4px" }}>
              <button
                className="btn btn prim"
                style={{ border: "none" }}
                onClick={() => {
                  previousPage();
                  if(props.id=="spe"||props.id=="sym"){
                    props.setsno(props.sno-10)
                  }

                }}
                disabled={pageIndex == 1}
              >
                {"<"}
              </button>
              <span style={{ padding: "10px" }}>
                <strong style={{ fontSize: "12px" }}>
                  {pageIndex} of{" "}
                  {Math.ceil(
                    props.datacount == null
                      ? 1
                      : props.datacount / props.dtpagesize
                  )}{" "}
                </strong>
              </span>
              <button
                style={{ border: "none" }}
                className="btn btn prim"
                onClick={() => {
                  nextPage();
                  if(props.id=="spe"||props.id=="sym"){
                    props.setsno(props.sno+10)
                  }
                }}
                disabled={
                  pageIndex == Math.ceil(props.datacount / props.dtpagesize)
                }
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BasicTable;
