

import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";
import twitter from "../../assets/icons/twitter.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";

import "./Footer.css";


export default function Footer(){



    return <footer>
                <div className="footerContent">
                    <div className="slogan">
                        <h1>GameHunt</h1>
                        <p>GameHunt makes it easy to find and buy the perfect game — whether you're into strategy, shooters, or story-driven epics.</p>
                        <div className="socialContacts">
                            <img src={facebook} alt="facebook" className="socialLink"/>
                            <img src={instagram} alt="instagram" className="socialLink"/>
                            <img src={twitter} alt="twitter" className="socialLink"/>
                            <img src={whatsapp} alt="whatsapp" className="socialLink"/>
                        </div>
                        <p>Built using <a href="https://rawg.io/apidocs">RAWG Gaming API</a></p>
                        <p>Icons used from <a href="https://www.flaticon.com/free-icons/purchase">Flaticon</a></p>
                    </div>
                    <div className="garbage">
                        <div className="list">
                    <p>Company</p>
                    <ul>
                       <li>About</li>
                       <li>Features</li>
                       <li>Works</li>
                       <li>Career</li> 
                    </ul>
                </div>
                <div className="list">
                    <p>Help</p>
                    <ul>
                       <li>Customer Support</li>
                       <li>Delievery Details</li>
                       <li>Terms & Conditions</li>
                       <li>Privacy Policy</li> 
                    </ul>
                </div>
                <div className="list">
                    <p>FAQ</p>
                    <ul>
                       <li>Account</li>
                       <li>Manage Deliveries</li>
                       <li>Orders</li>
                       <li>Payments</li> 
                    </ul>
                </div>
                    </div>
                </div>
            </footer>
}