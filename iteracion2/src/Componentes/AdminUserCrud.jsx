import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";

const AdimUserCrud = () => {
  const parques = [
    { nombre: "Jorge Ullauri" },
    { nombre: "Jhuliet Conza" },
  ];
  const item = [
    { nombre: "Usuarios" },
    { accion: "Acción" }
  ];

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <TablasTodoAdmin items={item} data={parques}></TablasTodoAdmin>
    </div>
  );

}

export default AdimUserCrud;