import styles from './OrderDetails.module.css'


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
        <div className={styles.orderCard}>
            <div className={styles.firstRow}>
                <p>Order No:&nbsp;<span>{purchase_id}</span></p>
                <p>by&nbsp;<span>{f_name}&nbsp;{l_name}</span>&nbsp;&nbsp;(email&nbsp;<span>{user_email}</span>)</p>
                {/* <p>id&nbsp;<span>{user_id}</span></p> */}
                <p>on&nbsp;<span>{dateTimePlaced.toLocaleDateString()}</span>&nbsp;&nbsp;at&nbsp;<span>{dateTimePlaced.toLocaleTimeString()}</span></p>
                <p>status: <span>{dateTimeFulfilled}</span></p>
                <p>total value: <span>{total}</span></p>
            </div>
            <div className={styles.secondRow}>
                {album_array.map((albumOrdered, idx) =>
                    <div className={styles.orderedAlbum} key={idx}>
                        <div>
                            <img src={albumOrdered[1]} alt={albumOrdered[1]}></img>
                            <h1>{albumOrdered[2]}</h1>
                            <h2>&ndash;</h2>
                            <h2>{albumOrdered[3]}</h2>
                            <h2>({albumOrdered[4]})</h2>
                        </div>
                        <div>
                            <p>color:&nbsp;<span>{albumOrdered[5]}</span></p>
                            <p>price:&nbsp;<span>£{albumOrdered[6].toFixed(2)}</span></p>
                        </div>

                    </div>
                )}
            </div>


        </div>
    )

};

export default OrderDetails;
