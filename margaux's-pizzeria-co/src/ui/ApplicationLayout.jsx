import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingData from "./LoadingData";

function ApplicationLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(navigation);

  return (
    <div className="layout">
      {isLoading && <LoadingData />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
export default ApplicationLayout;
