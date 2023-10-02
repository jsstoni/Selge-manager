const Helper = {
  install(app, options) {
    options;
    app.config.globalProperties.$precioFormat = (numb) => {
      return (parseInt(numb)).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
      });
    },
      app.config.globalProperties.$sumar = (obj, id) => {
        return obj.reduce((acc, value) => acc = acc + value[id], 0);
      },
      app.config.globalProperties.$filterByID = (obj, id, value) => {
        return obj.filter(x => x[id] == value);
      },
      app.config.globalProperties.$encontrarIndice = (obj, id) => {
        return obj.findIndex((x) => x.ID == id)
      },
      app.config.globalProperties.$analizarSKU = (obj) => {
        return obj.map((item) => {
          item.atributos = item.sku == "P.E" ? [] : typeof item.atributos != "object" ? JSON.parse(item.atributos) : item.atributos;
          return item;
        });
      },
      app.config.globalProperties.$analizarOpciones = (obj) => {
        return obj.map((item) => {
          item.opciones = JSON.parse(item.opciones);
          return item;
        });
      },
      app.config.globalProperties.$idEstado = (id) => {
        let estados = [
          { title: "En espera", color: "#f1c40f", id: 1 },
          { title: "Completado", color: "#2980b9", id: 2 },
          { title: "En despacho", color: "#ff7d7d", id: 3 },
          { title: "Enviado", color: "#27ae60", id: 4 },
          { title: "Reembolsado", color: "#d35400", id: 5 },
        ];
        let r = estados.filter(x => x.id == id);
        return r[0];
      },
      app.config.globalProperties.$categoria = (id) => {
        let categoria = [
          { id: "C01", title: "Arte" },
          { id: "C02", title: "Librería" },
          { id: "C03", title: "Automotor" },
          { id: "C04", title: "Belleza y Cuidado Personal" },
          { id: "C05", title: "Celulares y Telefonía" },
          { id: "C06", title: "Computación" },
          { id: "C07", title: "Consolas y Videojuegos" },
          { id: "C08", title: "Electrodomésticos" },
          { id: "C09", title: "Herramientas" },
          { id: "C10", title: "Hogar y Muebles" },
          { id: "C11", title: "Instrumentos Musicales" },
          { id: "C12", title: "Juegos y Juguetes" },
          { id: "C13", title: "Vestuario y Calzado" }
        ]
        let r = categoria.find(x => x.id == id);
        return r['title'];
      }
  }
};
export default Helper;