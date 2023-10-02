<template>
  <div>
    <ul class="pagination" v-if="filtrarNumeros.length > 1">
      <li v-for="(numero, index) in filtrarNumeros" :key="index">
        <router-link :to="obtenerPagina(numero)" :key="numero">{{
          numero
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginacionItem",
  props: ["paginas", "actual", "name"],
  data() {
    return {
      paginar: null,
    };
  },
  methods: {
    PaginarLista() {
      let paginas = this.paginas;
      let actual = parseInt(this.actual);
      let mostrar = Math.floor(8 / 2);
      let empezar = actual - mostrar;
      let terminar = actual + mostrar;
      if (empezar < 1) {
        terminar += 1 - empezar;
        empezar = 1;
      }
      if (terminar > paginas) {
        empezar -= terminar - paginas;
        terminar = paginas;
      }
      if (empezar < 1) empezar = 1;
      return { empezar, terminar };
    },
    obtenerPagina: function (id) {
      return {
        name: this.name,
        params: { page: id },
      };
    },
  },
  computed: {
    filtrarNumeros() {
      let paginador = this.PaginarLista();
      let empezar = paginador.empezar;
      let terminar = paginador.terminar;
      let numeros = new Array(terminar - empezar + 1)
        .fill()
        .map((d, i) => i + empezar);
      return numeros;
    },
  },
};
</script>