<template>
  <div class="qr q-my-sm">
    <qrcode :text="text" color="#035397" error-level="L"></qrcode>
  </div>
</template>

<script>
import VueQRCodeComponent from "vue-qrcode-component";
let qrcode = VueQRCodeComponent;

export default {
  components: { qrcode },
  props: ["text"],
};
</script>

<style>
.qr img {
  max-width: 90%;
  margin: auto;
}
</style>
