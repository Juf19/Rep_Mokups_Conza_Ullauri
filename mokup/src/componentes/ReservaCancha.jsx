import React, { Component } from 'react';

class ReservaCancha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horas: 1,
      horario: '',
      aceptarTerminos: false
    };
  }

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
      <div className='app'>
        <h3>Seleccione el número de horas que desea reservar</h3>
        <label>
          <input type="radio" value="1" checked={this.state.horas === '1'} onChange={this.handleHorasChange} />
          1
        </label>
        <label>
          <input type="radio" value="2" checked={this.state.horas === '2'} onChange={this.handleHorasChange} />
          2
        </label>

        <h3>Seleccione el horario</h3>
        <div className='menuh'>
          <button className='horario'>8-9</button>
          <button className='horario'>9-10</button>
          <button className='horario'>10-11</button>
          <button className='horario'>11-12</button>
          <button className='horario'>12-13</button>
          <button className='horario'>13-14</button>
          <button className='horario'>14-15</button>
          <button className='horario'>15-16</button>
          <button className='horario'>16-17</button>
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
        <button className="disponibilidad-button"> Atras </button>
        </div>
        <div className='item1'>
        <button className="disponibilidad-button" onClick={this.handleReserva}>Reservar</button>
        </div>
        </div>
        
      </div>
    );
  }
}

export default ReservaCancha;
