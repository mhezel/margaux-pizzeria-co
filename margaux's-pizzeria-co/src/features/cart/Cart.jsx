import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";
import { clearItemsToCart } from "../cart/cartSlice";
import EmptyCart from "./EmptyCart";

// const fakeCart = [ //static cart items
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const userName = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold capitalize">
        {cart.length === 0
          ? `Your cart ${userName} is empty!`
          : `Your cart ${userName}!`}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button
          type="secondary"
          disabled={cart.length === 0}
          onClick={() => dispatch(clearItemsToCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
