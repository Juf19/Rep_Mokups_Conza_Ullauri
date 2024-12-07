import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";

const AdimUserCrud = () => {
  const usuarios = [
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
      <TablasTodoAdmin items={item} data={usuarios}></TablasTodoAdmin>
    </div>
  );

}

export default AdimUserCrud;