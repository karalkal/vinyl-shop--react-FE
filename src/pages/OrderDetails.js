import classes from './OrderDetails.module.css'


const OrderDetails = (props) => {
    const { purchase_id,
        user_id, f_name, l_name, user_email,
        placed_on, fulfilled_on, total,
        album_array } = props.order;

    console.log(album_array)

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
                <p>by&nbsp;<span>{f_name}&nbsp;{l_name}</span>&nbsp;email&nbsp;<span>{user_email}</span></p>
                {/* <p>id&nbsp;<span>{user_id}</span></p> */}
                <p>on&nbsp;<span>{dateTimePlaced.toLocaleDateString()}</span>&nbsp;at&nbsp;<span>{dateTimePlaced.toLocaleTimeString()}</span></p>
                <p>status: <span>{dateTimeFulfilled}</span></p>
                <p>total value: <span>{total}</span></p>
            </div>
            <div className={classes.secondRow}>
                {album_array.map((albumOrdered, idx) =>
                    <div className={classes.orderedAlbum} key={idx}>
                        <img src={albumOrdered[4]} alt={albumOrdered[1]}></img>
                        <h1>{albumOrdered[1]}</h1>
                        <h2>{albumOrdered[5]}</h2>
                    </div>
                )}
            </div>


        </div>
    )

};

export default OrderDetails;
