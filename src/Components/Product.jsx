



import { Outlet, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Product(){
    const addToCart = useOutletContext();
    return <Outlet  context={addToCart}/>
}