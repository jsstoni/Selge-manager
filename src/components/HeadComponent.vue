<template>
  <header class="aside">
    <ul>
      <li>
        <a href="#">Billetera</a>
      </li>
      <ul class="header-user">
        <li>
          <a href="#"><i class="icon-notificacion"></i> <span>0</span></a>
        </li>
        <li class="drop">
          <a href="#">{{ userName }}</a>
          <ul>
            <li><a href="#" @click.prevent="logout">Salir</a></li>
          </ul>
        </li>
      </ul>
    </ul>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeadComponent",
  methods: {
    async logout() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({ userName: "nickName" }),
  },
};
</script>

<style scoped>
header {
  padding: 0 20px;
  /*box-shadow: 0 0 9px rgb(0, 0, 0, 15%);*/
  background: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1;
}

header ul {
  margin: 0;
}

header ul li {
  float: left;
}

header ul li.logo img {
  margin: 18px 20px 0 0;
  width: 85px;
  height: 24px;
}

header ul a {
  display: block;
  padding: 15px;
  color: #676769;
}

header ul a span {
  padding: 3px;
  background: blue;
  font-size: 0.8em;
  border-radius: 8px;
  color: #fff;
  margin: -10px 0 0 0;
  position: absolute;
}

ul.header-user a:before {
  content: "";
  background: #ddd;
  width: 1px;
  height: 18px;
  position: relative;
  float: left;
  margin: 6px 0 0 -15px;
}

header i {
  font-size: 1.4em;
  display: inline-block;
  vertical-align: middle;
  margin: -4px 0 0 0;
}

header ul ul {
  float: right;
  border: none;
  margin: 0;
}

header ul li.drop {
  position: relative;
}
header ul li.drop ul {
  display: none;
  position: absolute;
  right: 0;
  background: #fff;
  box-shadow: 0 0 3px #ddd;
  width: 140px;

}
header ul li.drop ul li {
  float: none;
}
header ul li.drop ul a {
  color: #555;
  padding: 15px;
}
header ul li.drop ul a:before {
  display: none;
}
header ul li.drop:hover ul {
  display: block;
}
</style>