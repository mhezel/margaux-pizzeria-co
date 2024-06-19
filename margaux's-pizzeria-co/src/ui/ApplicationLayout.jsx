import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function ApplicationLayout(){
  return (
    <div>
        <Header/>
        <main>
        <Outlet/>
        </main>
        <CartOverview/>
    </div>
  );
}
export default ApplicationLayout;