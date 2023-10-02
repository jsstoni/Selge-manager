<template>
  <section class="side-content">
    <h1 class="title-main">Reportes</h1>
    <div v-if="loader">
      <div class="lds-dual-ring"></div>
      <h3 v-if="!loader"><i class="icon-alerta"></i> {{ error }}</h3>
    </div>
    <div class="cols" v-else>
      <div class="col-8" style="height: 200px">
        <div class="panel">
          <Bar
            :chart-data="chartData"
            :chart-options="{ responsive: true }"
            height="150"
          />
        </div>
      </div>

      <div class="col-4">
        <div class="panel">
          <h3>Total ventas</h3>
          <p>{{ $precioFormat(ganas) }} CLP</p>
        </div>

        <div class="panel">
          <h3>Ganancias promedio</h3>
          <p>{{ $precioFormat(promedio) }} CLP</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import reportes from "@/api/reportes";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "ReportesView",
  components: { Bar },
  data() {
    return {
      loader: true,
      chartData: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [],
      },
      ganas: 0,
      promedio: 0,
    };
  },
  methods: {
    async reportes() {
      let { data, ganancias, error } = await reportes.reports();
      this.loader = false;
      if (error) {
        this.$toast.error(error)
      }else {
        this.chartData.datasets.push({
          label: "Pedidos",
          backgroundColor: "#345",
          data: data,
        });
        this.ganas = ganancias[1].total;
        this.promedio = ganancias[0].total;
      }
    },
  },
  created() {
    this.reportes();
  },
};
</script>
