import React from "react";
import './App2.css';
import ItemHeader from './componentes/ItemHeader';
import ListaParques from "./componentes/ListaParques";
import ItemBajoHeader from './componentes/ItemBajoHeader';


class App extends React.Component {
  render (){
    return (
      <div className="App">
        <ItemHeader></ItemHeader>
        <ItemBajoHeader></ItemBajoHeader>
        <ListaParques></ListaParques>

      </div>
    
    );
   }
  } 

export default App;
