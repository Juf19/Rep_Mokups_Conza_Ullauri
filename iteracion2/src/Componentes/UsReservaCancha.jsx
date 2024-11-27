import React, { Component } from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import BotonConFlecha from './BotonConFlecha';
import CalendarioRectangulo from './CalendarioRectangulo';

class UsReservaCancha extends Component {


    constructor(props) {
        super(props);
        this.state = {
            horas: 1,
            horario: '',
            aceptarTerminos: false
        };
    }

    texto = [{ nombre: "CANCHA 1" }]

    handleHorasChange = (event) => {
        this.setState({ horas: event.target.value });
    };

    handleHorarioChange = (event) => {
        this.setState({ horario: event.target.value });
    };

    handleTerminosChange = (event) => {
        this.setState({ aceptarTerminos: event.target.checked });
    };
    handleReserva = () => {
        alert(`Reservado`);
    };

    render() {
        return (
            <div className='espaciadocancha'>
                <ItemHeader></ItemHeader>
                <ItemBajoHeader nombre={this.texto[0].nombre}></ItemBajoHeader>
                <div className='derecha'>
                <CalendarioRectangulo></CalendarioRectangulo>
                </div>
                
                <div className='app'>
                    <h3>Seleccione el número de horas que desea reservar</h3>
                    <div className='radioB'>
                        <div className='radio1'>
                            <label className='radiosPrimeros'>
                                <input type="radio" value="1" checked={this.state.horas === '1'} onChange={this.handleHorasChange} /> 1
                            </label>
                        </div>
                        <div className='radio2'>
                            <label className='radiosPrimeros'>
                                <input type="radio" value="2" checked={this.state.horas === '2'} onChange={this.handleHorasChange} />  2
                            </label>
                        </div>
                    </div>
                    <h3>Seleccione el horario</h3>
                    <div className='menuh'>
                        <button className='horario'>8-9</button>
                        <button className='rojo1'>9-10</button>
                        <button className='rojo1'>10-11</button>
                        <button className='rojo1'>11-12</button>
                        <button className='rojo1'>12-13</button>
                        <button className='rojo1'>13-14</button>
                        <button className='rojo1'>14-15</button>
                        <button className='rojo1'>15-16</button>
                        <button className='rojo1'>16-17</button>
                        <button className='horario'>17-18</button>
                        <button className='horario'>18-19</button>

                    </div>
                    <h3>Aceptar términos y condiciones</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.aceptarTerminos}
                            onChange={this.handleTerminosChange}
                        />
                        <span> Usted está aceptando que cumplirá con el horario establecido y que en caso de cancelar lo realizará con al menos 48 horas de antelación</span>
                    </label>
                    <div className="form1">
                        <div className='item1'>
                            <BotonConFlecha></BotonConFlecha>
                        </div>
                        <div className='item1'>
                            <button className="reserva-button" onClick={this.handleReserva}>Reservar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsReservaCancha;
