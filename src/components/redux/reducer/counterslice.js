import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sidebarnav: "true",
  sidebar: "DashBoard",
  loader: "false",
  popupalert: "false",
  editadminuser: "",
  editadminuserid: "",
  edituserdoctorid: "",
  editdoctoruser: "",
  basetimeedit: "",
  basetimeid: "",
  patientid: "",
  speciality: "",
  specialityid: "",
  symptoms: "",
  symptomsid: "",
  pharmacypopup: "",
  pharmacyid: "",
  dvtabs: "About",
  bannerdata: "",
  bannerid: "",
  productorder: "",
  productorderid: "",
  Investigation: "",
  Investigationid: "",
  packages:"",
  packagesid:"",
  Pharmacylistissue:"",
Pharmacylistissueid:"",
videobannerstate:"",
videobannerid:"",
userdata:"",
appoinmentreshedule:"",
appoinmentresheduleid:"",
};
export const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    sidenav: (state, action) => {
      state.sidebarnav = action.payload;
      // console.log(state.sidebarnav)
    },
    sidebar: (state, action) => {
      state.sidebar = action.payload;
      // console.log(state.sidebar,"hkafgjh")
    },
    loader: (state, action) => {
      state.loaderstate = action.payload;
      // console.log(state.loaderstate,"kdsjh")
    },
    popupalert: (state, action) => {
      state.popupalert = action.payload;
      // console.log(state.popupalert,"kdsjh")
    },
    editadminuser: (state, action) => {
      state.edituser = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    editadminuserid: (state, action) => {
      state.edituserid = action.payload;
      // console.log(state.edituserid,"kdsjh")
    },
    editdoctoruser: (state, action) => {
      state.editdoctoruser = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    editdoctoruserid: (state, action) => {
      state.edituserdoctorid = action.payload;
      // console.log(state.edituserdoctorid,"kdsjh")
    },
    basetimeedit: (state, action) => {
      state.basetimeedit = action.payload;
      //  console.log(state.basetimeedit,"kdsjh")
    },
    basetimeid: (state, action) => {
      state.basetimeid = action.payload;
      //  console.log(state.basetimeid,"kdsjh")
    },
    patientid: (state, action) => {
      state.patientid = action.payload;
      //  console.log(state.patientid,"kdsjh")
    },
    symptoms: (state, action) => {
      state.symptoms = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    symptomsid: (state, action) => {
      state.symptomsid = action.payload;
    },

    speciality: (state, action) => {
      state.speciality = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    specialityid: (state, action) => {
      state.specialityid = action.payload;
    },
    pharmacypopup: (state, action) => {
      state.pharmacypopup = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    pharmacyid: (state, action) => {
      state.pharmacyid = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    dvtabs: (state, action) => {
      state.dvtabs = action.payload;
      console.log(state.dvtabs, "kdsjh");
    },
    bannerdata: (state, action) => {
      state.bannerdata = action.payload;
      // console.log(state.edituser,"kdsjh")
    },
    bannerid: (state, action) => {
      state.bannerid = action.payload;
    },
    productorder: (state, action) => {
      state.productorder = action.payload;
    },
    productorderid: (state, action) => {
      state.productorderid = action.payload;
      console.log(state.productorderid, "kdsjh");
    },
    Investigation: (state, action) => {
      state.Investigation = action.payload;
      // console.log(state.Investigation,"kdsjh")
    },
    Investigationid: (state, action) => {
      state.Investigationid = action.payload;
      // console.log(state.Investigation,"kdsjh")
    },
    packages: (state, action) => {
      state.packages = action.payload;
    },
    packagesid: (state, action) => {
      state.packagesid = action.payload;
    },
    Pharmacylistissue: (state, action) => {
      state.Pharmacylistissue = action.payload;
    },
    Pharmacylistissueid: (state, action) => {
      state.Pharmacylistissueid = action.payload;
    },

    videobannerstate: (state, action) => {
      state.videobannerstate = action.payload;
    },
    videobannerid: (state, action) => {
      state.videobannerid = action.payload;
    },
    userdata: (state, action) => {
      state.userdata = action.payload;
    },
    appoinmentreshedule: (state, action) => {
      state.appoinmentreshedule = action.payload;
    },
    appoinmentresheduleid: (state, action) => {
      state.appoinmentresheduleid = action.payload;
    },





  },
});

export const {
  sidenav,
  sidebar,
  loader,
  popupalert,
  editadminuser,
  editadminuserid,
  editdoctoruser,
  editdoctoruserid,
  basetimeedit,
  basetimeid,
  patientid,
  speciality,
  specialityid,
  symptoms,
  symptomsid,
  pharmacypopup,
  pharmacyid,
  dvtabs,
  bannerdata,
  bannerid,
  productorder,
  productorderid,
  Investigation,
  Investigationid,
  packages,
  packagesid,
  Pharmacylistissue,
Pharmacylistissueid,
videobannerstate,
videobannerid,
userdata,
appoinmentreshedule,
appoinmentresheduleid
} = counterSlice.actions;

export default counterSlice.reducer;
