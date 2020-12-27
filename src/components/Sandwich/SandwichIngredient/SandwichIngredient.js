import React, { Component } from 'react';
import classes from './SandwichIngredient.css';
import PropTypes from 'prop-types';

class SandwichIngredient extends Component {
    render () {
        let ingredient = null;
        
        switch (this.props.type){
            case ('bread'):
                ingredient = <div className={classes.Bread}></div>;
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('lettuce'):
                ingredient = <div className={classes.Lettuce}></div>;
                break;
            case ('ham'):
                ingredient = <div className={classes.Ham}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

SandwichIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default SandwichIngredient;