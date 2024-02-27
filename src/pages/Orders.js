import { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';

import { fetchAllOrders } from '../api/api';
import OrderDetails from './OrderDetails';
import { SuspenseSpinner } from '../UI/SuspenseSpinner';


export const Orders = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.loggedInUserData.auth_token
    const [orders, setOrders] = useState(null);
    console.log("parent function ran, token is:", token)


    useEffect(() => {
        async function getAllOrders() {
            console.log("effect ran, token is:", token)
            const response = await fetchAllOrders(token);
            console.log(response)

            setOrders(response);
            // setOrders(response.data);       // when using axios
        }
        if (token) {
            getAllOrders(); // <-- only fetch orders if truthy token
        }
    }, [token]);
    console.log(orders)
// no token -> need to log in
// token but:
//     orders is still null -> spinner
//          not null but orders.length is 0 -> message 
//          orders.length > 0 -> map results 
    return (<main>
        {token
            ? <>
                {!orders
                    ? <SuspenseSpinner />
                    : <div>
                        {orders.length === 0
                            ? <p> No orders found</p>
                            : <>
                                {orders.map(order =>
                                    <OrderDetails key={order.id} order={order} />)
                                }
                            </>
                        }
                    </div>
                }
            </>
            : <p> You need to log in first</p>}
    </main>
    )
}
