<script setup>
import { useSpotsStore } from '../stores/spotsStore';
import { ref } from 'vue';

const store = useSpotsStore();
const currentSpot = ref({});
</script>

<template>
  <div class="absolute-center">
    <q-card>
      <q-card>
        <span>Add a Spot:</span> <br />
        <q-card-section>
          <div><q-input filled class="input" v-model="textfoto" label="Foto" /></div>
          <div><q-input filled class="input" v-model="texttitel" label="Titel" /></div>
          <div><q-input filled v-model="textdesc" label="Beschreibung" /></div>
          <div><q-input filled v-model="textrating" label="Rating" /></div>
        </q-card-section>

        <q-card-section>
          <div><q-input filled v-model="textlikes" label="Likes" /></div>
          <div><q-input filled v-model="textlat" label="Latitude" /></div>
          <div><q-input filled v-model="textlong" label="Longitude" /></div>
          <div><q-input filled v-model="text_a_b" label="Your Name:" /></div>
        </q-card-section>
      </q-card>
    </q-card>
  </div>
</template>

<style>
.input {
  color: white;
  display: inline-block;
}
</style>
