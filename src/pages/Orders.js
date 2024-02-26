import { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';

import { fetchAllOrders } from '../api/api';
import OrderDetails from './OrderDetails';


export const Orders = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.loggedInUserData.auth_token
    const [orders, setOrders] = useState([]);
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

    return (
        <main>
            {orders.map(order => {
                print()
                return <OrderDetails key={order.id} order={order} />
            }
            )}
        </main>
    )

    function print() {
        console.log("Rendering...")
    }

}
