// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearItemsToCart, getCart, getTotalAmountPriceOfPizzas } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// static
// const fakeCart = [
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

function CreateOrder() {

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const {userName, 
        status: addressStatus,
        position, 
        address,
        error: errorAddress,
        } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalCartAmountOrder = useSelector(getTotalAmountPriceOfPizzas);
  const priorityPrice = withPriority ? totalCartAmountOrder * 0.2 : 0;
  const totalPrice = totalCartAmountOrder + priorityPrice;

  if(!cart.length) return <EmptyCart/>
  console.log(errorAddress);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&#39;s go!</h2>
      {/* <Form method="post" action="/order/new"> */}
      <Form method="post">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={userName}required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required/>
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude &&(
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button disabled={isLoadingAddress} 
                type="small" 
                onClick={(e) => {
                  e.preventDefault(); dispatch(fetchAddress());
                  }}>Get Position</Button>
            </span>
            )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" 
            value={position.longitude && position.latitude ? 
              `${position.latitude}, ${position.longitude}` : ''}/>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? "Submitting order" : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //error-handling & validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearItemsToCart()); // hacks to clear cart-overview after ordering
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
