import React from 'react';
import classes from './Sandwich.css';
import SandwichIngredient from './SandwichIngredient/SandwichIngredient';

const sandwich = (props) => {
    //transform an object to key value pairs into an array of sandwich ingredients
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <SandwichIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);//falttern the array, reduce allow us to transform an array into something else

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Sandwich}>
            <SandwichIngredient type="bread" />
            {transformedIngredients}
            <SandwichIngredient type="bread" />
        </div>
    );
}

export default sandwich;