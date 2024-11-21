import React, { Component } from 'react';

class Parque extends Component {
  render() {
    return (
      <div className="parque">

        <img src={this.props.img} alt={this.props.name} className="parque-image" />
        <p className='name'>{this.props.name}</p>
      </div>
    );
  }
}

export default Parque;
