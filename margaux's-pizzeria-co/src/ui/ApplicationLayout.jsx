import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingData from "./LoadingData";

function ApplicationLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(navigation);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingData />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
export default ApplicationLayout;
