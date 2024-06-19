import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header(){
    return(
        <header>
            <Link to="/">Margaux&#39;s Pizzeria Co.</Link>
            <SearchOrder/>
            <p>Margaux</p>
        </header>
    )
}
export default Header;