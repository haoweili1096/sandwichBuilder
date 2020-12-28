import React from 'react';
import classes from './Logo.css';
import sandwichLogo from '../../assets/images/sandwich-logo.jpg';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={sandwichLogo} alt="My Sandwich" />
    </div>
);

export default logo;