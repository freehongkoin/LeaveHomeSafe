<template>
  <q-layout view="lHr LpR lFf">
    <q-header
      v-if="$route.name != 'Enter'"
      class="bg-primary text-white"
      style="max-width: 550px"
    >
      <q-toolbar>
        <div
          v-if="
            $route.meta.desc == 'Scan the QR Code' ||
            $route.meta.desc == 'Scan Vaccination Record' ||
            $route.meta.desc == 'Electronic Vaccination and Testing Record' ||
            $route.meta.desc == 'COVID-19 Electronic Vaccination Record'
          "
        >
          <q-btn dense flat round icon="arrow_back_ios" @click="toHome" />
        </div>

        <q-toolbar-title class="" style="max-width: 550px">
          <div
            class="infoText headerText absolute-center"
            :class="{
              recordHeaderText:
                $route.name == 'Records' || $route.name == 'VaccinationDetail',
            }"
          >
            {{ $route.meta.desc }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-none">
        <div class="q-ma-none q-ma-none column" style="max-width: 550px">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import * as K from "./constants/constants";
import { useRouter } from "vue-router";

export default {
  name: "LayoutDefault",
  components: {},
  setup() {
    const router = useRouter();
    const toHome = () => {
      router.replace({ name: "Home" });
    };

    return {
      toHome,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "Play";
  src: local("Play"),
    url(./assets/fonts/Play-Regular.ttf) format("truetype");
}
body {
  overscroll-behavior-y: contain;
}
.infoText {
  color: white;
  text-shadow: 1px 1px #9e9e9e;
}
.dateText {
  font-size: 1rem;
}
.headerText {
  font-size: 1.25rem;
}
.recordHeaderText {
  font-size: 1rem;
  max-width: 75vw;
}
.header-icon {
  position: absolute;
  bottom: 0;
  left: 44%;
  transform: translateX(-50%);
}
p {
  font-size: 1rem;
}
body.home {
  background: linear-gradient(to top, white 70%, #24b188 30%);
}
body.scan {
  background: black;
}
body.normal {
  background: white;
}
body.enter {
  background: #24b188;
}
</style>