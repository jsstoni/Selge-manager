<template>
  <header>
    <nav class="menu-home">
      <ul class="container">
        <li class="logo">
          <div>S</div>
          Selge
        </li>
        <li>
          <a href="#">¿Como funciona?</a>
        </li>
        <li>
          <a href="#">Preguntas</a>
        </li>
        <ul class="ingresar">
          <li class="loggin"><a href="#" @click="usuario = !usuario">Iniciar sesión</a></li>
          <li><a href="#" class="btn-2">Registrar</a></li>
        </ul>
      </ul>
    </nav>

    <div class="container banner">
      <div class="cols">
        <div class="col-6">
          <img src="@/assets/image/ecommerce.jpg" width="170%" height="430" alt="" style="border-radius: 60px;" />
        </div>
        <div class="col-6">
          <h1>Empieza un nuevo</h1>
          <h2 class="bg">negocio Dropshipping</h2>
          <p>
            Crea tu tienda online de productos, promociona en redes sociales y
            gana por cada venta realizada.
          </p>
          <button class="btn-1">¡Empezar gratis!</button>
        </div>
      </div>
    </div>
  </header>

  <section class="container">
    <img src="@/assets/image/banner.jpg" alt="">
  </section>

  <section class="importar">
    <div class="container">
      <div class="cols">
        <div class="col-5">
          <h4>Encuentra productos en segundos</h4>
          <p>
            <i class="icon-check"></i> Agregue rápidamente productos a su tienda en línea. <br />
            <i class="icon-check"></i> Vende productos rentables más de 30 comercios en chile.
          </p>
        </div>
        <div class="col-7">
          <img src="@/assets/image/import.png" width="100%" alt="" />
        </div>
      </div>
    </div>
  </section>

  <section class="funciona">
    <div class="container">
      <h2>¿Como <strong>funciona</strong> el dropshipping?</h2>
      <div class="cols">
        <div class="col-3">
          <span>1</span>
          <p>El cliente compra en tu tienda</p>
        </div>
        <div class="col-3">
          <span>2</span>
          <p>Su pedido va directamente al proveedor</p>
        </div>
        <div class="col-3">
          <span>3</span>
          <p>Tus proveedores envían el producto al cliente</p>
        </div>
        <div class="col-3">
          <span>4</span>
          <p>Tu ganas el beneficio de la venta del producto</p>
        </div>
      </div>
    </div>
  </section>

  <section class="preguntas">
    <div class="container">
      <h3>Preguntas frecuentes</h3>
      <ul>
        <li>¿Cuando recibo mi dinero?</li>
        <li>¿Puedo vender productos de otras tienda siendo proveedor?</li>
        <li>¿Cuantos productos puedo agregar?</li>
        <li>Información sobre devoluciones</li>
        <li>Garantia de los productos</li>
      </ul>
    </div>
  </section>

  <modal-login :active="usuario" @close="usuario = false"></modal-login>
</template>
<script>
import ModalLogin from "@/components/Modal/ModalLogin.vue";
export default {
  name: "HomeView",
  components: {
    ModalLogin,
  },
  data() {
    return {
      usuario: false,
    };
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.8em;
}
header {
  overflow: auto;
  position: relative;
}

.banner {
  padding: 30px 0;
  margin: 70px auto 0 auto;
}

.banner button {
  font-size: 2em;
  margin: 20px 0 0 0;
}

.banner h1 {
  margin-top: 35px;
}

.banner h1,
.banner h2 {
  font-size: 40px;
  font-weight: 700;
}

.banner h2.bg {
  background-image: linear-gradient(
    130deg,
    rgb(131, 96, 195),
    rgb(46, 191, 145) 37%,
    rgb(0, 159, 255) 57%,
    rgba(101, 78, 163, 0.9) 16%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-home {
  overflow: auto;
  margin: 0 auto;
  padding: 15px 0;
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
}

.menu-home li.logo {
  padding: 0;
}

.menu-home li {
  float: left;
  margin: 0;
}

.menu-home ul.ingresar {
  float: right;
  margin: 0;
}

.menu-home ul.ingresar a.btn-2 {
  color: #fff !important;
}

.menu-home a {
  display: block;
  padding: 8px 15px;
}

.menu-home a.logo {
  padding: 5px 10px 3px 0;
}

.funciona {
  background: #F4F7FA;
  padding: 80px 0;
  text-align: center;
}
.funciona h2 {
  font-size: 38px;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}
.funciona strong {
  position: relative;
}
.funciona strong::before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(130deg, #8360c3, #2ebf91);
  border-radius: 8px;
}
.funciona span {
  background: #fff;
  box-shadow: 0 3px 9px 1px rgb(0 0 0 / 10%);
  display: inline-block;
  padding: 25px 40px;
  font-size: 18px;
  border-radius: 50%;
}

.importar {
  font-size: 1.3em;
  text-align: left;
  margin: 0 0 40px 0;
}
.importar h4 {
  font-weight: 700;
  margin: 80px 0 0 0;
  font-size: 2.2em;
}

.preguntas {
  padding: 60px 0;
}
.preguntas li {
  border: #e0e6ed solid 1px;
  border-radius: 8px;
  margin: 8px 0;
  padding: 10px;
}
.preguntas h3 {
  font-size: 42px;
}
</style>
