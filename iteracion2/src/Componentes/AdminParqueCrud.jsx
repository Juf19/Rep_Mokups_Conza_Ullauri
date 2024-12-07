import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";

const AdimParqueCrud = () => {
  const parques = [
    { nombre: "La Carolina" },
    { nombre: "Inglés" },
    { nombre: "Alameda" }
  ];

  const item = [
    { nombre: "Parques" },
    { accion: "Acción" }
  ];

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <TablasTodoAdmin items={item} data={parques} showCanchasButton={true} />
    </div>
  );

}

export default AdimParqueCrud;