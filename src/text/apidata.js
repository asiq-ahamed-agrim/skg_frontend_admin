// const baseurl = "http://192.168.1.28:8005";
const baseurl = "https://user.agrim.no/";
// const productbaseurl = "http://192.168.1.28:8005";

const productbaseurl = "https://product.agrim.no";

export const loginapi = baseurl + "/adminlogin/";

export const adminlist = baseurl + "/adminpanel/v1/";

export const admincreate = baseurl + "/adminpanel/v1/";

export const doctorlist = baseurl + "/doctor/doctordetails/v1/";

export const doctorcreate = baseurl + "/doctor/doctordetails/v1/";

export const spacilitylist = baseurl + "/doctor/speciality/v2/";

export const spacilitycreate = baseurl + "/doctor/speciality/v2/";

export const symptomslist = baseurl + "/doctor/symptoms/v6/";

export const symptomscreate = baseurl + "/doctor/symptoms/v6/";

export const basetime = baseurl + "/doctor/basetime/v3/";

export const appoinment = baseurl + "/appointment/v1/";

export const doctimeslot = baseurl + "/doctor/getslotsdoctor/";

export const patientlist = baseurl + "/patient/admin/v1/";

export const dashboard = baseurl + "/admindashboard/";

export const pharmacy = baseurl + "/pharmacy/v1/";

export const banner = baseurl + "/bannerdisplay/v2/";

export const Dbanner = baseurl + "/bannerdisplaydia/v3/";

export const ProductOrderGet = baseurl + "/pharmacy/v2/";

export const InvestigationGet = baseurl + "/diagnostics/investigations/v2/";

export const Packagesget = baseurl + "/diagnostics/packages/v3/";

export const trackorder = baseurl + "/pharmacy/trackorderedit/";

export const pharmacytrackorder = baseurl + "/pharmacy/obtaintrackorder/";

export const diagnosticsissue = baseurl + "/diagnostics/reportissue/v4/";

export const pharmacyissue = baseurl + "/pharmacy/v3/";

export const pharmacyissuelist = baseurl + "/issuelist/v4/";

export const bannervideo = baseurl + "/bannerdisplaydoctor/v5/";

export const pharmacybill = baseurl + "/pharmacyopbilllist/";

export const diagnosticsbill = baseurl + "/diagnosticsopbilllist/";

export const billpayments = baseurl + "/ipbillpaymentlist/";

export const notification = baseurl + "/pushnotificationsend/";

export const notificationall = baseurl + "/pushnotificationall/";

export const diagnosticsorder = baseurl + "/diagnostics/diagnosticsorder/v5/";

export const diagnostictracksorder =
  baseurl + "/diagnostics/obtaintrackorderdiagonostics/";

export const duagnosticstrackorder =
  baseurl + "/diagnostics/trackordereditdiagnostics/";

export const cashback = baseurl + "/editloyaltypointslist/";

export const appointmentdetails = baseurl + "/appointmentdetails/";

export const pharmacydetails = baseurl + "/pharmacydetails/";

export const diagnosticsdetails = baseurl + "/diagnosticsdetails/";

export const billinglist = baseurl + "/getbillingresponsedata/";

export const updatehospitalservices =
  baseurl + "/diagnostics/savediagnostic/1/";

export const updateinvestigations = baseurl + "/diagnostics/savediagnostic/2/";

export const updatepackages = baseurl + "/diagnostics/savediagnostic/3/";

export const updatedoctor = baseurl + "/specialitydoctoradd/1";

export const updatespeciality = baseurl + "/specialitydoctoradd/0";

export const updateproduct = baseurl + "/specialitydoctoradd/2";

export const specialitydelete = baseurl + "/doctor/speciality/v2/";

export const symptomsdelete = baseurl + "/doctor/symptoms/v6/";

export const appoinmentsreschedule =
  baseurl + "/appointmentcancelreschedulelist/";

export const appoinmentsrescheduleclosed =
  baseurl + "/appointmentcancelrescheduleedit/";

export const appoinmentdelete = baseurl + "/appointment/v1/";

export const appoinmentrescheduleapi = baseurl + "/appointment/v1/";

export const patienttestimonials = baseurl + "/patienttestimonials/v6/";

export const doctorexcel = baseurl + "/excelsheetgeneration/1/";

export const specialitiesexcel = baseurl + "/excelsheetgeneration/2/";

export const symptomsexcel = baseurl + "/excelsheetgeneration/3/";

export const packagesexcel = baseurl + "/excelsheetgeneration/4/";

export const ipbillexcel = baseurl + "/excelsheetgeneration/5/";

export const oppharmacybillexcel = baseurl + "/excelsheetgeneration/6/";

export const opdiagnosticsbillexcel = baseurl + "/excelsheetgeneration/7/";

export const pharmacyexcel = baseurl + "/excelsheetgeneration/8/";

export const pharmacynew = baseurl + "/pharmacy/v5/";

export const medicinetype = baseurl + "/pharmacy/v4/";

export const pharmacybanner = baseurl + "/pharmabestoffers/v7/";

export const pharmacyrequest = baseurl + "/pharmacy/v2/";

export const pharmacyrequestput = baseurl + "/editpharmacart/";

export const generatereportpharmacy = baseurl + "/finalbillamount/";

// export const presignedurl="https://api.saveallnations.com/awspresignedurl";
export const presignedurl = baseurl + "/get_presigned";

export const presignedurl2 = "http://43.204.26.65:7000/static/media/";

/////SKG

export const Token = {
  headers: {
    auth_token: `${localStorage.getItem("token")}`,
    // Add any other headers if needed
  },
};

// client
export const login = baseurl + "/admin_login";

export const ClientCreate = baseurl + "/client_creation";

export const CustomerDetails = baseurl + "/get_client_data";

export const StoreDetails = baseurl + "/get_org_stores";

export const OrgUserDetails = baseurl + "/get_org_users/";

// product
export const CreateProductData = productbaseurl + "/create_product";

export const EditProductData = productbaseurl + "/update_products/";

export const getProductList = productbaseurl + "/get_products/";

export const getYourOrdersList = productbaseurl + "/get_all_order";

export const getYourOrdersItem = productbaseurl + "/get_order_items/";




export const clientdata =
  "https://zhxpx7std1.execute-api.us-east-1.amazonaws.com/Prod/get_client_data";

export const clientapprove =
  "https://zhxpx7std1.execute-api.us-east-1.amazonaws.com/Prod/confirm_reject";
