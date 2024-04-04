<script setup>
import { ref, onMounted } from 'vue';
import { useSpotsStore } from '../stores/spotsStore';

const store = useSpotsStore();

const video = ref(null);
const image = ref(null);

// Geolocation
const location = ref({});
onMounted(() => {
  getLocation();
  console.log('Location:', location.value.longitude);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geo Location not supported by browser');
  }
}

function showPosition(position) {
  location.value.longitude = position.coords.longitude;
  location.value.latitude = position.coords.latitude;

  console.log('Location:', location.value.longitude);
}

//addspots refs
const fotoref = ref('');
const titelref = ref('');
const beschreibungref = ref('');
const ratingref = ref('');
const likesref = ref('');
const addedbyref = ref('');
// const latituderef = ref('');
// const longituderef = ref('');

const addspot = () => {
  const newspot = {
    foto: fotoref.value,
    titel: titelref.value,
    beschreibung: beschreibungref.value,
    rating: ratingref.value,
    likes: likesref.value,
    added_by: addedbyref.value,
    latitude: location.value.latitude,
    longitude: location.value.longitude,
  };
  store.makeSpots(newspot);
  console.log('data added');
};

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
        fotoref.value = base64img;
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

  <!-- Inputs -->
  <q-card>
    <q-form @submit="addspot()" @reset="onReset" class="q-gutter-md">
      <!-- Inputs -->
      <q-input
        filled
        v-model="titelref"
        label="Name of the Spot"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="beschreibungref"
        label="Description"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="ratingref"
        label="Rating"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="likesref"
        label="Likes"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="addedbyref"
        label="Added_By:"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <!-- <q-input
        filled
        v-model="latituderef"
        label="latitude"
        placehodler=`
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="longituderef"
        label="longitude"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      /> -->
      <div>
        <q-btn label="Add Spot" type="submit" color="primary" />
        <q-btn label="Back" :to="'./'" color="red" />
      </div>
    </q-form>
  </q-card>
</template>
