import React from 'react';

const ItemBajoHeader = ({ nombre }) => {
    return (
        <div className="app">
            <div className="celeste">
                <div className="azul">
                    <h2>{nombre}</h2>
                </div>
            </div>
        </div>
    );
};

export default ItemBajoHeader;
