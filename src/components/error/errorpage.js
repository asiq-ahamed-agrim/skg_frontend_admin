import "./style.scss"

export default function ErrorPage(props){

    return(
        <>
        <div className="error-page">
        <div class="main-wrapper">
			
			<div class="error-box">
				<h1>{props.errorstatus}</h1>
				<h3 class="h2 mb-3"><i class="fa fa-warning"></i> Oops! {props.errorstatus=="401"?"Jwt Token Expired": "Something Went Wrong !"}</h3>
				<p class="h4 font-weight-normal">{props.errorstatus=="401"?"Please Login Again To Continue ":"The page you requested was not found."}</p>
				<a href="/login" onClick={(e)=>{    localStorage.clear()}} class="btn btn-primary">Go Back</a>
			</div>
		
        </div>
        </div>
        </>
    )
}