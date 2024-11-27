import './App.css';
import "./Estilos/NuevoParque.css";
import "./Estilos/NuevoUsuario.css";
import "./Estilos/Registro.css";
import "./Estilos/Inicio.css";
import "./Estilos/ListaParques.css";

import AdminCancha from './Componentes/AdminCancha';
import FormularioRegistro from './Componentes/FormularioRegistro';
import HomeAdmin from './Componentes/HomeAdmin';
import NuevoParque from './Componentes/NuevoParque';
import Nuevacancha from './Componentes/NuevaCancha';
import NuevoUsuario from './Componentes/NuevoUsuario';
import EditarCancha from './Componentes/EditarCancha';
import UsuarioNuevo from './Componentes/UsuarioNuevo';
import ParqueNuevo from './Componentes/ParqueNuevo';
import Inicio from './Componentes/Inicio';
import ListaParques from './Componentes/ListaParques';
import UsReservaCancha from './Componentes/UsReservaCancha';

function App() {
  return (
    <div className="App">
      <Inicio></Inicio>
      <ListaParques></ListaParques>
     <UsReservaCancha></UsReservaCancha>
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
