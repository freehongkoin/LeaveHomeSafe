  <template>
  <q-footer elevated class="bg-grey-8 text-white" style="max-width: 550px">
    <div
      v-if="rtName == 'History'"
      class="visitDiv q-px-sm q-py-md"
      style="text-align: center"
    >
      <span class="visitText"
        >The visit record will be kept in your mobil phones for 31days and will
        then be erased automatically</span
      >
    </div>
    <div class="q-pa-none">
      <div class="q-gutter-y" style="max-width: 100vw">
        <q-tabs
          indicator-color="transparent"
          active-color="primary"
          class="bg-white text-grey-5 shadow-2"
          no-caps
          dense
        >
          <q-tab
            :ripple="false"
            name="Home"
            icon="home"
            label="Home"
            @click="toHome"
            :class="{ 'text-primary': rtName == 'Home' }"
          />

          <q-tab
            :ripple="false"
            name="History"
            icon="article"
            label="Visit Records"
            @click="toRecords"
            :class="{ 'text-primary': rtName == 'History' }"
          />
          <q-tab
            :ripple="false"
            name="inbox"
            icon="email"
            label="Inbox"
            @click="toInbox"
            :class="{ 'text-primary': rtName == 'Inbox' }"
          />
          <q-tab
            :ripple="false"
            name="settings"
            icon="settings"
            label="Settings"
            @click="toSettings"
            :class="{ 'text-primary': rtName == 'Settings' }"
          />
        </q-tabs>
      </div>
    </div>
  </q-footer>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const rtName = route.name;

    const toHome = () => {
      router.replace({ name: "Home" });
    };
    const toRecords = () => {
      router.replace({ name: "History" });
    };

    const toInbox = () => {
      router.replace({ name: "Inbox" });
    };

    const toSettings = () => {
      router.replace({ name: "Settings" });
    };

    return {
      toHome,
      toRecords,
      toInbox,
      toSettings,
      rtName,
    };
  },
};
</script>

<style scoped>
.visitDiv {
  background: white;
}
.visitText {
  color: black;
  font-size: 0.7rem;
}
</style>