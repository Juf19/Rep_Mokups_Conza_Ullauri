import React, { Component } from 'react';
class SelectorCancha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deporte: '',
            cancha: '',
        };
    }

    handleDeporteChange = (event) => {
        this.setState({ deporte: event.target.value });
    };

    handleCanchaChange = (event) => {
        this.setState({ cancha: event.target.value });
    };

    handleDisponibilidad = () => {
        alert(`Verificando disponibilidad para ${this.state.deporte} en cancha ${this.state.cancha}`);
    };

    render() {
        return (
            <div className="form">
                <div className='item'>
                    <h3>Seleccione en el mapa la cancha que desea reservar</h3>
                    <label className='futbol'>FUTBOL ⚽</label>
                    <select value={this.state.deporte === 'futbol' ? this.state.cancha : ''} onChange={this.handleCanchaChange}>
                        <option value="">Seleccione cancha</option>
                        <option value="C-F1">C-F1</option>
                        <option value="C-F2">C-F2</option>
                        <option value="C-F3">C-F3</option>
                    </select>
                </div>
                <div className='item'>
                    <label className='basquet'>BASQUET 🏀</label>
                    <select value={this.state.deporte === 'basquet' ? this.state.cancha : ''} onChange={this.handleCanchaChange}>
                        <option value="">Seleccione cancha</option>
                        <option value="C-B1">C-B1</option>
                    </select>
                </div>
                <div className='item'>
                    <button className="disponibilidad-button" onClick={this.handleDisponibilidad}>Disponibilidad</button>
                </div>
            </div>
        );
    }
}
export default SelectorCancha;