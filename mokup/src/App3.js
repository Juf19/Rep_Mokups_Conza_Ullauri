import React, { Component } from 'react';
import './App3.css';
import Tr from './componentes/Tr';
import TriangulosConCurva from './componentes/TriangulosConCurva';
import LoginBox from './componentes/LoginBox';





class App extends Component {
  render() {
    return (
      <div className="App">
        <Tr></Tr>
        <LoginBox></LoginBox>
        <TriangulosConCurva></TriangulosConCurva>
      </div>

    );
  }
}

export default App;
