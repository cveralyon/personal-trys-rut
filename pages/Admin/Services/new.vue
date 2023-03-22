<template>
  <div>
    <h2 style="margin-left: 7.5vw; margin-top: 3%;">Crear Nuevo Servicio</h2>
    <Form :service="{ products: []}"/>
  </div>
</template>

<script>
import Form from "~/components/Admin/Form/Form.vue";
export default {
  head() {
		return {
			title: "Rutero |  Crear Nuevo Servicio",
			meta: [
			{
				hid: "",
				name: "",
				content: "",
			},
			],
		};
	},
    components: {
        Form
    },
}
</script>