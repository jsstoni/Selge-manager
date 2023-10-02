import axios from "axios";
const productos = {
  async allProducts(page) {
    const productos = await axios({
      method: "GET",
      url: "/inventario",
      params: {
        page,
      },
    });
    return productos.data.resultado;
  },
  async searchProduct(id) {
    const producto = await axios({
      method: "POST",
      url: "/inventario/buscarProducto",
      params: {
        id,
      },
    });
    return producto.data.resultado;
  },
  async save(data) {
    const producto = await axios({
      method: "POST",
      url: "/inventario/nuevoProducto",
      data,
    });
    return producto.data.resultado;
  },
  async update(data) {
    const producto = await axios({
      method: "POST",
      url: "/inventario/editarProducto",
      data,
    });
    return producto.data.resultado;
  },
  async remove(id) {
    const borrar = await axios({
      method: "GET",
      url: "/inventario/borrarProducto",
      params: {
        id,
      },
    });
    return borrar.data.resultado;
  },
  async existencia() {
    const existencia = await axios({
      method: "GET",
      url: "/inventario/existencia",
    });
    return existencia.data.resultado;
  },
  async viewStock(id) {
    const existencia = await axios({
      method: "GET",
      url: "/inventario/verExistencia",
      params: {
        id,
      },
    });
    return existencia.data.resultado;
  },
  async deleteStock(id) {
    const borrar = await axios({
      method: "GET",
      url: "/inventario/borrarExistencia",
      params: {
        id,
      },
    });
    return borrar.data.resultado;
  },
  async saveStock(data) {
    const saved = await axios({
      method: "POST",
      url: "/inventario/actualizarExistencia",
      data,
    });
    return saved.data.resultado;
  },
  async formSearch(data) {
    const search = await axios({
      method: "GET",
      url: "/inventario/buscarFormulario",
      params: {
        q : data
      }
    });
    return search.data.resultado;
  },
  async formSearchStock(data) {
    const search = await axios({
      method: "GET",
      url: "/inventario/buscarStock",
      params: {
        q : data
      }
    });
    return search.data.resultado;
  },
  async dropshipping() {
    const productos = await axios({
      method: "GET",
      url: "/marketplace"
    })
    return productos.data.resultado;
  },
  async importProduct(id) {
    const productos = await axios({
      method: "POST",
      url: "/marketplace/importar",
      data: {
        id
      }
    })
    return productos.data.resultado;
  }
};

export default productos;