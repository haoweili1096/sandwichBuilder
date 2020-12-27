import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main>
                    {this.props.children}
                </main>
            </Aux>  
        );
    }
}

export default Layout;