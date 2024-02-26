const OrderDetails = (props) => {
    const { id, albums_ordered, count_items, fulfilled_on, placed_on, total, user_id } = props;

    return (
        <div>
            <p>Order No: {id}</p>
            <p>Items ordered: {id}</p>
            <p>Order placed on: {placed_on}</p>
            <p>Order fulfilled on: {fulfilled_on}</p>
            <p>Total value: {total}</p>
        </div>
    )

};

export default OrderDetails;