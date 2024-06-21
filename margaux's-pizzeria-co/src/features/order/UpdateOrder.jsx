import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

function UpdateOrder(){
    
    const fetch = useFetcher();
    return(
        <fetch.Form method="PATCH" className="text-right">
            <Button type="primary">Make priority</Button>
        </fetch.Form>
    );
}
export default UpdateOrder;

export async function action({request, params}){
    const data = {priority : true};
    await updateOrder(params.orderId, data);
    return null;
}