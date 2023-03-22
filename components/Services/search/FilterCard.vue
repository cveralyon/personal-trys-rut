<template>
  <div>
    <li class="border-t border-gray-200 pt-2 flex"></li>
    <h4 class="type">Tipo de Servicio</h4>
    <label class="container_2">
      Actividades
      <input type="checkbox" id="Actividades" value="Actividades" @click="filtro('Actividades')" checked v-model="activity_checkbox">
      <span class="checkmark"></span>
    </label>
    <label class="container_2">
      Alojamientos
      <input type="checkbox" id="Alojamientos" value="Alojamientos" @click="filtro('Alojamientos')" checked v-model="accommodation_checkbox">
      <span class="checkmark"></span>
    </label>

    <li class="border-t border-gray-200 mt-2 pt-2 flex"></li>
    <div class="mt-2">
      <h4 class="type">Categoria</h4>
      <label
        v-for="subtype in subtypes"
        :key="subtype.id"
        class="container_2"
      >
      {{ subtype[0] }} | {{ subtype[1] }}
        <input type="checkbox" :id="subtype[0]" @click="filterSubtype(subtype)" name="subtype">
        <span class="checkmark"></span>
    </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ["Actividades", "Alojamientos"],
      subtypes: [],
      subtype: "",
      subtypeChecked: false,
      activity_checkbox: true,
      accommodation_checkbox: true,
      accommodation_list: [
        "Camping",
        "Glamping",
        "Motorhome",
        "Hostal",
        "Cabaña",
        "Lodge",
      ],
      activity_list: [
        "Kayak",
        "Buceo",
        "Paracaidismo",
        "Randonnee",
        "Snowboard",
        "Tour",
        "Windsurf",
        "Cabalgata",
        "Kitesurf",
        "Mountain Bike",
        "Bicicleta",
        "Parapente",
        "Stand Up Paddle",
        "Trail Running",
        "Canopy",
        "Montañismo",
        "Pesca",
        "Ski Acuático",
        "Surf",
        "Trekking",
        "Ski",
        "Escalada",
        "Moto Enduro",
        "Observación de animales",
        "Rafting",
        "Slackline",
        "Paintball",
        "Vela",
        "Canyoing",
        "Otros",
      ],
    };
  },
  props: ["subtypes_count"],
  methods: {
    filtro(event) {
      if (this.selected.includes(event)) {
        this.selected.splice(this.selected.indexOf(event), 1);
      } else {
        this.selected.push(event);
      }
      this.getSubtypesCount();
      document.getElementsByName("subtype").forEach((element) => {
        element.checked = false;
      });
      
    },
    getSubtypesCount() {
      this.subtypes = [];
      if (this.selected.includes("Actividades")) {
        for (let subtype of this.activity_list) {
          if (this.subtypes_count[subtype] != undefined) {
            this.subtypes.push([subtype, this.subtypes_count[subtype]]);
          }
        }
      }
      if (this.selected.includes("Alojamientos")) {
        for (let subtype of this.accommodation_list) {
          if (this.subtypes_count[subtype] != undefined) {
            this.subtypes.push([subtype, this.subtypes_count[subtype]]);
          }
        }
      }
      this.subtypes.sort();
    },
    filterSubtype(event) {
      this.$emit("filtersubtype", event);
    },
  },
  mounted() {
    this.getSubtypesCount();
  },
  computed: {
    checkbox_state() {
      if (this.accommodation_checkbox && this.activity_checkbox) {
        return "type[]=0&type[]=1";
      } else if (this.accommodation_checkbox && !this.activity_checkbox) {
        return "type[]=0";
      } else if (!this.accommodation_checkbox && this.activity_checkbox) {
        return "type[]=1";
      } else {
        return "type[]=none";
      }
    },
  },
  watch: {
    checkbox_state(new_state, old_state) {
      this.$emit("filter_type", new_state);
    },
  },
};
</script>

<style lang="scss" scoped>

/* The container */
.container_2 {
  text-align: start;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 7px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    font-size: 12px;
  }
  
}

/* Hide the browser's default checkbox */
.container_2 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 5px;
  left: 6px;
  height: 15px;
  width: 15px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
}

/* On mouse-over, add a grey background color */
.container_2:hover input ~ .checkmark {
  background-color: white;
}

/* When the checkbox is checked, add a blue background */
.container_2 input:checked ~ .checkmark {
  background-color: #f4f4f4;
  border: 0;
  height: 25px;
  width: 25px;
  top: 0;
  left: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container_2 input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container_2 .checkmark:after {
  left: 9px;
  top: 5px;
  width: 8px;
  height: 16px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.type {
  font-size: 1rem;
  font-weight: 700;
  font-family: sans-serif;
  text-align: start;
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    font-size: 0.8rem;
  }
}
</style>
