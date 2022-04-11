<template>
  <div
    class="row q-pa-sm fullScreenSize items-center justify-between"
    style="max-width=550px"
  >
    <div class="q-ma-none">
      <p class="q-mx-sm noteText">
        By adding new records, the old records will be overwritten directly.
        Please make sure that the vaccination (including medical exemption
        certificate) and testing records to be added are correct and belong to
        yourself.
      </p>
    </div>
    <div
      v-if="!hasVaccine"
      class="q-pa-md column items-center justify-between"
      style="width: 100vw"
    >
      <q-img
        no-spinner
        src="../assets/en/preCert.png"
        @click="handleCertPressed"
      />
    </div>
    <div
      v-else
      class="q-pa-md column items-center justify-between"
      style="width: 100vw"
    >
      <q-img
        no-spinner
        src="../assets/en/postCert.png"
        @click="toVaccineDetail"
      />
    </div>
    <div
      class="q-pa-md column items-center justify-between"
      style="width: 100vw"
    >
      <q-img no-spinner src="../assets/en/preTest.png" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { storage } from "../composables/handlers";
import { useRouter } from "vue-router";

export default {
  components: { Footer },
  setup() {
    const router = useRouter();
    const hasVaccine = ref(false);
    (async () => {
      let vaccine = JSON.stringify(await storage.get("vaccine")).slice(1, -1);
      if (vaccine == "No Vaccination Record") {
        hasVaccine.value = false;
      } else {
        hasVaccine.value = true;
      }
    })();

    const handleCertPressed = () => {
      router.replace({ name: "Vaccination" });
    };

    const toVaccineDetail = () => {
      router.replace({ name: "VaccinationDetail" });
    };

    return { hasVaccine, handleCertPressed, toVaccineDetail };
  },
};
</script>

<style scoped>
.boldText {
  font-weight: bold;
}
.noteText {
  font-weight: bold;
  font-size: 0.9rem;
}
.fullScreenSize {
  height: 90vh;
  width: 100%;
}
</style>