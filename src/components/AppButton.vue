<template>
  <div class="infoText q-my-md q-mb-lg text-center btnStyle">
    <q-btn
      :disable="loading || disabled"
      filled
      rounded
      :color="color ? color : 'primary'"
      @click="released"
      no-caps
    >
    <span class="infoText">{{text}}</span>
    </q-btn>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["text", "action", "args", "color", "disabled"],
  setup(props) {
    const down = ref(false);
    const loading = ref(false);
    const pressed = () => {
      down.value = true;
    };
    const unpressed = () => {
      down.value = false;
    };
    const released = async () => {
      down.value = false;
      loading.value = true;
      await props.action(props.args);
      loading.value = false;
    };
    return { pressed, released, down, loading, unpressed };
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
.down {
  opacity: 0.5;
}
.btnStyle button {
  min-width: 40%;
  font-size: 1rem;
}
</style>