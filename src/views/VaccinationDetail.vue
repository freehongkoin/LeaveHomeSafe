<template>
  <div v-if="loaded" class="column items-center justify-center">
    <div style="max-width: 550px; height: 100vh">
      <div class="q-pa-none">
        <div class="q-gutter-y-none" style="height: 100vh">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="center"
              narrow-indicator
            >
              <q-tab no-caps name="record" class="forcewrap">
                <span
                  >COVID-19 Electronic <br />
                  Vaccination Record
                </span>
              </q-tab>
              <q-tab no-caps name="cert" class="forcewrap">
                <span>
                  COVID-19 Vaccination <br />
                  Medical Exemption <br />
                  Certificate
                </span>
              </q-tab>
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="record">
                <div>
                  <div>
                    <QRcode :text="vaccineRecord" />
                  </div>
                  <div>
                    <p class="text-grey-7 verifyText">
                      Digital signature verified on the above information
                    </p>
                  </div>
                  <div v-if="!showDetails">
                    <AppButton text="Show Details" :action="setShowDetails" />
                  </div>
                  <div v-else>
                    <p class="q-pa-sm forcewrap">
                      {{ vaccineRecord }}
                    </p>
                    <div>
                      <AppButton text="Back" :action="goBack" />
                      <AppButton
                        text="Delete"
                        :action="deleteRecord"
                        color="red"
                      />
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="cert">
                <div
                  class="column items-center justify-between"
                  style="height: 90vh; width: 95vw"
                >
                  <div class="headerText"></div>
                  <div class="headerText">No record</div>
                  <div class="q-my-none q-mb-lg text-center btnStyle">
                    <q-btn
                      :disable="loading || disabled"
                      filled
                      rounded
                      :color="color ? color : 'warning'"
                      @click="released"
                      no-caps
                    >
                      <span class="recordText text-center">Add new record</span>
                    </q-btn>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="row fullScreen items-center justify-center">
    <div class="column fullScreen items-center justify-center">
      <q-spinner color="primary" size="2rem" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storage } from "../composables/handlers";
import QRcode from "../components/QRcode.vue";
import { vdata } from "../constants/constants";
import AppButton from "../components/AppButton.vue";

export default {
  components: { QRcode, AppButton },
  setup() {
    const router = useRouter();
    const vaccineRecord = ref(vdata);
    const loaded = ref(false);
    const showDetails = ref(false);

    const setShowDetails = () => {
      showDetails.value = true;
    }

    (async () => {
      let vaccine = JSON.stringify(await storage.get("vaccine")).slice(1, -1);
      if (vaccine == "ul") {
        vaccineRecord.value = "";
      } else {
        vaccineRecord.value = vaccine;
      }
      loaded.value = true;
    })();

    const goBack = () => {
      router.replace({ name: "Records" });
    };

    const deleteRecord = async () => {
      await storage.set("vaccine", "No Vaccination Record");
      goBack();
    };

    return {
      vaccineRecord,
      goBack,
      loaded,
      deleteRecord,
      tab: ref("record"),
      showDetails,
      setShowDetails,
    };
  },
};
</script>

<style scoped>
.headerText {
  font-size: 1rem;
  font-weight: bold;
}
.forcewrap {
  overflow-wrap: break-word;
  max-width: 100vw;
  font-weight: bold;
}
.verifyText {
  font-style: italic;
  font-weight: bold;
  text-align: center;
}
.fullScreen {
  height: 100%;
  width: 100%;
}
.headerText {
  font-size: 1rem;
  font-weight: bold;
}
.recordText {
  color: black;
}
</style>