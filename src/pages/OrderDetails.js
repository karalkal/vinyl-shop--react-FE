import classes from './OrderDetails.module.css'


const OrderDetails = (props) => {
    const { purchase_id,
        user_id, f_name, l_name, user_email,
        placed_on, fulfilled_on, total } = props.order;

    // date format ISO 8601
    // toLocaleDateString(), toLocaleTimeString(), and toLocaleString() 
    const dateTimePlaced = new Date(placed_on);
    const dateTimeFulfilled = fulfilled_on
        ? `fulfilled on ${new Date(fulfilled_on).toLocaleString()}`
        : 'processing'

    

    return (
        <div className={classes.orderCard}>
            <p>User&nbsp;<span>{f_name}&nbsp;{l_name}</span>
                &nbsp;with email&nbsp;<span>{user_email}</span>
                &nbsp;and id&nbsp;<span>{user_id}</span></p>
            <p>
                Placed order No:&nbsp;<span>{purchase_id}</span>
                &nbsp;on&nbsp;<span>{dateTimePlaced.toLocaleDateString()}</span>
                &nbsp;at&nbsp;<span>{dateTimePlaced.toLocaleTimeString()}</span>
            </p>
            <p>Order status: <span>{dateTimeFulfilled}</span></p>
            <p>Total value: <span>{total}</span></p>

            {/* {albumsDiv} */}

        </div>
    )

};

export default OrderDetails;
