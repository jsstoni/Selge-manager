<template>
  <section class="side-content">
    <h1 class="title-main">Información sobre la tienda</h1>
    <div style="margin: 0 0 20px 0; position: relative; overflow: auto">
      <div style="width: 160px; float: left">
        <img :src="usuario.logo" width="160" height="160" alt="" />
        <div class="file">
          <label for="logo">Subir logo</label>
          <input
            type="file"
            accept="image/*"
            id="logo"
            ref="logo"
            @change="logo"
          />
        </div>
      </div>
      <h1
        style="
          float: left;
          margin: 85px 0 0 10px;
          border-bottom: #eee solid 1px;
        "
      >
        {{ usuario.nombre }}
      </h1>
      <button class="btn-2" style="margin: 85px 0 0 20px" @click="saveStore">
        Guardar
      </button>
    </div>

    <div class="tab">
      <div
        :class="{ active: active == 'general', 'tab-item': true }"
        @click.prevent="active = 'general'"
      >
        General
      </div>
      <div
        :class="{ active: active == 'banco', 'tab-item': true }"
        @click.prevent="active = 'banco'"
      >
        Cuenta bancaria
      </div>
      <div
        :class="{ active: active == 'envio', 'tab-item': true }"
        @click.prevent="active = 'envio'"
      >
        Envío
      </div>
    </div>

    <div class="panel" v-show="active == 'general'">
      <h3>Datos básicos</h3>
      <hr />
      <div class="cols">
        <div class="col-6">
          <label for="">Correo electrónico</label>
          <input type="text" v-model="usuario.email" class="form" />
        </div>
        <div class="col-6">
          <label for="">Nombre de la tienda</label>
          <input type="text" v-model="usuario.nombre" class="form" />
        </div>
        <div class="col-6">
          <label for="">RUT</label>
          <input type="text" v-model="usuario.rut" class="form" />
        </div>
        <div class="col-6">
          <label for="">Teléfono</label>
          <input type="text" v-model="usuario.phone" class="form" />
        </div>
      </div>
      <label for="">Dirección</label>
      <input type="text" class="form" v-model="usuario.direccion" />
    </div>

    <div class="panel" v-show="active == 'banco'">
      <h3>Datos bancarios</h3>
      <hr />
      <label for="">RUT destinatario</label>
      <input type="text" class="form" v-model="usuario.destino" />

      <div class="cols">
        <div class="col-6">
          <label for="">Banco</label>
          <select class="form" v-model="usuario.banco">
            <option disabled selected value="">Selecciona el Banco</option>
            <option>BANCO DE CHILE</option>
            <option>BANCO INTERNACIONAL</option>
            <option>SCOTIABANK-DESARROLLO</option>
            <option>BANCO DE CREDITO E INVERSIONES</option>
            <option>CORP-BANCA</option>
            <option>BICE</option>
            <option>HSBC BANK CHILE</option>
            <option>BANCO SANTANDER</option>
            <option>BANCO ITAU</option>
            <option>MUFG BANK, LTD.</option>
            <option>BANCO SECURITY</option>
            <option>BANCO FALABELLA</option>
            <option>BANCO RIPLEY</option>
            <option>BANCO CONSORCIO</option>
            <option>BANCO BBVA</option>
            <option>COOPEUCH</option>
            <option>PREPAGO LOS HEROES</option>
            <option>PREPAGO TENPO</option>
            <option>TAPP CAJA LOS ANDES</option>
            <option>MERCADO PAGO</option>
            <option>BANCOESTADO</option>
          </select>
        </div>

        <div class="col-6">
          <label for="">Tipo de cuenta</label>
          <select class="form" v-model="usuario.tipo">
            <option disabled selected value="">
              Selecciona Tipo de cuenta
            </option>
            <option>Cuenta Corriente</option>
            <option>Cuenta Vista</option>
            <option>Cuenta Ahorro</option>
          </select>
        </div>
      </div>

      <label for="">Número de cuenta</label>
      <input type="text" class="form" v-model="usuario.cuenta" />

      <button class="btn-2" @click="saveStore">Guardar</button>
    </div>

    <div class="panel" v-show="active == 'envio'">
      <h3>Envío</h3>
      <hr />
      <label>Tiempo de entrega (Días)</label>
      <div style="display: flex">
        <input type="number" min="1" max="30" class="form" />
        <input type="number" min="2" max="30" class="form" />
      </div>
    </div>
  </section>
</template>

<script>
import contactos from "@/api/contactos";
export default {
  name: "AjustesView",
  data() {
    return {
      usuario: {},
      active: "general",
    };
  },
  methods: {
    async datosUsuario() {
      let { error, lista } = await contactos.datosUsuario();
      if (error) this.$toast.error(error);
      else this.usuario = lista;
    },
    logo() {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.usuario.file_logo != e.target.result)
          this.usuario.file_logo = e.target.result;
        this.usuario.logo = e.target.result;
      };
      reader.readAsDataURL(this.$refs.logo.files[0]);
    },

    async saveStore() {
      let { error, mensaje } = await contactos.storeData(this.usuario);
      if (error) {
        this.$toast.error(error);
      } else this.$toast.success(mensaje);
    },
  },
  created() {
    this.datosUsuario();
  },
};
</script>

<style scoped>
.file label {
  display: inline-block;
  background: #eff1f5;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 0.8em;
}
.file input {
  display: none;
}
</style>
