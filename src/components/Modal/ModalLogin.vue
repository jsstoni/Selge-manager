<template>
  <Transition name="modal">
    <div class="modal" v-if="active">
      <div class="modal-content col-3">
        <form action="" @submit.stop.prevent="iniciar" id="login">
          <label for="usuario">Usuario</label>
          <input type="text" class="form" v-model="usuario" id="usuario" />

          <label for="password">Contraseña</label>
          <input
            type="password"
            class="form"
            v-model="password"
            id="password"
          />

          <div class="modal-foot">
            <button type="button" @click.stop.prevent="cerrar">Cancelar</button>
            <button type="submit" class="btn-2">Guardar</button>
          </div>
          <p>{{ mensaje }}</p>
        </form>
      </div>
    </div>
  </Transition>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "ModalLogin",
  props: ["active"],
  data() {
    return {
      usuario: null,
      password: null,
      mensaje: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async iniciar() {
      this.$loader(document.querySelector("#login"));
      const data = {
        usuario: this.usuario,
        password: this.password,
      };
      const login = await axios({ url: "/usuario/login", method: "POST", data });
      let { error, mensaje, token, nombre } = login.data.resultado;
      if (error) {
        this.mensaje = error;
      } else {
        this.mensaje = mensaje;
        await this.login({ token, nombre });
        this.$router.push({ name: "allproducts" });
      }
    },
    cerrar() {
      this.$emit("close");
    },
  },
};
</script>