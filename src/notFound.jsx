import { Links } from "react-router-dom"

export const NotFound=()=>{
    return(<>
        <h1> 404 NOT FOUND</h1>
        <Links to='/'> Back to Home</Links>
    </>)
}