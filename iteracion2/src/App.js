import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import "./Estilos/NuevoParque.css";
import "./Estilos/NuevoUsuario.css";
import "./Estilos/Registro.css";
import "./Estilos/Inicio.css";
import "./Estilos/ListaParques.css";
import "./Estilos/UsConfirmacion.css";
import "./Estilos/UsPerfil.css";
import "./Estilos/UsReservas.css";
import "./Estilos/UsDisponibilidadH.css";
import "./Estilos/UsReservarCancha.css";
import "./Estilos/BotonesCrud.css";

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
import AdminPerfil from './Componentes/AdminPerfil';
import AdminNuevaCancha from './Componentes/AdminNuevaCancha';
import UsSeleccionarCancha from './Componentes/UsSeleccionarCancha';
import AdminParqueCrud from './Componentes/AdminParqueCrud';
import AdminUserCrud from './Componentes/AdminUserCrud';
import AdminCanchasenParqueCrud from './Componentes/AdminCanchasenParqueCrud';
import AdminUsuarioEditar from './Componentes/AdminUsuarioEditar';
import AdminUserDetalle from './Componentes/AdminUserDetalle';
import ActualizarParque from './Componentes/ActualizarParque';
import AddParque from './Componentes/AddParque';
import AdminParqueDetalle from './Componentes/AdminParqueDetalle';
import AdminActualizarCancha from './Componentes/AdminActualizarCancha';
import AdminAddCancha from './Componentes/AdminAddCancha';
import AdminCanchaDetalle from './Componentes/AdminCanchaDetalle';



function App() {

  
  return (
    <div className="App">
     <ParqueNuevo></ParqueNuevo>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomeAdmin/>}></Route>
        <Route path={"/Usuario"} element={<AdminUserCrud></AdminUserCrud>}></Route>
        <Route path={"/nuevoUsuario"} element={<UsuarioNuevo/>}></Route>
        <Route path={"/EditarUsuario/:id"} element={<AdminUsuarioEditar></AdminUsuarioEditar>}></Route>
        <Route path={"/DetalleUsuario/:id"} element={<AdminUserDetalle />} />
        <Route path={"/Parque"} element={<AdminParqueCrud></AdminParqueCrud>}></Route>
        <Route path={"/parques/detalle/:id"} element={<AdminParqueDetalle />}/>
        <Route path={"/parques/new"} element={<AddParque/>}></Route>
        <Route path={"/Parque/canchas/:id"} element={<AdminCanchasenParqueCrud></AdminCanchasenParqueCrud>}></Route>
        <Route path={"/parques/update/:id"} element={<ActualizarParque />}></Route>
        <Route path={"/canchas/update/:id"} element={<AdminActualizarCancha></AdminActualizarCancha>}></Route>
        <Route path={"/canchas/new"} element={<AdminAddCancha/>}></Route>
        <Route path={"/canchas/detalle/:id"} element={<AdminCanchaDetalle />}/>

      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

/*<Inicio></Inicio>
<ListaParques></ListaParques>
<UsSeleccionarCancha></UsSeleccionarCancha>
<UsReservaCancha></UsReservaCancha>
<UsConfirmacion></UsConfirmacion>
<FormularioRegistro></FormularioRegistro>
<UsPerfil></UsPerfil>
<UsReservas></UsReservas>
<UsDisponibilidadH></UsDisponibilidadH>
<HomeAdmin></HomeAdmin>
<AdminCancha></AdminCancha>
<AdminNuevaCancha></AdminNuevaCancha>
<AdminPerfil></AdminPerfil>
<NuevoParque></NuevoParque>
<Nuevacancha></Nuevacancha>
<NuevoUsuario></NuevoUsuario>
<EditarCancha></EditarCancha>
<UsuarioNuevo></UsuarioNuevo>
<ParqueNuevo></ParqueNuevo>
<AdminParqueCrud></AdminParqueCrud>
<AdminUserCrud></AdminUserCrud>
<AdminCanchasenParqueCrud></AdminCanchasenParqueCrud> */

export default App;
