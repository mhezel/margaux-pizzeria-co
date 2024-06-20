import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, getCurrentCartQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  // special selector => 
  // to check if item is inside the cart for conditional rendering of delete action
  const currentCartQuantity = useSelector(getCurrentCartQuantityById(id));
  const isItemAddedToCart = currentCartQuantity > 0;

  function handleAddToCart(){
    // console.log(id);
    const newItem = {
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
    };
    dispatch(addItemsToCart(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} 
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm uppercase font-medium text-stone-500">{formatCurrency(unitPrice)}</p> : 
          <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {!soldOut && (
            <>
              {isItemAddedToCart && 
                (<DeleteItem pizzaId={id}>Remove</DeleteItem>)}
              {!isItemAddedToCart && 
                (<Button type="small" onClick={handleAddToCart}>Add to cart</Button>)}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
export default MenuItem;
