import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sidebarnav: "true",
  sidebar: "Client Details",
  loader: "false",
  popupalert: "false",
  clientaddstatevalue:"",


  editadminuser: "",
  editadminuserid: "",
  editdoctoruser: "",
  patientid: "",
  speciality: "",
  specialityid: "",
  symptoms: "",
  symptomsid: "",
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
userdata:"",
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
    
    clientaddstate: (state, action) => {
      state.clientaddstatevalue = action.payload;
      // console.log(state.edituser,"kdsjh")
    },


    ///
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
    },
    Investigationid: (state, action) => {
      state.Investigationid = action.payload;
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

    userdata: (state, action) => {
      state.userdata = action.payload;
    },





  },
});

export const {
  sidenav,
  sidebar,
  loader,
  popupalert,
  clientaddstate,


  editadminuser,
  editadminuserid,
  patientid,
  speciality,
  specialityid,
  symptoms,
  symptomsid,
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
userdata,
} = counterSlice.actions;

export default counterSlice.reducer;
