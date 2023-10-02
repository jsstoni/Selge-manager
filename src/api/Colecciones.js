import axios from "axios";
const Colecciones = {
  async lista() {
    const lista = await axios({
      method: "GET",
      url: "/colecciones",
    });
    return lista.data.resultado;
  },
  async crear(info) {
    const crear = await axios({
      method: "POST",
      url: "/colecciones/crear",
      data: info,
    });
    return crear.data.resultado;
  },
  async borrar(id) {
    const borrar = await axios({
      method: "POST",
      url: "/colecciones/borrar",
      data: { id },
    });
    return borrar.data.resultado;
  },
};
export default Colecciones;
