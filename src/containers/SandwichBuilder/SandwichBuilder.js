import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Sandwich from '../../components/Sandwich/Sandwich';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

// const INGREDIENT_PRICES = {
//     lettuce: 0.5,
//     ham: 0.7,
//     cheese: 0.4,
//     meat: 1.3
// }

class SandwichBuilder extends Component {
    state = {
        //ingredients: null, //redux
        //totalPrice: 4, //redux
        //purchasable: false, //redux
        purchasing: false, //local UI state
        //loading: false, //local UI state
        //error: false //local UI state
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const oldPrice = this.state.totalPrice;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState(
    //         {
    //             ingredients: updatedIngredients,
    //             totalPrice: newPrice
    //         }
    //     );
    //     this.updatePurchaseState(updatedIngredients);
    // }


    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     //can not be smaller than 0
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const oldPrice = this.state.totalPrice;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState(
    //         {
    //             ingredients: updatedIngredients,
    //             totalPrice: newPrice
    //         }
    //     )
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout'); 
    }

    componentDidMount(){
        //console.log(this.props);
        this.props.onInitIngredients();
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let sandwich = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){
            sandwich = (
                <Aux>
                    <Sandwich ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        //purchasable={this.state.purchasable}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {sandwich}
            </Aux>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.sandwichBuilder.ingredients,
        price: state.sandwichBuilder.totalPrice,
        error: state.sandwichBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirtectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SandwichBuilder, axios));