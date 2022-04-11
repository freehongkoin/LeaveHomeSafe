<template>
  <div class="fullScreenSize">
    <QRscan @endLoad="setReady" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getPWADisplayMode } from "../composables/handlers";
import { useRouter } from "vue-router";
import QRscan from "../components/QRscan.vue";

export default {
  components: { QRscan },
  setup() {
    const loading = ref(true);

    const setReady = () => {
      if (loading.value == false) {
        loading.value = true;
      };
    };

    return {
      setReady,
    };
  },

  data() {
    const selected = { text: "outline", value: this.paintOutline };
    const router = useRouter();
    return {
      isValid: undefined,
      camera: "auto",
      result: null,
      fullscreen: (() => {
        if (getPWADisplayMode() == "standalone") {
          return false;
        } else {
          return false;
        }
      })(),
      selected,
      router,
    };
  },

  computed: {},

  watch: {},

  methods: {
    goBack() {
      this.router.replace({ name: "Home" });
    },
  },

  beforeRouteLeave: async function (to, from, next) {
    if (this.loading) {
      next(false);
    } else {
      try {
        window.localStream
          .stop()
          .then((ignore) => {
            // QR Code scanning is stopped.
          })
          .catch((err) => {
            // Stop failed, handle it.
          });
      } catch {}
      next();
    }
  },
};
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;
  color: grey;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-success {
  color: green;
}

.validation-failure {
  color: black;
}

.fullscreen {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.fullscreen-button {
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
}

.fullscreen-button img {
  width: 2rem;
}

.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin-top: 20%;
  color: grey;
}
.fullScreenSize {
  height: 100%;
  width: 100%;
}
.nilScreen {
  height: 0vh;
  width: 0vw;
}
</style>
