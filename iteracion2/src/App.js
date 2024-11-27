import './App.css';
import "./Estilos/NuevoParque.css";
import "./Estilos/NuevoUsuario.css";
import "./Estilos/Registro.css";
import "./Estilos/Inicio.css";
import "./Estilos/ListaParques.css";
import "./Estilos/UsConfirmacion.css";
import "./Estilos/UsPerfil.css";
import "./Estilos/UsReservas.css";
import "./Estilos/UsDisponibilidadH.css";

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
import UsConfirmacion from './Componentes/UsConfirmacion';
import UsPerfil from './Componentes/UsPerfil';
import UsReservas from './Componentes/UsReservas';
import UsDisponibilidadH from './Componentes/UsDisponibilidadH';

function App() {
  return (
    <div className="App">
      <Inicio></Inicio>
      <ListaParques></ListaParques>
     <UsReservaCancha></UsReservaCancha>
     <UsConfirmacion></UsConfirmacion>
     <FormularioRegistro></FormularioRegistro>
     <UsPerfil></UsPerfil>
     <UsReservas></UsReservas>
     <UsDisponibilidadH></UsDisponibilidadH>
      <HomeAdmin></HomeAdmin>
      <AdminCancha></AdminCancha>
   
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
