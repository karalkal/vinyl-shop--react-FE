import { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';

import { fetchAllOrders } from '../api/api';
import OrderDetails from './OrderDetails';


export const Orders = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.loggedInUserData.auth_token
    const [orders, setOrders] = useState({});

    useEffect(() => {
        async function getAllOrders() {
            const response = await fetchAllOrders(token);

            setOrders(response.data);
        }

        getAllOrders();
    }, [token]);

    console.log(orders)
    return (
        <main>
            {orders.length > 0 && { token } && <div>
                {orders.map(order =>
                    <OrderDetails key={order.id} order={order} />
                )}
            </div>
            }
        </main>
    )

}
