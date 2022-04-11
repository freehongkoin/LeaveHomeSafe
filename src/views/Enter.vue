<template>
  <div
    v-if="isLoaded"
    class="enclose row fullScreenSize items-center justify-between"
  >
    <div class="q-mt-md q-px-sm row justify-between" style="width: 100%">
      <div>
        <q-btn class="pcolor" dense flat round icon="close" />
      </div>
      <q-img no-spinner src="../assets/logo.png" width="20%"> </q-img>

      <div class="">
        <q-icon class="wcolor" size="lg" name="close" @click="closePressed" />
      </div>
    </div>
    <div class="fullWidth column items-center justify-center">
      <div class="row items-center justify-center q-mb-none q-pb-none">
        <p class="locationText infoText q-mb-none q-pb-none">
          {{ locationMeta.nameEn }}
        </p>
      </div>
      <div class="row items-center justify-center q-mt-none q-pt-none">
        <p class="dateText infoText q-my-none q-py-none">{{ todayDate }}</p>
      </div>
    </div>

    <div
      v-if="qrContent != vdata"
      class="
        column
        fullWidth
        justify-center
        q-my-none q-py-none
        items-center
      "
    >
      <q-card class="my-card">
        <q-card-section class="bg-accent text-white">
          <div
            class="
              row
              dateText
              q-my-none q-py-none
              justify-center
              text-subtitle2
            "
          >
            Vaccinated/Exempted
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="around">
          <QRcode :text="qrContent" />
        </q-card-actions>
      </q-card>
    </div>
    <div
      v-else
      class="column q-px-xl items-center justify-center"
      style="width: 100vw"
    >
      <div style="width: 55vw">
        <q-img no-spinner src="../assets/en/noCard.png" />
      </div>
    </div>
    <div
      class="q-mt-md column justify-center items-center fullWidth"
      style="max-width=550px"
      @click="closePressed"
    >
      <q-btn unelevated no-caps rounded color="secondary" text-color="black">
        <span class="leaveText">Leave Now</span>
        <div class="q-pa-sm">
          <q-btn
            unelevated
            rounded
            no-caps
            color="white"
            text-color="black"
            style="width: 40vw"
          >
            <span class="timeText">{{
              timeCounter.toString().slice(1, 3)
            }}</span>
            <span
              class="timeText"
              :class="{
                redDot: flashSequence >= 0 && flashSequence < 0.333,
                pinkDot: flashSequence >= 0.333 && flashSequence < 0.666,
                whiteDot: flashSequence >= 0.666 && flashSequence < 1,
              }"
              >:</span
            >
            <span class="timeText">{{ timeCounter.slice(4, 6) }}</span>
            <span
              class="timeText"
              :class="{
                redDot: flashSequence >= 0 && flashSequence < 0.333,
                pinkDot: flashSequence >= 0.333 && flashSequence < 0.666,
                whiteDot: flashSequence >= 0.666 && flashSequence < 1,
              }"
              >:</span
            >
            <span class="timeText">{{ timeCounter.slice(7, 9) }}</span>
          </q-btn>
        </div>
      </q-btn>
    </div>
    <div
      class="q-px-md q-mb-md row justify-between fullWidth"
      style="max-width: 550px"
    >
      <div class="autoText" style="color: white">
        <q-icon name="check_box" color="white" />
        <span class="q-px-sm">Auto leave after 4 hours</span>
      </div>
      <div class="changeText">Change</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { hkDateText, delay, storage } from "../composables/handlers";
import QRcode from "../components/QRcode.vue";
import { vdata, qrdata } from "../constants/constants";
import { useRouter } from "vue-router";

export default {
  components: { QRcode },
  props: ["decoded"],
  setup(props) {
    const timeStamp = ref(Date.now());
    const todayDate = ref(hkDateText(timeStamp.value));
    const openPage = ref(true);
    const flashSequence = ref(0);

    const locationMeta = ref();
    const qrContent = ref(vdata);
    const router = useRouter();

    const isLoaded = ref(false);

    locationMeta.value = JSON.parse(qrdata);

    const timeCounter = ref("00:00:00");

    (async () => {
      let enterTime = hkDateText(timeStamp.value, true);
      await storage.set("enterTime", enterTime);
      try {
        let vaccine = JSON.stringify(await storage.get("vaccine")).slice(1, -1);
        qrContent.value = vaccine;
      } catch {
        qrContent.value = vdata;
      }
      isLoaded.value = true;
    })();

    const getTimeCount = async () => {
      let diff = Date.now() - timeStamp.value;
      timeCounter.value = hkDateText(60 * 60 * 23 * 1000 + diff, true).slice(
        -9
      );
      flashSequence.value = Date.now() / 1000 - Math.trunc(Date.now() / 1000);
    };

    (async () => {
      while (openPage.value) {
        await delay(300);
        getTimeCount();
      }
    })();

    try {
      locationMeta.value = JSON.parse(props.decoded);
    } catch {
      locationMeta.value = JSON.parse(qrdata);
    }
    const closePressed = async () => {
      openPage.value = false;
      await router.replace({ name: "Home" });
    };

    return {
      locationMeta,
      todayDate,
      qrContent,
      closePressed,
      timeCounter,
      vdata,
      isLoaded,
      flashSequence,
    };
  },
  beforeCreate: function () {
    document.body.className = "enter";
  },
  beforeUnmount: function () {
    document.body.className = "normal";
  },

  beforeRouteLeave: async function (to, from, next) {
    this.openPage = false;
    next();
  },
};
</script>

<style scoped>
body {
  background: #24b188;
}
.enclose {
  background: #24b188;
}
.fullScreenSize {
  height: 100vh;
  width: 100%;
}
.fullWidth {
  width: 100vw;
}
.locationText {
  color: #ecd939;
  font-weight: bold;
  font-size: 1.25rem;
}
.dateText {
  color: white;
  font-size: 1.25rem;
}
.leaveText {
  font-size: 1.25rem;
  font-weight: bold;
}
.autoText {
  font-size: 1rem;
  font-weight: bold;
}
.changeText {
  color: #ecd939;
  text-decoration: underline;
  font-weight: bold;
  font-size: 1rem;
}
.pcolor {
  color: #24b188;
}
.wcolor {
  color: white;
}
.timeText {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Play", Helvetica, Arial;
}
.redDot {
  color: #c91919;
}
.pinkDot {
  color: #f3cbcb;
}
.whiteDot {
  color: white;
}
</style>