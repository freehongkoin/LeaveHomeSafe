<template>
  <div class="q-mt-none q-pt-none q-px-md q-pb-md">
    <p class="infoText dateText q-mb-none">
      {{ todayDate.slice(0, 10) }}, {{ day }}
    </p>
    <p class="infoText headerText q-pb-md">Record your visit.</p>
  </div>
  <div class="q-px-sm scrollhide q-mb-none q-pb-none">
    <q-scroll-area
      style="height: 60vh; max-width: 100vw"
      :bar-style="{
        width: '0px',
        opacity: 0,
      }"
    >
      <div class="row no-wrap hideScroll" style="">
        <div class="q-pa-md" style="width: 80vw; max-width: 550px">
          <q-card class="my-card" @click="pressedEnter">
            <q-img no-spinner src="../assets/en/01.png" style="width: 100%" />

            <q-card-section>
              <div class="text-subtitle2 clickText">Click here to "Enter"</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-pa-md" style="width: 80vw; max-width: 550px">
          <q-card class="my-card" @click="pressedTaxi">
            <q-img no-spinner src="../assets/en/02.png" style="width: 100%" />

            <q-card-section>
              <div class="text-subtitle2 clickText">Click here to "Get On"</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-pa-md" style="width: 80vw; max-width: 550px">
          <q-card class="my-card" @click="pressedReport">
            <q-img no-spinner src="../assets/en/03.png" style="width: 100%" />

            <q-card-section>
              <div class="text-subtitle2 clickText">Click here to "Report"</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-pa-md" style="width: 80vw; max-width: 550px">
          <q-card class="my-card" @click="pressedRecord">
            <q-img no-spinner src="../assets/en/04.png" style="width: 100%" />

            <q-card-section>
              <div class="text-subtitle2 clickText">Click here to "Enter"</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-pa-md" style="width: 80vw; max-width: 550px">
          <q-card class="my-card" @click="pressedCode">
            <q-img no-spinner src="../assets/en/05.png" style="width: 100%" />

            <q-card-section>
              <div class="text-subtitle2 clickText">Click here to "Enter"</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
  </div>
  <div
    class="
      moveUp
      column
      q-pt-none q-mt-none q-mb-xl
      items-center
      justify-center
    "
    style="width: 100vw; max-width:550px"
  >
    <q-img class="" no-spinner src="../assets/en/banner.png" width="90%">
      <span class="lastUpdatedText q-pa-sm q-ma-none">Last updated on</span>
      <br />
      <span class="lastUpdatedText q-px-sm q-ma-none">{{
        todayDate.slice(0, 10)
      }}</span>
    </q-img>
  </div>

  <Footer />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { hkDateText, storage, clearCamera } from "../composables/handlers";
import Footer from "../components/Footer.vue";
import * as K from "../constants/constants";

export default {
  components: { Footer },
  emits: ["reload"],
  setup() {
    const router = useRouter();
    const todayDate = ref(hkDateText(Date.now()));
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const initStorage = async () => {
      // lastupdated
      try {
        let lastUpdated = JSON.stringify(
          await storage.get("lastupdated")
        ).slice(1, -1);
        if (lastUpdated == "ul") {
          let lastUpdated = hkDateText(Date.now(), true);
          storage.set("lastupdated", lastUpdated);
        }
      } catch (err) {
        let lastUpdated = hkDateText(Date.now(), true);
        storage.set("lastupdated", lastUpdated);
      }

      // language
      try {
        let language = JSON.stringify(await storage.get("language")).slice(
          1,
          -1
        );
        if (language == "ul") {
          storage.set("language", "en");
        }
      } catch {
        storage.set("language", "en");
      }
      // vaccine
      try {
        let vaccine = JSON.stringify(await storage.get("vaccine")).slice(1, -1);
        if (vaccine == "ul") {
          storage.set("vaccine", "No Vaccination Record");
        }
      } catch {
        storage.set("vaccine", "No Vaccination Record");
      }
      // enterTime
      try {
        let enterTime = JSON.stringify(await storage.get("enterTime")).slice(
          1,
          -1
        );
        if (enterTime == "ul") {
          let enterTime = hkDateText(Date.now(), true);
          storage.set("enterTime", enterTime);
        }
      } catch {
        let enterTime = hkDateText(Date.now(), true);
        storage.set("enterTime", enterTime);
      }
      //history
      try {
        let history = JSON.stringify(await storage.get("history"));
        if (history == "null") {
          let history = {};
          storage.set("history", history);
        }
      } catch {
        let history = {};
        storage.set("history", history);
      }
    };
    initStorage();

    clearCamera();

    let day = weekday[new Date().getDay()];

    const toScan = () => {
      clearCamera();
      router.replace({ name: "Scan" });
    };

    const pressedEnter = () => {
      clearCamera();
      toScan();
    };

    const pressedTaxi = () => {
      clearCamera();
      K.print("pressed taxi");
    };

    const pressedReport = () => {
      clearCamera();
      K.print("pressed report");
    };

    const pressedRecord = () => {
      clearCamera();
      router.replace({ name: "Records" });
    };

    const pressedCode = () => {
      clearCamera();
      K.print("pressed code");
    };

    return {
      toScan,
      router,
      todayDate,
      day,
      pressedEnter,
      pressedTaxi,
      pressedReport,
      pressedRecord,
      pressedCode,
    };
  },
  beforeCreate: function () {
    document.body.className = "home";
  },
  beforeUnmount: function () {
    document.body.className = "normal";
  },
};
</script>

<style scoped>
.infoText {
  color: white;
  text-shadow: 1px 1px #9e9e9e;
}
.dateText {
  font-size: 1rem;
}
.headerText {
  font-size: 1.5rem;
  font-weight: bold;
}
a:link {
  text-decoration: none;
  color: black;
}
a:visited {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: none;
  color: black;
}
a:active {
  text-decoration: none;
  color: black;
}
.myCard {
  width: 80vw;
  max-width: 550px;
}
.clickText {
  color: #188b6e;
  font-size: 1.25rem;
}
.hideScroll::-webkit-scrollbar {
  display: none;
}
.lastUpdatedText {
  color: black;
  font-size: 0.7rem;
}
.moveUp {
  transform: translateY(-20px);
  background: white;
}
</style>