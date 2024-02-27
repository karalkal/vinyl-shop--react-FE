import { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';

import { fetchAllOrders } from '../api/api';

import classes from './Orders.module.css'
import OrderDetails from './OrderDetails';
import { SuspenseSpinner } from '../UI/SuspenseSpinner';


export const Orders = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.loggedInUserData.auth_token
    const [orders, setOrders] = useState(null);


    useEffect(() => {
        async function getAllOrders() {
            const response = await fetchAllOrders(token);

            setOrders(response);
        }
        if (token) {
            getAllOrders(); // <-- only fetch orders if truthy token
        }
    }, [token]);

    console.log(token, orders);
    // no token -> need to log in
    // token but:
    //     orders is still null -> spinner
    //          not null but orders.length is 0 -> message 
    //          orders.length > 0 -> map results 
    return (<main>
        {token
            ? <div className={classes.ordersDiv}>
                {!orders
                    ? <SuspenseSpinner />
                    : <>
                        {orders.length === 0
                            ? <h2> No orders found</h2>
                            : <>
                                {orders.map(order =>
                                    <OrderDetails key={order.purchase_id} order={order} />)
                                }
                            </>
                        }
                    </>
                }
            </div>
            : <div className={classes.ordersDiv}>
                <h2> You need to log in first</h2>
            </div>
        }
    </main>
    )
}
