import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentCartQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const {pizzaId, name, quantity, totalPrice } = item;
  const currentCartQuantity = useSelector(getCurrentCartQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentCartQuantity={currentCartQuantity}/>
        <DeleteItem type="small" pizzaId={pizzaId}>Delete</DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
