import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useSpotsStore = defineStore('spotsStore', () => {
  const data = ref([]);
  const detail = ref({});

  const getSpots = async () => {
    const result = await axios.get('http://localhost:3000/spots');
    data.value = result.data;
    console.log('Data received');
  };

  const getSpotsDetail = async (pid) => {
    const message = await axios.get(`http://localhost:3000/spots/${pid}`);
    detail.value = message.data;
  };

  const makeSpots = async (newspot) => {
    await axios.post(`http://localhost:3000/spots`, newspot);
    getSpots();
  };

  const delSpot = async (pid) => {
    await axios.delete(`http://localhost:3000/spots/${pid}`);
    getSpots();
  };
  return { data, detail, getSpots, getSpotsDetail, makeSpots, delSpot };
});
