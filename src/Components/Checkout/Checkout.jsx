import { useEffect, useState } from "react";
import { useOutletContext} from "react-router-dom";
import "./Checkout.css";


export default function Checkout(){
    const cart = useOutletContext().cart;
    const addtoCart = useOutletContext().addfunc;
    const removeFromCart = useOutletContext().removefunc;
    const [total, setTotal] = useState(calculatePrice());


    function calculatePrice(){
        let total = 0;
        for (let i = 0; i < cart.length; i++){
            total += cart[i].price * cart[i].count;
        }
        return total.toFixed(2);
    }

    useEffect(()=>{
        setTotal(calculatePrice);
    }, [cart])
    function handleChange(e, index){
        addtoCart({id : cart[index].id, details : cart[index].details, price : cart[index].price, count : Number(e.target.value), fromCheckout : true});
    }

    function handleDelete(index){
        removeFromCart(cart[index].id);
    }
    return <div className="checkoutPage">
            <div className="checkoutContainer">
                <h1 className="orbitron">Your Cart</h1>
                <hr />
                {cart.length > 0 ? <div className="cartContent">
                    {
                        cart.map((item, index) => <div className="cartItem" key={item.id}>
                            <div className="gamedetailsCart">
                                <img src={item.details.background_image}/>
                                <h2 className="gamename orbitron">{item.details.name}</h2>
                            </div>
                            <div className="gamepricecont">
                                <p>{item.price}$</p>
                                <input type="number" defaultValue={item.count} onChange={(e)=>handleChange(e, index)} min={1}/>
                                <button className="removeFromCart" onClick={()=> handleDelete(index)}>Delete</button>
                            </div>
                        </div>)
                    }
                </div> : <h2 className="orbitron nothing">Nothing in Cart, add something to display!</h2>}
                
                <hr />
                <div className="total">
                    <h1 className="orbitron">Your Total: </h1>
                    <div className="totalAmount"><p>{total}$</p></div>
                    <button className="useLessCheckoutbtn">Checkout</button>
                </div>
            </div>
       </div>
}