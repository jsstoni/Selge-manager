import axios from "axios";
const contactos = {
  async allClients(id) {
    const clientes = await axios({
      method: "GET",
      url: "/usuario/clientes",
      params: {
        id,
      },
    });
    return clientes.data.resultado;
  },
  async allProveedor(id) {
    const clientes = await axios({
      method: "GET",
      url: "/usuario/proveedores",
      params: {
        id,
      },
    });
    return clientes.data.resultado;
  },
  async getClient(info) {
    const cliente = await axios({
      method: "POST",
      url: "/usuario/seleccionarUsuario",
      data: info,
    });
    return cliente.data.resultado;
  },
  async update(cliente) {
    const guardar = await axios({
      method: "POST",
      url: "/usuario/actualizarUsuarios",
      data: cliente,
    });
    return guardar.data.resultado;
  },
  async delete(info) {
    const borrar = await axios({
      method: "GET",
      url: "/usuario/borrar",
      params: info,
    });
    return borrar.data.resultado;
  },
  async formSearch(data, tipo) {
    const search = await axios({
      method: "GET",
      url: "/usuario/buscarFormulario",
      params: {
        q : data,
        tipo
      }
    });
    return search.data.resultado;
  },
  async datosUsuario() {
    const usuario = await axios({
      method: "GET",
      url: "/usuario/miData"
    });
    return usuario.data.resultado;
  },
  async storeData(form) {
    const tienda = await axios({
      method: "POST",
      url: "/usuario/datosTienda",
      data: form
    });
    console.log(tienda.data);
    return tienda.data.resultado;
  }
}
export default contactos;