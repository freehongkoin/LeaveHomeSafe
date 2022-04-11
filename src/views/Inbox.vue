<template>
  <div class="row items-center justify-center" style="height: 90vh">
    <div class="headerText">No Message</div>
  </div>
  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: { Footer },
};
</script>

<style scoped>
.headerText {
  font-size: 1rem;
  font-weight: bold;
}
</style>