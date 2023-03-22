<template>
  <div>
    <img preload  class="imgTerms" src="/Terms/PolitCancelacion.jpg" alt="PoliticasdeCancelacion"/>
    <h1 style="display: none;">Políticas de Cancelación</h1>
    <div class="cuerpo">
      <div class="policy-links">
        <ul>
          <li><a href="/TerminosyCondiciones">Términos y Condiciones</a></li>
          <li><a href="/PoliticasdePrivacidad">Políticas de Privacidad</a></li>
          <li><a href="/TerminosdePago">Términos de Pago</a></li>
          <li><a >Políticas de Cancelación</a></li>
        </ul>
      </div>
      <div class="terminos">
        <iframe class="iframterms" src="https://docs.google.com/document/d/e/2PACX-1vQBcSOb_eyLTo33Jjm01SkXV-i7-T5MvR9buFt2z9-MBFPndtae_TkvITacEGcQx9RFp5i-ODYopVl8/pub?embedded=true"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  head() {
    return {
      title: "Rutero |  Políticas de Cancelación",
      meta: [
        {
          hid: "",
          name: "",
          content: "",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://www.rutero.cl/PoliticasdeCancelacion",
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.rutero.cl/PoliticasdeCancelacion'
        }
      ],
    };
  }
}
</script>

<style scoped>
.policy-links {
  height: 100%; /* Se reduce el alto del div para que no se salga de la pantalla en móviles */
  padding: 3rem 1rem;
  padding-left: 2rem;

  @media screen and (max-width: 768px) {
    position: inherit;
    padding-top: 2vh;
    padding-bottom: 0vh;
    font-size: small;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
li:nth-child(4) {
  list-style-type: disclosure-closed;
}

a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

a:hover{
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid #333;
}

.imgTerms{
  height: auto; /* Se usa "auto" para que el alto se ajuste automáticamente al ancho */
  max-width: 100%; /* Se usa "max-width" en lugar de "width" para que la imagen no se salga del ancho de la pantalla */
  @media screen and (max-width: 768px) {
    margin-top: 3vh;
  }
}
.cuerpo{
  display: flex;
  width: 100%;
  flex-direction: column;
}
.terminos {
  margin: 2rem; /* Se usa "margin" en lugar de "margin-left" para que se ajuste en diferentes tamaños de pantalla */
  height: auto;  /*Se usa "auto" para que la altura se ajuste automáticamente al ancho */
  width: 100%;
  @media screen and (max-width: 768px) {
    height: 50vh;
    width: 100%;
    margin: 0rem;
  }
}

.iframterms{
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 768px) {
/* Se ajusta el estilo en pantallas de computadora */
  .cuerpo {
    width: 76%;
    margin: auto;
    justify-content: center;
    flex-direction: row-reverse;; /* Se vuelve a cambiar la dirección del eje para que se ajuste en pantallas más grandes */
  }

  .terminos {
    margin: 2rem 0rem;
    height: 36rem;
    width: 77%;
  }
}
</style>