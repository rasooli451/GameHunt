

import { Outlet, useLocation} from "react-router-dom";
 
export default function Search(){
    const location = useLocation();
    return <Outlet key={location.pathname}/>
}






