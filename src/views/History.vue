<template>
  <div
    v-if="noRecord"
    class="row items-center justify-center"
    style="height: 90vh"
  >
    <div class="headerText">No Record</div>
  </div>
  <div v-else>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">3/F, Legislative Council Complex</span>
          </q-item-label>
          <q-item-label caption lines="2"
            >2022-01-01 13:12 - 2022-01-01 14:30</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </div>

  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import { ref } from "vue";

export default {
  components: { Footer },
  setup() {
    const noRecord = ref(true);
    return { noRecord };
  },
};
</script>

<style scoped>
.boldText {
  font-weight: bold;
}
.headerText {
  font-size: 1rem;
  font-weight: bold;
}
</style>