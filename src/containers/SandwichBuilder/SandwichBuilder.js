import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Sandwich from '../../components/Sandwich/Sandwich';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    ham: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class SandwichBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            ham: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }
        );
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        //can not be smaller than 0
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeduction;

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }
        )
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
         
        return (
            <Aux>
                <Sandwich ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default SandwichBuilder;