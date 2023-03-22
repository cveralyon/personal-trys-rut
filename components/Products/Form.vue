<template>
  <div class="row" style="margin-top: 5%">
    <div class="col-12">
      <label for="name">Nombre</label>
      <input type="text" class="form-control" v-model="product.name" required />
    </div>
    <div class="col-12 col-md-6">
      <label for="price_Adult">Precio Adulto</label>
      <input type="number" class="form-control" v-model="product.price_adult" />
    </div>
    <div class="col-12 col-md-6">
      <label for="price_Child">Precio Niño</label>
      <input type="number" class="form-control" v-model="product.price_child" />
    </div>
    <!-- <div class="col-12">
      <label for="description">Descripción</label>
      <textarea rows="8" v-model="product.description" border="1" class="form-control"></textarea>
    </div> -->
    <div class="col-12 col-md-6">
      <label for="min_people">Mínimo de personas</label>
      <input type="number" class="form-control" v-model="product.min_people" />
    </div>
    <div class="col-12 col-md-6">
      <label for="max_people">Máximo de personas</label>
      <input type="number" class="form-control" v-model="product.max_people" />
    </div>
    <div class="col-12">
      <label for="restrictions">Restricciones</label>
      <input type="text" class="form-control" v-model="product.restrictions" />
    </div>
    <div class="col-12">
      <label for="tipo_agenda">Tipo de agenda</label>
      <select
        id="agenda"
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        v-model="product.tipo_agenda"
      >
        <option v-for="i in agenda_types" :key="i.id" :value="i.value">
          {{ i.text }}
        </option>
      </select>
    </div>
    <div v-if="product.name">
      <h3 class="form-section-title" v-if="product.status">Producto Activo</h3>
      <h3 class="form-section-title" v-else>Producto Inactivo</h3>
      <label class="switch" :for="key">
        <input :id="key" type="checkbox" v-model="product.status" />
        <span class="slider round"></span>
      </label>
    </div>
    <div v-else>
      <button
        class="btn btn-primary"
        style="width: 10%; margin: 2%"
        @click="addNewProduct()"
      >
        +
      </button>
    </div>
    <hr class="solid" />
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addNewProduct () {
      if (this.product.name != null && this.product.price_adult != null && this.product.price_child != null && this.product.min_people != null && this.product.max_people != null && this.product.tipo_agenda != null) {
        this.product.status = true
        this.$emit('update:product', this.product)
      } else {
        alert('Por favor, rellene todos los campos del producto')
      }
    }
  },
  data () {
    return {
      agenda_types: [
        { text: 'Varios días', value: 1 },
        { text: 'Un día', value: 2 }
      ],
      key: "",
    }
  },
  mounted() {
    if (this.product.id) {
      this.key = 'product-' + this.product.id;
      if (this.product.status == 1) {
        this.product.status = true;
      } else {
        this.product.status = false;
      }
    }
  },
}
</script>

<style scoped>
hr.solid {
  margin-top: 3%;
  border-top: 3px solid rgb(46, 46, 46);
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
