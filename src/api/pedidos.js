import axios from "axios";
const pedidos = {
  async searchProduct(sku) {
    const producto = await axios({
      method: "GET",
      url: "/inventario/buscarSku",
      params: {
        id: sku,
      },
    });
    return producto.data.resultado;
  },
  async saveOrder(data) {
    const saved = await axios({
      method: "POST",
      url: "/pedidos/guardar",
      data: data,
    });
    return saved.data.resultado;
  },
  async history(id) {
    const historial = await axios({
      method: "GET",
      url: "/pedidos/historial",
      params: {
        page: id,
      },
    });
    return historial.data.resultado;
  },
  async orderDetails(npedido) {
    const detalles = await axios({
      method: "GET",
      url: "/pedidos/ordenDetalles",
      params: {
        id: npedido,
      },
    });
    return detalles.data.resultado;
  },
  async haveIt(form) {
    const saved = await axios({
      method: "POST",
      url: "/pedidos/enstock",
      data: form,
    });
    return saved.data.resultado;
  },
  async makeOrder(data) {
    const pedir = await axios({
      method: "POST",
      url: "/pedidos/solicitar",
      data,
    });
    return pedir.data.resultado;
  },
  async listOrder(id) {
    const ordenes = await axios({
      method: "GET",
      url: "/pedidos/listarOrdenes",
      params: {
        page: id,
      },
    });
    return ordenes.data.resultado;
  },
  /* async viewOrder(id) {
    const orden = await axios({
      method: "GET",
      url: "/pedidos/verOrden",
      params: {
        id,
      },
    });
    return orden.data.resultado;
  }, */
  async getOrder(id) {
    const pedido = await axios({
      method: "GET",
      url: "/pedidos/orden",
      params: {
        id,
      },
    });
    return pedido.data.resultado;
  },
  async confirmOrden(form) {
    const orden = await axios({
      method: "POST",
      url: "/pedidos/completarSolicitud",
      data: form
    });
    return orden.data.resultado;
  },
  async cancelProduct(id) {
    const producto = await axios({
      method: "GET",
      url: "/pedidos/cancelarProducto",
      params: {
        id
      }
    });
    return producto.data.resultado;
  },
  async searchOrder(info) {
    const search = await axios({
      method: "GET",
      url: "/pedidos/buscarOrden",
      params: {
        q: info
      }
    });
    return search.data.resultado;
  },
  async woocommerce() {
    const woo = await axios({
      method: "GET",
      url: "/aplicaciones/woocommerce"
    });
    return woo.data;
  }
}
export default pedidos;