<template>
  <form class="reserve-form">
    <small class="text-gray-700 lowercase"> Desde </small>
    <h3>
      <span class="text-xl">
        <strong
          class="text-gray-900 block"
          style="font-size: 2rem; margin-bottom: 2rem"
        >
          {{
            fares
              ? this.toCLP(this.productSelected.price_adult)
              : this.products
              ? this.min_price
              : "-"
          }}
        </strong>
      </span>
    </h3>

    <div>
      <label for="servicio" class="form-label"><b>Producto</b></label>
      <select
        id="servicio"
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        v-model="productSelected"
        @change="updateFares()"
      >
        <option>Seleccione un producto</option>
        <option
          v-for="producto in active_products(products)"
          :key="producto.id"
          :value="producto"
        >
          {{ producto.name }}
        </option>
      </select>
    </div>
    <div v-if="this.productSelected.tipo_agenda === 3">
      <HourPicker @obtainDateRange="obDateHour"></HourPicker>
    </div>
    <div v-if="this.productSelected.tipo_agenda === 2">
      <DayPicker @obtainDateRange="obDateDay"></DayPicker>
    </div>
    <div v-if="this.productSelected.tipo_agenda === 0">
      REVERAS NO DISPONIBLES POR EL MOMENTO.
    </div>
    <div v-if="this.productSelected.tipo_agenda === 1">
      <DatePicker @obtainDateRange="obDateRange"></DatePicker>
    </div>
    <div v-if="fares" class="cant-personas relative flex-grow">
      <div style="width: -webkit-fill-available">
        <label for="servicio" class="form-label"><b>Adultos</b></label>
        <select
          id="servicio"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="adults"
          @change="updateFares()"
        >
          <option v-for="i in adultsOptions" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
      </div>
      &nbsp;
      <div style="width: -webkit-fill-available">
        <label for="servicio" class="form-label"
          ><b>Niños</b>
          <b class="boldninos">(2 a 11 años)</b>
        </label>
        <select
          id="servicio"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="childs"
          @change="updateFares()"
        >
          <option v-for="i in childOptions" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
      </div>
    </div>
    <div
      v-if="fares"
      style="
        margin-top: -13px;
        font-size: 13px;
        margin-bottom: 6px;
        margin-left: 3px;
      "
    >
      <span v-if="min_people != 1"> Minimo {{ min_people }} personas </span>
      <span v-if="min_people != 1 && max_people != 30"> - </span>
      <span v-if="max_people != 30"> Maximo {{ max_people }} personas </span>
    </div>
    <div class="px-4 mt-4 text-md md:text-xl text-right text-gray-700">
      <ul v-if="fares && fares != null">
        <div v-if="fares.adults != 0">
          <li>
            <span>{{
              this.plural(fares.adults ? fares.adults : 0, "adulto") +
              " x " +
              this.toCLP(this.productSelected.price_adult)
            }}</span>
          </li>
        </div>
        <div v-if="fares.childs != 0">
          <li>
            <span>{{
              this.plural(fares.childs ? fares.childs : 0, "niño") +
              " x " +
              this.toCLP(this.productSelected.price_child)
            }}</span>
          </li>
        </div>
        <div v-if="this.productSelected.tipo_agenda === 1">
          <li style="margin-top: -1rem">
            <span>{{ "___________________" }}</span>
          </li>
          <li>
            <span>{{
              this.toCLP(fares.totalPriceNight ? fares.totalPriceNight : 0)
            }}</span>
          </li>
          <li>
            <span>{{ "x " + this.plural(fares.nights, "noche") }}</span>
          </li>
        </div>
        <li style="margin-top: -1rem">
          <span>{{ "___________________" }}</span>
        </li>

        <li>
          <strong>Total:&nbsp;</strong>
          <strong class="text-gray-900">{{
            this.toCLP(fares.totalPrice ? fares.totalPrice : 0)
          }}</strong>
        </li>
      </ul>
    </div>
    <div class="phoneButton">
      <button
        type="button"
        :disabled="
          !fares ||
          isLoading ||
          fares.totalPrice == 0 ||
          isNaN(fares.totalPrice)
        "
        class="submit p-4 flex-1 text-white font-bold rounded-md"
        @click="goTo_ReserveSummary()"
        id="reserve-button"
      >
        Reservar
      </button>
    </div>
  </form>
</template>

<script>
import DatePicker from "./DatePicker";
import HourPicker from "./HourPicker";
import DayPicker from "./DayPicker";
import { dateStr, plural, toCLP } from "@/plugins/helpers";

export default {
  components: {
    DatePicker,
    HourPicker,
    DayPicker,
  },
  props: ["products", "isActivity", "min_price"],
  data() {
    return {
      dateRange: {
        start: null,
        end: null,
      },
      adultsOptions: [0],
      childOptions: [0],
      productSelected: "Seleccione un producto",
      objectProduct: {},
      childs: 0,
      adults: 0,
      fares: null,
      isLoading: false,
      priceChild: null,
      priceAdult: null,
      min_people: 1,
      max_people: 30,
    };
  },
  computed: {
    dateStr: () => dateStr,
    plural: () => plural,
    toCLP: () => toCLP,
  },
  watch: {
    productSelected() {
      if (this.productSelected == "Seleccione un producto") {
        this.fares = null;
        this.childs = 0;
        this.adults = 0;
      } else {
        this.Range_people();
      }
    },
    adults() {
      this.Range_child();
    },
    childs() {
      this.Range_adult();
    },
  },
  methods: {
    active_products(products) {
      return products.filter((prod) => prod.status == 1);
    },
    getY: () => window.scrollY,
    obDateRange(args) {
      this.dateRange = args;
      this.updateFares();
    },
    obDateHour(args) {
      this.dateRange.start = args;
      this.updateFares();
    },
    obDateDay(args) {
      this.dateRange.start = args;
      this.updateFares();
    },
    PasFares() {
      return {
        name: this.fares,
      };
    },
    goTo_ReserveSummary() {
      if (this.childs + this.adults < this.min_people) {
        alert("No puede reservar menos de " + this.min_people + " personas");
        // window.location.reload();
      } else {
        this.$emit("obtainNewStep", 2);
        this.fares.priceAdult = this.priceAdult;
        this.fares.priceChild = this.priceChild;
        this.fares.tipo_agenda = this.productSelected.tipo_agenda;
        this.$emit("obtainFares", this.fares);
      }
    },
    Range_people() {
      this.adultsOptions = [0];
      this.childOptions = [0];
      this.min_people = 1;
      this.max_people = 30;
      if (this.productSelected.min_people != 0) {
        this.min_people = this.productSelected.min_people;
      }
      if (this.productSelected.max_people != 0) {
        this.max_people = this.productSelected.max_people;
      }
      for (let i = 1; i <= this.max_people; i++) {
        this.adultsOptions.push(i);
        this.childOptions.push(i);
      }
    },
    Range_child() {
      this.childOptions = [];
      var max = this.max_people - this.adults;
      var min = this.min_people - this.adults;
      if (min < 0) {
        min = 0;
      }
      for (let i = min; i <= max; i++) {
        this.childOptions.push(i);
      }
    },
    Range_adult() {
      this.adultsOptions = [];
      var max = this.max_people - this.childs;
      var min = this.min_people - this.childs;
      if (min < 0) {
        min = 0;
      }
      for (let i = min; i <= max; i++) {
        this.adultsOptions.push(i);
      }
    },
    updateFares() {
      if (this.productSelected.tipo_agenda != 1) {
        this.dateRange.end = this.dateRange.start;
      }
      this.$nextTick(async () => {
        if (
          this.productSelected == "Seleccione un producto" ||
          !this.dateRange.start ||
          !this.dateRange.end
        ) {
          this.fares = null;
          return;
        }
        this.priceChild = this.productSelected.price_child
          ? this.productSelected.price_child
          : this.productSelected.price_adult;
        this.priceAdult = this.productSelected.price_adult;
        this.isLoading = true;
        var minutos =
          this.dateRange.start.getMinutes() < 10
            ? "0" + this.dateRange.start.getMinutes()
            : this.dateRange.start.getMinutes();
        if (this.productSelected.tipo_agenda == 1) {
          this.fares = {
            productId: this.productSelected.id,
            productName: this.productSelected.name,
            from: this.dateStr(this.dateRange.start),
            to: this.dateStr(this.dateRange.end),
            nights:
              (this.dateRange.end.getTime() - this.dateRange.start.getTime()) /
              (1000 * 60 * 60 * 24),
            childs: parseInt(this.childs),
            adults: parseInt(this.adults),
            totalPriceNight:
              this.adults * parseFloat(this.productSelected.price_adult) +
              this.childs * this.priceChild,
            totalPrice:
              (this.adults * parseFloat(this.productSelected.price_adult) +
                this.childs * this.priceChild) *
              ((this.dateRange.end.getTime() - this.dateRange.start.getTime()) /
                (1000 * 60 * 60 * 24)),
          };
        } else {
          this.fares = {
            productId: this.productSelected.id,
            productName: this.productSelected.name,
            from: this.dateStr(this.dateRange.start),
            to: null,
            nights: null,
            childs: parseInt(this.childs),
            adults: parseInt(this.adults),
            totalPriceNight:
              this.adults * parseFloat(this.productSelected.price_adult) +
              this.childs * this.priceChild,
            totalPrice:
              this.adults * parseFloat(this.productSelected.price_adult) +
              this.childs * this.priceChild,
            tipo_agenda: this.productSelected.tipo_agenda,
            hora_inicio:
              this.productSelected.tipo_agenda === 3
                ? this.dateRange.start.getHours() + ":" + minutos
                : null,
          };
        }
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.cant-personas {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.phoneButton {
  display: flex;
  align-items: center;
}
.reserve-form {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 5%;
  @media screen and (max-height: 1025px) {
    max-height: 48rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media screen and (max-height: 750px) {
    max-height: 39rem;
  }
  @media screen and (max-height: 670px) {
    max-height: 34rem;
  }
  @media screen and (max-height: 600px) {
    max-height: 29rem;
  }
}
.boldninos {
  font-size: 12px;
}
.submit {
  @apply bg-teal-400;
}
.submit:disabled {
  @apply bg-teal-200 cursor-not-allowed;
}
</style>
