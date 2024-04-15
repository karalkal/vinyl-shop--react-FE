import { useContext, useEffect, useState } from 'react';

import AuthContext from '../context/AuthContextProvider';

import { fetchAllOrders } from '../api/api';

import styles from './Orders.module.css';
import OrderDetails from './OrderDetails';
import { SuspenseSpinner } from '../modals/SuspenseSpinner';
import ErrorGeneric from './ErrorGeneric';


export const Orders = () => {
    const { loggedInUserData } = useContext(AuthContext);
    const token = loggedInUserData.auth_token;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getAllOrders() {
            const response = await fetchAllOrders(token);
            setOrders(response);
        }
        if (token) {
            getAllOrders(); // <-- only fetch orders if truthy token
        }
    }, [token]);
    /*
    BE will return array where each album ordered will be separate object,
    and will have duplicate purchase_id when more than one item in order
    On FE construct aggregated objects like:
    {purchase_id,
        user_id, f_name, l_name, user_email,
        placed_on, fulfilled_on, total,
    albums_array}
    and send to details page
    */

    let aggregatedArray = []
    if (orders) {
        for (let originalObj of orders) {
            const foundItem = aggregatedArray.find(item => item.purchase_id === originalObj.purchase_id);
            if (!foundItem) {
                // if not in aggregatedArray ->> process data
                const { album_info, ...rest } = originalObj
                let newObj = { ...rest };
                newObj.album_array = [];
                (newObj.album_array).push(album_info);
                aggregatedArray.push(newObj);
            }
            else {
                (foundItem.album_array).push(originalObj.album_info);
            }
        }
    }

    // no token -> need to log in
    // token but:
    //     orders is still null -> spinner
    //          not null but orders.length is 0 -> message 
    //          orders.length > 0 -> map results 
    return (<main>
        {token
            ? <div className={styles.ordersDiv}>
                {!orders
                    ? <SuspenseSpinner />
                    : <>
                        {orders.length === 0
                            ? <h2 className={styles.noOrders}> No orders found</h2>
                            : <>
                                {aggregatedArray.map(order =>
                                    <OrderDetails key={order.purchase_id} order={order} />)
                                }
                            </>
                        }
                    </>
                }
            </div>
            :
            <ErrorGeneric errMessage="Log in/register to continue" />
        }
    </main>
    )
}
