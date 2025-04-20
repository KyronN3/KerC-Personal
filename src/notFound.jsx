import { Link } from "react-router-dom"

export const NotFound=()=>{
    return(<>
        <h1> 404 NOT FOUND</h1>
        <Link to='/'> Back to Home</Link>
    </>)
}