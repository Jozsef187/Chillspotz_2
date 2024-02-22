<script setup>
import { ref, onMounted } from 'vue';

const video = ref(null);
const image = ref(null);

const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value) {
    await navigator.mediaDevices
      .getUserMedia(constraints.value)
      .then(setStream)
      .catch((e) => {
        console.error(e);
      });
  }
});

function setStream(stream) {
  video.value.srcObject = stream;
  video.value.play();
  image.value = new ImageCapture(stream.getVideoTracks()[0]);
}

function takeimage() {
  image.value
    .takePhoto()
    .then(function (blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64img = reader.result;
        console.log(base64img);
      };
    })
    .catch(function (error) {
      console.log('takeimage() error: ', error);
    });
}
</script>
<template>
  <div class="text-center">
    <video ref="video" style="width: 35vw" autoplay playsinline></video>
    <div class="items-center">
      <q-btn color="white" @click="takeimage()" text-color="black">Take picture</q-btn>
    </div>
  </div>
</template>
