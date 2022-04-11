<template>
  <div class="q-pa-md row justify-between">
    <div>
      <span class="boldText"
        >About
        <a :href="leavehomesafeGit" target="_blank"
          ><span class="linkText">LeaveHomeSafe</span>
        </a></span
      >
    </div>
    <div>
      <span>Version {{ K.version }}</span>
    </div>
  </div>
  <q-separator />
  <div class="q-pa-md row justify-between items-center">
    <div class="column">
      <div class="boldText">Daily Update</div>
      <div class="weakText">Last updated on {{ updateDate }}</div>
    </div>

    <div>
      <q-icon
        name="refresh"
        color="black"
        style="font-size: 1.5rem"
        @click="updateApp"
      />
    </div>
  </div>

  <div class="column justify-center">
    <q-list>
      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Language</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Text Size</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">App Settings</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText"
              >Personal Information Collection Statement</span
            >
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Privacy Policy Statement</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Terms and Conditions</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Accessibility Design</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="boldText">Welcome to LeaveHomeSafe</span>
          </q-item-label>
          <q-item-label caption lines="2"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="black" />
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </div>
  <Footer />
</template>

<script>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { hkDateText, storage } from "../composables/handlers";
import * as K from "../constants/constants";
import { leavehomesafeGit } from "../constants/appLinks";

export default {
  components: { Footer },
  setup() {
    const updateDate = ref("");

    const loadData = async () => {
      try {
        updateDate.value = JSON.stringify(
          await storage.get("lastupdated")
        ).slice(1, -1);
      } catch {
        updateDate.value = hkDateText(Date.now(), true);
        storage.set("lastupdated", updateDate.value);
      }
    };

    loadData();

    const updateApp = () => {
      window.location.reload(true);
      updateDate.value = hkDateText(Date.now(), true);
      storage.set("lastupdated", updateDate.value);
    };
    return {
      updateApp,
      updateDate,
      leavehomesafeGit,
      K,
    };
  },
};
</script>

<style scoped>
.boldText {
  font-weight: bold;
  font-size: 1rem;
}
.weakText {
  font-size: 0.9rem;
  color: grey;
}
.linkText {
  color: #24b188;
  text-decoration: underline;
}
</style>