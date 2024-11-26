
import './App.css';
import "./Estilos/NuevoParque.css";
import "./Estilos/NuevoUsuario.css";
import "./Estilos/Registro.css";

import AdminCancha from './Componentes/AdminCancha';
import FormularioRegistro from './Componentes/FormularioRegistro';
import HomeAdmin from './Componentes/HomeAdmin';
import NuevoParque from './Componentes/NuevoParque';
import Nuevacancha from './Componentes/NuevaCancha';
import NuevoUsuario from './Componentes/NuevoUsuario';
import EditarCancha from './Componentes/EditarCancha';
import UsuarioNuevo from './Componentes/UsuarioNuevo';
import ParqueNuevo from './Componentes/ParqueNuevo';

function App() {
  return (
    <div className="App">
      <HomeAdmin></HomeAdmin>
      <AdminCancha></AdminCancha>
      <FormularioRegistro></FormularioRegistro>
      <NuevoParque></NuevoParque>
      <Nuevacancha></Nuevacancha>
      <NuevoUsuario></NuevoUsuario>
      <EditarCancha></EditarCancha>
      <UsuarioNuevo></UsuarioNuevo>
      <ParqueNuevo></ParqueNuevo>
    </div>
  );
}

export default App;
