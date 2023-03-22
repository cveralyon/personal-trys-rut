<template>
  <header>
    <nav class="navbar_2">
      <nuxt-link to="/" title="Home">
        <img
          src="/powered_by_rutero.png"
          alt="rutero-logo"
          style="justify-content: start"
          title="Rutero"
          width="170"
        />
      </nuxt-link>

      <ul class="nav-menu">
        <li class="dropdown">
          <button class="dropbtn nav-link" @click="dropdown('destinos')">
            DESTINOS
            <svg
              enable-background="new 0 0 29 14"
              height="6px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 29 14"
              width="29px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin-top: 10px"
            >
              <polygon fill="#231F20" points="0.15,0 14.5,14.35 28.85,0 " />
            </svg>
          </button>
          <div class="dropdown-content with-scroll" id="destinos">
            <a
              v-for="region in regiones"
              :key="region.id"
              :href="region.link"
              class="link"
              :title="region.name_region"
            >
              {{ region.name_region }}
            </a>
          </div>
        </li>
        <li class="dropdown">
          <button class="dropbtn nav-link" @click="dropdown('actividades')">
            ACTIVIDADES
            <svg
              enable-background="new 0 0 29 14"
              height="6px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 29 14"
              width="29px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin-top: 10px"
            >
              <polygon fill="#231F20" points="0.15,0 14.5,14.35 28.85,0 " />
            </svg>
          </button>
          <div class="dropdown-content with-scroll" id="actividades">
            <a
              v-for="actividad in actividades"
              :key="actividad.id"
              :href="actividad.link"
              class="link"
              :title="actividad.name"
            >
              {{ actividad.name }}
            </a>
          </div>
        </li>
        <div class="lupa-desktop" >
          <div @click="searchbarShow=!searchbarShow">
            <svg xmlns="http://www.w3.org/2000/svg" id="lupa-icon-id" class="lupa-icon" width="24px" height="24px" data-name="Capa 1" viewBox="0 0 95.2 99.82"><path class="cls-1" d="M90.66,99.82A4.56,4.56,0,0,1,87.4,98.4L63.15,73.54a4.54,4.54,0,0,1,6.52-6.31l24.25,25a4.48,4.48,0,0,1-3.26,7.64Z"/><path class="cls-1" d="M41.46,82.1A41.28,41.28,0,0,1,0,41.05C-.1,18.44,18.54,0,41.46,0A41.27,41.27,0,0,1,82.91,41.05c0,22.61-18.64,41.05-41.45,41.05Zm0-73C23.53,9.07,9,23.43,9,41.05s14.57,32,32.5,32,32.39-14.36,32.39-32-14.57-32-32.39-32Z"/></svg>
          </div>
        </div>
      </ul>
      
      <div class="lupa-mobile" >
        <div @click="searchbarShow=!searchbarShow">
          <svg xmlns="http://www.w3.org/2000/svg" id="lupa-icon-id" class="lupa-icon" width="24px" height="24px" data-name="Capa 1" viewBox="0 0 95.2 99.82"><path class="cls-1" d="M90.66,99.82A4.56,4.56,0,0,1,87.4,98.4L63.15,73.54a4.54,4.54,0,0,1,6.52-6.31l24.25,25a4.48,4.48,0,0,1-3.26,7.64Z"/><path class="cls-1" d="M41.46,82.1A41.28,41.28,0,0,1,0,41.05C-.1,18.44,18.54,0,41.46,0A41.27,41.27,0,0,1,82.91,41.05c0,22.61-18.64,41.05-41.45,41.05Zm0-73C23.53,9.07,9,23.43,9,41.05s14.57,32,32.5,32,32.39-14.36,32.39-32-14.57-32-32.39-32Z"/></svg>
        </div>
      </div>
      <div class="hamburger-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
    <div v-if="searchbarShow" class="filtroGRIS">
      <div class="searchbar">
        <div class="separador"></div>
        <br>
        <SearchBoxBar />
        <br>
      </div>
      <div class="searchbarMobile">
        <div class="separador"></div>
        <br>
        <SearchBox />
        <br>
      </div>
      <div id="vacio" style="height: inherit;" @click="searchbarShow=false" >

      </div>


    </div>
    
  </header>
</template>

<script>
import SearchBoxBar from '@/components/SearchBoxBar/SearchBoxBar.vue'
import SearchBox from '@/components/SearchBox/SearchBox.vue'
import { SearchIcon, MapIcon, MapPinIcon } from "vue-feather-icons";

export default {
  name: 'AppHeader',

  data () {
    return {
      regiones: [],
      admin: false,
      actividades: [],
      searchbarShow: false,
    }
  },
  components: {
    SearchBoxBar,
    SearchIcon,
    SearchBox,
  },
  watch: {
    searchbarShow(newval) {
      if(newval === true){
        //cambiar el color de llenado de la clase lupa-icon
        document.getElementById('lupa-icon-id').style.fill = '#33aca6'
      }else{
        document.getElementById('lupa-icon-id').style.fill = '#dadada'
      }
      
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/");
    },
    dropdown(e) {
      if (e === "destinos") {
        document.getElementById("destinos").classList.toggle("show");
        if (document.getElementById("actividades").classList.contains("show")) {
          document.getElementById("actividades").classList.remove("show");
        } else if (
          document.getElementById("user").classList.contains("show_2")
        ) {
          document.getElementById("user").classList.remove("show_2");
        } else if (
          document.getElementById("user_login").classList.contains("show_2")
        ) {
          document.getElementById("user_login").classList.remove("show_2");
        }
      } else if (e === "actividades") {
        document.getElementById("actividades").classList.toggle("show");
        if (
          document.getElementById("destinos").classList.contains("show")
        ) {
          document.getElementById("destinos").classList.remove("show");
        } else if (
          document.getElementById("user").classList.contains("show_2")
        ) {
          document.getElementById("user").classList.remove("show_2");
        } else if (
          document.getElementById("user_login").classList.contains("show_2")
        ) {
          document.getElementById("user_login").classList.remove("show_2");
        }
      } else if (e === "user") {
        document.getElementById("user").classList.toggle("show_2");
        if (
          document.getElementById("destinos").classList.contains("show")
        ) {
          document.getElementById("destinos").classList.remove("show");
        } else if (
          document.getElementById("actividades").classList.contains("show")
        ) {
          document.getElementById("actividades").classList.remove("show");
        }
      } else if (e === "user_login") {
        document.getElementById("user_login").classList.toggle("show_2");
        if (
          document.getElementById("destinos").classList.contains("show")
        ) {
          document.getElementById("destinos").classList.remove("show");
        } else if (
          document.getElementById("actividades").classList.contains("show")
        ) {
          document.getElementById("actividades").classList.remove("show");
        }
      }
    },
    async getRegions() {
      const response = await this.$axios.$get("/api/v1/regions");
      this.regiones = response;
      for (let i = 0; i < this.regiones.length; i++) {
        this.regiones[
          i
        ].link = `/search?Service=${this.regiones[i].name_region}&country=chile`;
      }
      const response_2 = await this.$axios.$get("/api/v1/services/subtypes");
      this.subtypes = response_2;
      for (let i = 0; i < this.subtypes.length; i++) {
        var subt = {};
        subt.name = this.subtypes[i];
        subt.link = `/search?Service=${this.subtypes[i]}&country=chile`;
        this.actividades.push(subt);
      }
    },
  },
  mounted() {
    this.getRegions();
    const hamburger = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    const profileMenu = document.querySelector(".profile-menu");
    hamburger.addEventListener("click", () => {
      profileMenu.classList.toggle("active");
    });
    if (this.$auth.loggedIn) {
      if (this.$auth.user.type === "admin") {
        this.admin = true;
      } else {
        this.admin = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
img {
  margin: 0;
  display: block;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 99;
  min-height: 80px;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #212529;
}
.lupa-mobile {
  display: none;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
  }
}

.lupa-desktop {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.separador {
  width: 100%;
  height: 0.5px;
  background-color: #212529;
  @media screen and (max-width: 768px) {
      margin-bottom: -12px;  
  }
}
.filtroGRIS {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f9faba;
  z-index: -1;
  display: block;
  justify-content: center;
  align-items: center;
  }
.lupa-icon:hover {
  cursor: pointer;
  fill:#33aca6;
}
.lupa-icon {
  fill:#dadada;
  @media screen and (max-width: 768px) {
    height: 32px;
    width: 32px;
  }
}
.searchbar {
  width: 100%;
  display: flex;
  background-color: white;
  padding: 0 7.5vw;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.searchbarMobile {
  display: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    background-color: white;
    padding: 0 7.5vw;
    flex-direction: column;
  }
}
.navbar_2 {
  min-height: 80px;
  display: flex;
  align-items: center;
  padding: 0 7.5vw;
  font-weight: 600;
  justify-content: space-between !important;
  @media screen and (max-width: 791px) and (min-width: 768px) {
    padding: 0 8px;
  }
}
.nav-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}
.profile-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-link {
  cursor: pointer;
  transition: 0.7s ease;
  @media screen and (max-width: 768px) {
    padding: 0.7em;
  }
}
.nav-link:hover {
  @media screen and (min-width: 768px) {
    color: #33aca6;
  }
}
.hamburger-menu {
  display: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 32px;
  height: 5px;
  margin: 7px auto;
  transition: all 0.3s ease;
  background-color: #212529;
  border-radius: 50px;
}

%dd-no-scroll {
  display: grid;
  margin-left: -75px;
  padding: 7px;
  max-height: 30rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.dropdown:hover .with-scroll {
  overflow: scroll;
}

.dropdown:hover .dropdown-content {
  @extend %dd-no-scroll;
}

.dropbtn {
  cursor: pointer;
  font-size: 16px;
  border: none;
  outline: none;
  padding: 14px 0px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  display: inline-flex;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 270px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: center;
  @media screen and (max-width: 768px) {
    min-width: 160px;
  }
}

.show {
  display: none;
  margin-left: -60px;
  padding: 7px;
  @media screen and (max-width: 768px) {
    display: grid !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    width: 90% !important;
  }
}
.show_2 {
  display: none;
  margin-left: -26px;
  padding: 7px;
  @media screen and (max-width: 768px) {
    display: grid !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    width: 90% !important;
  }
}
.link {
  padding: 4px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
}
.link:hover {
  color: #33aca6;
}
@media screen and (max-width: 1025px) {
  .hamburger-menu {
    padding-left: 8px;
    display: block;
    margin-left: -4rem;

  }
  .hamburger-menu.active .bar:nth-child(2) {
    opacity: 0;
    margin: 3px auto;
  }
  .hamburger-menu.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
    margin: 3px auto;
  }
  .hamburger-menu.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
    margin: 3px auto;
  }
  .nav-menu,
  .profile-menu {
    position: fixed;
    right: -100%;
    padding-top: 70px;
    top: 0;
    gap: 0;
    flex-direction: column;
    background-color: #fff;
    width: 60%;
    text-align: center;
    transition: 0.3s;
    min-height: 100vh;
  }
  .nav-menu.active {
    right: 0;
    position: absolute;
    display: block;
    background-color: darkgray;
  }
  .profile-menu.active {
    display: block;
    right: 0;
    margin-top: 60vh;
    position: fixed;
    background-color: darkgray;
  }
}
</style>
