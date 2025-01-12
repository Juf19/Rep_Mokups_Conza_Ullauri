import React from "react";
import { useNavigate } from "react-router-dom";
import ItemHeader from "./ItemHeader";
import ItemBajoHeader from "./ItemBajoHeader";
import SelectorCancha from "./SelectorCancha";
import MapContainer from "./MapContainer";

const texto = [{ nombre: "LA CAROLINA" }];

const UsSeleccionarCancha = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <ItemHeader />
      <ItemBajoHeader nombre={texto[0].nombre} />
      <div className="app-container">
        <MapContainer />
        <button
          className="cancha"
          style={{ top: "30%", left: "53%" }}
          onClick={() => navigate("/reserva")}
        >
          C-F1 ⚽
        </button>
        <button
          className="cancha"
          style={{ top: "25%", left: "47%" }}
          onClick={() => navigate("/reserva")}
        >
          C-F2 ⚽
        </button>
        <button
          className="cancha"
          style={{ top: "55%", left: "50%" }}
          onClick={() => navigate("/reserva")}
        >
          C-F3 ⚽
        </button>
        <button
          className="cancha"
          style={{ top: "60%", left: "35%" }}
          onClick={() => navigate("/reserva")}
        >
          C-B1 🏀
        </button>
      </div>
    </div>
  );
};

export default UsSeleccionarCancha;
