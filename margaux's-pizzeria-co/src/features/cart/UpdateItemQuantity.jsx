import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decQuantityItemsToCart, incQuantityItemsToCart } from "./cartSlice";

function UpdateItemQuantity({pizzaId, currentCartQuantity}){
    const dispatch = useDispatch();

    return(
        <div className="flex gap-2 items-center md:gap-3">
             <Button type="round" 
                onClick={() => dispatch(decQuantityItemsToCart(pizzaId))}>-</Button>
                <span className="text-sm font-medium">{currentCartQuantity}</span> 
             <Button type="round" 
                onClick={() => dispatch(incQuantityItemsToCart(pizzaId))}>+</Button>    
        </div>
    );
}
export default UpdateItemQuantity;