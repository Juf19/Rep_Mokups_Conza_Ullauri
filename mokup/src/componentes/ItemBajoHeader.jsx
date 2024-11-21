import React, { Component } from 'react';
class ItemBajoHeader extends Component {
    render() {
        const { nombre } = this.props;
        return (
            <div className="app">
                <div className="celeste"><div className="azul"><h2>{nombre}</h2></div></div>
            </div>
        );
    }
}
export default ItemBajoHeader;