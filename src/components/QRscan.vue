<template>
  <div id="reader" class="fullScreen"></div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";
import { decodeLHS, storage } from "../composables/handlers";
import { useRouter, useRoute } from "vue-router";
import * as K from "../constants/constants";
const sanitize = require("htmlsanitize");

export default {
  emits: ["endLoad"],
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const rtName = route.name;

    const stopCamera = () => {
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
    };

    // This method will trigger user permissions
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          let cameraId = devices[devices.length - 1].id;
          if (devices.length > 1) {
            cameraId = { facingMode: { exact: "environment" } };
          }
          // .. use this to start scanning.
          const html5QrCode = new Html5Qrcode(/* element id */ "reader");
          window.localStream = html5QrCode;
          html5QrCode
            .start(
              cameraId,
              {
                fps: 10, // Optional, frame per seconds for qr code scanning
                qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
              },
              (decodedText, decodedResult) => {
                // do something when code is read
                if (decodedText.slice(0, 4) == "HKEN" && rtName == "Scan") {
                  try {
                    const locDetail = decodeLHS(
                      sanitize(decodedText)
                    );
                    const codeText = JSON.stringify(locDetail);
                    stopCamera();

                    router.replace({
                      name: "Enter",
                      params: { decoded: codeText },
                    });
                  } catch {}
                } else if (rtName == "Vaccination") {
                  let vaccinationRecord =
                    sanitize(decodedText);
                  storage.set("vaccine", vaccinationRecord);
                  router.replace({
                    name: "Records",
                  });
                }
              },
              (errorMessage) => {
                // parse error, ignore it.
                if (window.localStream.isScanning) {
                  context.emit("endLoad");
                }
              }
            )
            .catch((err) => {
              // Start failed, handle it.
              K.error(err);
              context.emit("endLoad");
            });
        }
      })
      .catch((err) => {
        // handle err
        router.replace({
          name: "Home",
        });
      });
    return { rtName };
  },
  beforeCreate: function () {
    document.body.className = "scan";
  },
  beforeUnmount: async function () {
    document.body.className = "normal";
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
  },
};
</script>

<style scoped>
.fullScreen {
  height: 100%;
  width: 100%;
  background: black;
}
video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
}
body {
  background: black;
}
</style>