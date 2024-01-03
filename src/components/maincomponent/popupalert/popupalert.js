import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(props) {
  return (
    <Stack sx={{ width: '30%',position:"absolute",zIndex:500 ,top:"510px",left:"35%"}} spacing={2}>
      <Alert icon={false} sx={{ backgroundColor: "#323232" ,color:"#8C8C8C"}} 
      action={
        <Button color="inherit" size="small" onClick={(e) => {
          props.popupalert("false")
        }} sx={{color:"#EFB60A"}}>
          OK
        </Button>
      }
      >
        {props.alertpopuptext}</Alert>
    </Stack>
  );
}
