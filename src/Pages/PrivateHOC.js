import { Navigate } from "react-router-dom";

function PrivateHOCComponent(props)
{
    let email=localStorage.getItem('email');
    let roleName=localStorage.getItem('role');
    return(
        <>
        {(email!=null&&roleName==props.role)? <props.cmp/> : <Navigate to='/signin'/> }
        </>
    )
}

export default PrivateHOCComponent;