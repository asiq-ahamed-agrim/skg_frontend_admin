import React, { useEffect, useState } from "react";
import "../style/maincompstyle/sidebar.scss";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useSelector, useDispatch } from "react-redux";
import {
  sidenav,
  productorderid,
  productorder,
} from "../redux/reducer/counterslice";
import { sidebar, dvtabs } from "../redux/reducer/counterslice";
import $ from "jquery";
import SickIcon from "@mui/icons-material/Sick";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import ReportIcon from "@mui/icons-material/Report";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";

function SideBar() {
  var list = [];
  var list2 = [];
  var list3 = [];
  var list4 = [];
  var list5 = [];

  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const sidebarmenustate = useDispatch();
  const sidebarstate = useSelector((state) => state.counter.sidebar);
  const [expand, setexpand] = useState(null);
  const sidebaractive = useDispatch();
  const tabsstate = useDispatch();
  const dispatch = useDispatch();
  const dispatchid = useDispatch();
  // console.log(list,list2)
  console.log(expand);

  let roledata = localStorage.getItem("role");
  $(window).resize(function () {
    // console.log(
    //   window.innerWidth
    //   )
    if (window.innerWidth <= 920) {
      sidebaractive(sidenav(false));
    }
  });
  const navData = [
    // {
    //   id: 0,
    //   icon: <HomeRoundedIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "DashBoard",
    //   class:
    //     "adminusernav" +
    //     `${sidebarstate == "DashBoard" ? " activesidemenu" : ""}`,
    //   link: "/",
    // },
    // {
    //   id: 1,
    //   icon: (
    //     <AccountCircleRoundedIcon
    //       style={{ padding: "10px", fontSize: "46px" }}
    //     />
    //   ),
    //   text: "Admin User",
    //   class:
    //     "adminusernav" +
    //     `${sidebarstate == "Admin User" ? " activesidemenu" : ""}`,
    //   link: "/",
    // },
    {
      name: "ClientDetails",
      link: "/",
      icon: <StoreIcon style={{ padding: "10px", fontSize: "46px" }} />,
      text: "Org Management",
      class:
        "doctorsidebar" +
        `${sidebarstate == "Client Details" ? " activesidemenu" : ""}`,
    },
    {
      name: "OrderDetails",
      link: "/yourorders",
      icon: <StoreIcon style={{ padding: "10px", fontSize: "46px" }} />,
      text: "Order Details",
      class:
        "doctorsidebar" +
        `${sidebarstate == "Client Details" ? " activesidemenu" : ""}`,
    },

    //  {
    //   id: 2,
    //   icon: (
    //     // <PersonAddAltRoundedIcon
    //     //   style={{ padding: "10px", fontSize: "46px" }}
    //     // />
    //     <i
    //       class="fa fa-user-md"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Doctors",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Doctors" ? " activesidemenu" : ""}`,
    //   link: "/Doctor",
    // },
    //  {
    //   id: 3,
    //   icon: <PersonRoundedIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Patient",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Patient" ? " activesidemenu" : ""}`,
    //   link: "/Patient",
    // },
    //  {
    //   id: 6,
    //   icon: <CreditCardIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Bill Payments",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Bill Payments" ? " activesidemenu" : ""}`,
    //   link: "/BillPayments",
    // },
    //  {
    //   id: 7,
    //   icon: (
    //     <NotificationsActiveIcon
    //       style={{ padding: "10px", fontSize: "46px" }}
    //     />
    //   ),
    //   text: "Send Notification",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Send Notification" ? " activesidemenu" : ""}`,
    //   link: "/SendNotification",
    // },
    //  {
    //   id: 8,
    //   icon: (
    //     // <NotificationsActiveIcon
    //     //   style={{ padding: "10px", fontSize: "46px" }}
    //     // />
    //     <i
    //       class="fas fa-gift"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Cash Back Points",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Cash Back Points" ? " activesidemenu" : ""}`,
    //   link: "/CashBackPoints",
    // },
    //  {
    //   id: 10,
    //   icon: (
    //     // <NotificationsActiveIcon
    //     //   style={{ padding: "10px", fontSize: "46px" }}
    //     // />
    //     <i
    //       class="far fa-chart-bar"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Kranium Billing List",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Kranium Billing List" ? " activesidemenu" : ""}`,
    //   link: "/kraniumBillingList",
    // },
    //  {
    //   id: 11,
    //   icon: (
    //     // <NotificationsActiveIcon
    //     //   style={{ padding: "10px", fontSize: "46px" }}
    //     // />
    //     <i
    //       class="fas fa-file-image"
    //       style={{ padding: "15px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Patient Testimonials",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Patient Testimonials" ? " activesidemenu" : ""}`,
    //   link: "/Patienttestimonials",
    // },
    //  {
    //   name: "img",
    //   link: "/Banner",
    //   icon: (
    //     <AddPhotoAlternateIcon style={{ padding: "10px", fontSize: "46px" }} />
    //   ),
    //   text: "Banner Images",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Banner Images" ? " activesidemenu" : ""}`,
    // },
    //  {
    //   name: "img",
    //   link: "/BannerVideo",
    //   icon: (
    //     <AddPhotoAlternateIcon style={{ padding: "10px", fontSize: "46px" }} />
    //   ),
    //   text: "Banner Images and Videos",
    //   class:
    //     "doctorsidebar" +
    //     `${
    //       sidebarstate == "Banner Images and Videos" ? " activesidemenu" : ""
    //     }`,
    // },
    //  {
    //   id: 0,
    //   icon: <LocalHospitalIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Organization",
    //   subMenus: [
    //     {
    //       name: "ClientDetails",
    //       link: "/",
    //       icon: (
    //         <PersonRoundedIcon style={{ padding: "10px", fontSize: "46px" }} />
    //       ),
    //       text: "Client Details",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Client Details" ? " activesidemenu" : ""}`,
    //     },
    //   ],
    // },
    // {
    //   id: 1,
    //   icon: <LocalPharmacyIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Pharmacy(OLD)",
    //   subMenus: [
    //      {
    //       name: "Productsorder",
    //       link: "/Productsorder",
    //       icon: (
    //         <ProductionQuantityLimitsIcon
    //           style={{ padding: "10px", fontSize: "46px" }}
    //         />
    //       ),
    //       text: "Products Order",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Products Order" ? " activesidemenu" : ""}`,
    //     },

    //   ],
    // },
    //  {
    //   id: 2,
    //   icon: <LocalPharmacyIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Online Pharmacy",
    //   subMenus: [
    //              {
    //       name: "Productsorder",
    //       link: "/Productsordernew",
    //       icon: (
    //         <ProductionQuantityLimitsIcon
    //           style={{ padding: "10px", fontSize: "46px" }}
    //         />
    //       ),
    //       text: "Products Order new",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Products Order new" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "PharmacyIssue",
    //       link: "/PharmacyIssue",
    //       icon: (
    //         <i
    //           class="fas fa-comment-medical"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Pharmacy Issue",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Pharmacy Issue" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "IssueList",
    //       link: "/IssueList",
    //       icon: (
    //         <i
    //           class="fas fa-address-card"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Issue List",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Issue List" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Pharmacybill",
    //       link: "/Pharmacybill",
    //       icon: (
    //         <i
    //           class="fas fa-money-check"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Pharmacy Bill List",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Pharmacy Bill List" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Online pharmacy",
    //       link: "/PharmacyNew",
    //       icon: <VaccinesIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Online pharmacy",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Online pharmacy" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Medicine Type",
    //       link: "/MedicineType",
    //       icon: <VaccinesIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Medicine Type",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Medicine Type" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "img",
    //       link: "/PharmacyBannerVideo",
    //       icon: (
    //         <AddPhotoAlternateIcon
    //           style={{ padding: "10px", fontSize: "46px" }}
    //         />
    //       ),
    //       text: "PharmacyBanner",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "PharmacyBanner" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "img",
    //       link: "/PharmacyRequest",
    //       icon: (
    //         <AddPhotoAlternateIcon
    //           style={{ padding: "10px", fontSize: "46px" }}
    //         />
    //       ),
    //       text: "Pharmacy Request",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Pharmacy Request" ? " activesidemenu" : ""}`,
    //     },
    //   ],
    // },

    //  {
    //   id: 5,
    //   icon: (
    //     <i
    //       class="fas fa-file-medical-alt"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Diagnostics",
    //   subMenus: [
    //      {
    //       name: "Invest",
    //       link: "/Investigations",
    //       icon: (
    //         <i
    //           class="fas fa-book-medical"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Investigations",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Investigations" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Pack",
    //       link: "/Packages",
    //       icon: (
    //         <i
    //           class="fas fa-pills"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Packages",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Packages" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "DiagnosticsBanner",
    //       link: "/DiagnosticsBanner",
    //       icon: (
    //         <i
    //           class="far fa-images"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Diagnostics Banner",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Diagnostics Banner" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Diagnosticsorder",
    //       link: "/Diagnosticsorder",
    //       icon: (
    //         <ProductionQuantityLimitsIcon
    //           style={{ padding: "10px", fontSize: "46px" }}
    //         />
    //       ),
    //       text: "Diagnostics Order",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Diagnostics Order" ? " activesidemenu" : ""}`,
    //     },

    //      {
    //       name: "Issue Report",
    //       link: "/DiagnosticsIssueReport",
    //       icon: (
    //         <i
    //           class="fas fa-comment-medical"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Diagnostics Issue",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Diagnostics Issue" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Diagnosticsbill",
    //       link: "/Diagnosticsbill",
    //       icon: (
    //         <i
    //           class="fas fa-money-check"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Diagnostics Bill List",
    //       class:
    //         "doctorsidebar" +
    //         `${
    //           sidebarstate == "Diagnostics Bill List" ? " activesidemenu" : ""
    //         }`,
    //     },
    //     roledata == "Diagnostics Admin" && {
    //       name: "IssueList",
    //       link: "/IssueList",
    //       icon: (
    //         <i
    //           class="fas fa-address-card"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Issue List",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Issue List" ? " activesidemenu" : ""}`,
    //     },
    //   ],
    // },
    //  {
    //   id: 9,
    //   icon: (
    //     <i
    //       class="fas fa-book"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Records",
    //   subMenus: [
    //      {
    //       name: "Appoinments Details",
    //       link: "/AppoinmentDetails",
    //       icon: (
    //         <i
    //           class="fas fa-address-card"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Appoinments Details",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Appoinments Details" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Pharmacy Details",
    //       link: "/PharmacyDetails",
    //       icon: (
    //         <i
    //           class="fas fa-address-card"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Pharmacy Details",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Pharmacy Details" ? " activesidemenu" : ""}`,
    //     },
    //      {
    //       name: "Diagnostics Details",
    //       link: "/DiagnosticsDetails",
    //       icon: (
    //         <i
    //           class="fas fa-address-card"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Diagnostics Details",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Diagnostics Details" ? " activesidemenu" : ""}`,
    //     },
    //   ],
    // },
  ];

  const sidebarhandleclick = (e) => {
    if (e != "Settings" && e != "Diagnostics") {
      sidebarmenustate(sidebar(e));
    }
    dispatchid(productorderid(""));
    dispatch(productorder(""));

    tabsstate(dvtabs("About"));
  };

  console.log(navData[1], "sisis");

  const hoverstate = (e) => {
    if (!sideactive) {
      // console.log(e);
      $(".sidebarclose").css("width", "240px");
      $(".linkTextclosed").css("display", "block");
      $(".arrow").css("display", "block");
    }
    navData[0] != undefined &&
      navData[0] != "" &&
      navData[0].subMenus != undefined &&
      navData[0].subMenus.map((e) => {
        list.push(e.text);
      });
    navData[1] != undefined &&
      navData[1] != "" &&
      navData[1].subMenus != undefined &&
      navData[1].subMenus.map((e) => {
        list2.push(e.text);
      });
    navData[2] != undefined &&
      navData[2] != "" &&
      navData[2].subMenus.map((e) => {
        list3.push(e.text);
      });
    navData[3] != undefined &&
      navData[3] != "" &&
      navData[3].subMenus.map((e) => {
        list4.push(e.text);
      });
    navData[4] != undefined &&
      navData[4] != "" &&
      navData[4].subMenus.map((e) => {
        list5.push(e.text);
      });
    console.log(navData, list, list2);

    if (list.includes(sidebarstate)) {
      setexpand(0);
    } else if (list2.includes(sidebarstate)) {
      setexpand(1);
    } else if (list3.includes(sidebarstate)) {
      setexpand(2);
    } else if (list4.includes(sidebarstate)) {
      setexpand(3);
    } else if (list5.includes(sidebarstate)) {
      setexpand(4);
    }
  };

  const hoverleave = (e) => {
    if (!sideactive) {
      // console.log(e);
      $(".sidebarclose").css("width", "65px");
      $(".linkTextclosed").css("display", "none");
      setexpand(null);
      $(".arrow").css("display", "none");
    }
  };
  useEffect(() => {
    if (!sideactive) {
      setexpand(null);
    }
  }, [sideactive]);
  useEffect(() => {
    if (sideactive) {
      console.log(navData, sideactive, list);
      navData[0] != undefined &&
        navData[0] != "" &&
        navData[0].subMenus != undefined &&
        navData[0].subMenus.map((e) => {
          list.push(e.text);
        });
      navData[1] != undefined &&
        navData[1] != "" &&
        navData[1].subMenus != undefined &&
        navData[1].subMenus.map((e) => {
          list2.push(e.text);
        });
      navData[2] != undefined &&
        navData[2] != "" &&
        navData[2].subMenus.map((e) => {
          list3.push(e.text);
        });
      navData[3] != undefined &&
        navData[3] != "" &&
        navData[3].subMenus.map((e) => {
          list4.push(e.text);
        });
      navData[4] != undefined &&
        navData[4] != "" &&
        navData[4].subMenus.map((e) => {
          list5.push(e.text);
        });
      console.log(navData, list, list2);

      if (list.includes(sidebarstate)) {
        setexpand(0);
      } else if (list2.includes(sidebarstate)) {
        setexpand(1);
      } else if (list3.includes(sidebarstate)) {
        setexpand(2);
      } else if (list4.includes(sidebarstate)) {
        setexpand(3);
      } else if (list5.includes(sidebarstate)) {
        setexpand(4);
      }
    }
  }, [sideactive]);
  const expandfunc = (e, index) => {
    console.log(index, expand);
    if (index == expand) {
      setexpand(null);
    } else {
      setexpand(index);
    }
  };

  return (
    <>
      <div
        className={sideactive ? "sidebar" : "sidebarclose"}
        id="sidebar"
        onMouseEnter={(e) => hoverstate(e)}
        onMouseLeave={(e) => hoverleave(e)}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul className="sidebar_content">
              {navData.map((item, index) => {
                // console.log(item);
                if (item.icon) {
                  return (
                    <>
                      <NavLink
                        to={item.link}
                        style={{ textDecoration: "none" }}
                      >
                        <li
                          key={item.id}
                          className={`sideitem row ${item.class}`}
                          href={item.link}
                          onClick={(e) => {
                            sidebarhandleclick(item.text);
                            if (item.subMenus) {
                              expandfunc(e, index);
                            }
                          }}
                        >
                          <div href={item.link} className="col-2">
                            {item.icon}
                          </div>
                          <div
                            className={
                              sideactive
                                ? "linkText col-6"
                                : "linkTextclosed col-6"
                            }
                            style={{ display: sideactive ? "block" : "" }}
                          >
                            <NavLink className="nav-link" to={item.link}>
                              {item.text}
                            </NavLink>
                          </div>
                          {item.subMenus ? (
                            <>
                              <i
                                class={
                                  "bi bi-caret-right-fill arrow col-2" +
                                  `${expand == index ? " arrowexpand" : ""}`
                                }
                                style={{
                                  display: sideactive ? "block" : "none",
                                  marginLeft: "30px",
                                }}
                                onClick={(e) => {
                                  expandfunc(e, index);
                                }}
                              ></i>
                            </>
                          ) : (
                            ""
                          )}
                        </li>
                      </NavLink>
                      <ul
                        className={`sub-menu ${index} ${
                          expand == index ? " activeside" : ""
                        } `}
                      >
                        {item.subMenus != undefined &&
                          item.subMenus?.map((ele) => {
                            if (ele.link) {
                              return (
                                <NavLink
                                  to={ele.link}
                                  style={{ textDecoration: "none" }}
                                  // className={`${
                                  //   expand == index ? " activeside1" : ""
                                  // }`}
                                >
                                  <li
                                    key={ele.id}
                                    className={`sideitem row ${ele.class}`}
                                    href={ele.link}
                                    onClick={(e) =>
                                      sidebarhandleclick(ele.text)
                                    }
                                  >
                                    <div href={ele.link} className="col-2">
                                      {ele.icon}
                                    </div>
                                    <span
                                      className={
                                        sideactive
                                          ? "linkText col-6"
                                          : "linkTextclosed col-6"
                                      }
                                      style={{
                                        display: sideactive ? "block" : "",
                                      }}
                                    >
                                      <NavLink
                                        className="nav-link"
                                        to={ele.link}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {ele.text}
                                      </NavLink>
                                    </span>
                                  </li>
                                </NavLink>
                              );
                            }
                          })}
                      </ul>
                    </>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
