import React, { Component } from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
    }
    
    render () {
        orders = this.state.orders.map(order => {
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        })    
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;