import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItemsToCart } from "./cartSlice";

function DeleteItem({pizzaId, children}) {
    const dispatch = useDispatch();
    
    return (
        <Button type="small" 
        onClick={() => dispatch(deleteItemsToCart(pizzaId))}
        >{children}</Button>
    )
  }
export default DeleteItem;
