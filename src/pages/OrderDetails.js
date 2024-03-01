import classes from './OrderDetails.module.css'


const OrderDetails = (props) => {
    const { purchase_id,
        user_id, f_name, l_name, user_email,
        placed_on, fulfilled_on, total } = props.order;

        console.log(props)

    // date format ISO 8601
    // toLocaleDateString(), toLocaleTimeString(), and toLocaleString() 
    const dateTimePlaced = new Date(placed_on);
    const dateTimeFulfilled = fulfilled_on
        ? `fulfilled on ${new Date(fulfilled_on).toLocaleString()}`
        : 'processing'



    return (
        <div className={classes.orderCard}>
            <div className={classes.firstRow}>
                <p>Order No:&nbsp;<span>{purchase_id}</span></p>
                <p>by&nbsp;<span>{f_name}&nbsp;{l_name}</span></p>
                <p>email&nbsp;<span>{user_email}</span></p>
                <p>id&nbsp;<span>{user_id}</span></p>
                <p>on&nbsp;<span>{dateTimePlaced.toLocaleDateString()}</span> at&nbsp;<span>{dateTimePlaced.toLocaleTimeString()}</span></p>
                <p>status: <span>{dateTimeFulfilled}</span></p>
                <p>total value: <span>{total}</span></p>
            </div>
            <div className={classes.secondRow}>
            </div>

            {/* {albumsDiv} */}

        </div>
    )

};

export default OrderDetails;
