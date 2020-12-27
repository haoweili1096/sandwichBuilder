import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Sandwich from '../../components/Sandwich/Sandwich';

class SandwichBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            ham: 1,
            cheese: 2,
            meat: 2
        }
    }

    render () {
        return (
            <Aux>
                <Sandwich ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default SandwichBuilder;