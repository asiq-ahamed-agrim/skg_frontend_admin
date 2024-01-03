import React, { useEffect, useState } from "react";
import "../style/maincompstyle/sidebar.scss";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useSelector, useDispatch } from "react-redux";
import { sidenav,productorderid,productorder } from "../redux/reducer/counterslice";
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
function SideBar() {
  var list = [];
  var list2 = [];
  var list3 = [];
  var list4 = [];
  var list5 = [];

  const sideactive = useSelector((state) => state.counter.sidebarnav);
  const sidebarmenustate = useDispatch();
  const sidebarstate = useSelector((state) => state.counter.sidebar);
  const [expand, setexpand] = useState();
  const sidebaractive = useDispatch();
  const tabsstate = useDispatch();
  const dispatch = useDispatch();
  const dispatchid = useDispatch();
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
          name: "Client Details",
          link: "/",
          icon: (
            <PersonRoundedIcon style={{ padding: "10px", fontSize: "46px" }} />
          ),
          text: "Client Details",
          class:
            "doctorsidebar" +
            `${sidebarstate == "Client Details" ? " activesidemenu" : ""}`,
        },

    // (roledata == "Super Admin" || roledata == "Doctor Admin") && {
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
    // roledata == "Super Admin" && {
    //   id: 3,
    //   icon: <PersonRoundedIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Patient",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Patient" ? " activesidemenu" : ""}`,
    //   link: "/Patient",
    // },
    // roledata == "Super Admin" && {
    //   id: 6,
    //   icon: <CreditCardIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Bill Payments",
    //   class:
    //     "doctorsidebar" +
    //     `${sidebarstate == "Bill Payments" ? " activesidemenu" : ""}`,
    //   link: "/BillPayments",
    // },
    // roledata == "Super Admin" && {
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
    // roledata == "Super Admin" && {
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
    // roledata == "Super Admin" && {
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
    // roledata == "Super Admin" && {
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
    // roledata == "Super Admin" && {
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
    // roledata == "Super Admin" && {
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
    // (roledata == "Super Admin" || roledata == "Doctor Admin") && {
    //   id: 4,
    //   icon: <LocalHospitalIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Doctor",
    //   subMenus: [
    //     (roledata == "Super Admin" || roledata == "Doctor Admin") && {
    //       name: "spa",
    //       link: "/Speciality",
    //       icon: (
    //         <i
    //           class="fa fa-stethoscope"
    //           style={{ padding: "13px", fontSize: "17px" }}
    //         ></i>
    //       ),
    //       text: "Speciality",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Speciality" ? " activesidemenu" : ""}`,
    //     },
    //     (roledata == "Super Admin" || roledata == "Doctor Admin") && {
    //       name: "sym",
    //       link: "/Symptoms",
    //       icon: <SickIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Symptoms",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Symptoms" ? " activesidemenu" : ""}`,
    //     },
    //     (roledata == "Super Admin" || roledata == "Doctor Admin") && {
    //       name: "sym",
    //       link: "/Appoinments",
    //       icon: (
    //         // <SickIcon style={{ padding: "10px", fontSize: "46px" }} />
    //         <i
    //           class="fas fa-history"
    //           style={{ padding: "15px", fontSize: "17px" }}
    //         ></i>
    //       ),

    //       text: "Appoinments Reschedule",
    //       class:
    //         "doctorsidebar" +
    //         `${
    //           sidebarstate == "Appoinments Reschedule" ? " activesidemenu" : ""
    //         }`,
    //     },
    //   ],
    // },
    // {
    //   id: 12,
    //   icon: <LocalPharmacyIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Pharmacy(OLD)",
    //   subMenus: [
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
    //       name: "pharmacy",
    //       link: "/Pharmacy",
    //       icon: <VaccinesIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Pharmacys",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Pharmacys" ? " activesidemenu" : ""}`,
    //     },
    //   ],
    // },
    // (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
    //   id: 13,
    //   icon: <LocalPharmacyIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //   text: "Online Pharmacy",
    //   subMenus: [
    //             (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
    //       name: "Online pharmacy",
    //       link: "/PharmacyNew",
    //       icon: <VaccinesIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Online pharmacy",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Online pharmacy" ? " activesidemenu" : ""}`,
    //     },
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
    //       name: "Medicine Type",
    //       link: "/MedicineType",
    //       icon: <VaccinesIcon style={{ padding: "10px", fontSize: "46px" }} />,
    //       text: "Medicine Type",
    //       class:
    //         "doctorsidebar" +
    //         `${sidebarstate == "Medicine Type" ? " activesidemenu" : ""}`,
    //     },
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Pharmacy Admin") && {
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

    // (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
    //   id: 5,
    //   icon: (
    //     <i
    //       class="fas fa-file-medical-alt"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Diagnostics",
    //   subMenus: [
    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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

    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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
    //     (roledata == "Super Admin" || roledata == "Diagnostics Admin") && {
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
    // roledata == "Super Admin" && {
    //   id: 9,
    //   icon: (
    //     <i
    //       class="fas fa-book"
    //       style={{ padding: "13px", fontSize: "17px" }}
    //     ></i>
    //   ),
    //   text: "Records",
    //   subMenus: [
    //     roledata == "Super Admin" && {
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
    //     roledata == "Super Admin" && {
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
    //     roledata == "Super Admin" && {
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
      console.log(e);
      sidebarmenustate(sidebar(e));
    }
    dispatchid(productorderid(""));
    dispatch(productorder(""));

    tabsstate(dvtabs("About"));
  };

  const hoverstate = (e) => {
    if (!sideactive) {
      // console.log(e);
      $(".sidebarclose").css("width", "240px");
      $(".linkTextclosed").css("display", "block");
      $(".arrow").css("display", "block");
    }
    console.log(navData);
    navData[11] != undefined &&
      navData[11] != "" &&
      navData[11].subMenus.map((e) => {
        list.push(e.text);
      });
    navData[12] != undefined &&
      navData[12] != "" &&
      navData[12].subMenus.map((e) => {
        list2.push(e.text);
      });
    navData[13] != undefined &&
      navData[13] != "" &&
      navData[13].subMenus.map((e) => {
        list3.push(e.text);
      });
    navData[14] != undefined &&
      navData[14] != "" &&
      navData[14].subMenus.map((e) => {
        list4.push(e.text);
      });
    navData[15] != undefined &&
      navData[15] != "" &&
      navData[15].subMenus.map((e) => {
        list5.push(e.text);
      });

    if (list.includes(sidebarstate)) {
      setexpand(11);
    } else if (list2.includes(sidebarstate)) {
      setexpand(12);
    } else if (list3.includes(sidebarstate)) {
      setexpand(13);
    } else if (list4.includes(sidebarstate)) {
      setexpand(14);
    } else if (list5.includes(sidebarstate)) {
      setexpand(15);
    }
  };
  const hoverleave = (e) => {
    if (!sideactive) {
      // console.log(e);
      $(".sidebarclose").css("width", "65px");
      $(".linkTextclosed").css("display", "none");
      setexpand(false);
      $(".arrow").css("display", "none");
    }
  };
  useEffect(() => {
    if (!sideactive) {
      setexpand(false);
    }
  }, [sideactive]);
  useEffect(() => {
    if (sideactive) {
      console.log(navData);
      navData[11] != undefined &&
        navData[11] != "" &&
        navData[11].subMenus.map((e) => {
          list.push(e.text);
        });
      navData[12] != undefined &&
        navData[12] != "" &&
        navData[12].subMenus.map((e) => {
          list2.push(e.text);
        });
      navData[13] != undefined &&
        navData[13] != "" &&
        navData[13].subMenus.map((e) => {
          list3.push(e.text);
        });
      navData[14] != undefined &&
        navData[14] != "" &&
        navData[14].subMenus.map((e) => {
          list4.push(e.text);
        });
      navData[15] != undefined &&
        navData[15] != "" &&
        navData[15].subMenus.map((e) => {
          list5.push(e.text);
        });

      if (list.includes(sidebarstate)) {
        setexpand(11);
      } else if (list2.includes(sidebarstate)) {
        setexpand(12);
      } else if (list3.includes(sidebarstate)) {
        setexpand(13);
      } else if (list4.includes(sidebarstate)) {
        setexpand(14);
      } else if (list5.includes(sidebarstate)) {
        setexpand(15);
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
