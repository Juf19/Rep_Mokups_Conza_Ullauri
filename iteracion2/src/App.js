
import './App.css';
import AdminCancha from './Componentes/AdminCancha';
import FormularioRegistro from './Componentes/FormularioRegistro';
import HomeAdmin from './Componentes/HomeAdmin';
import ItemBajoHeader from './Componentes/ItemBajoHeader';
import ItemHeaderA from './Componentes/ItemHeaderA';

function App() {
  return (
    <div className="App">
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <HomeAdmin></HomeAdmin>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <AdminCancha></AdminCancha>
      <FormularioRegistro></FormularioRegistro>
    </div>
  );
}

export default App;
