<script setup>
import { useSpotsStore } from '../stores/spotsStore';
import { ref } from 'vue';

const store = useSpotsStore();
store.getSpots();
const showdetailpage = ref(false);
const currentSpot = ref({});

const editItem = (item) => {
  currentSpot.value = { ...item };
  showdetailpage.value = true;
};

const cols = [
  {
    name: 'foto',
    field: 'foto',
    label: 'Image:',
    align: 'center',
    format: (val) => `http://localhost:3000/pictures/${val}`,
  },
  { name: 'name', field: 'titel', label: 'Name', align: 'left' },
  { name: 'Beschreibung', field: 'Beschreibung', label: '', align: 'left' },
  { name: 'rating', field: 'rating', label: 'Rating', align: 'right' },
  { name: 'likes', field: 'likes', label: 'Likes', align: 'left' },
  { name: 'GPS', label: 'GPS: ', align: 'left' },
  { name: 'actions', label: 'Actions', align: 'center' },
];
</script>

<template>
  <!--  mobile version -->
  <div class="q-mt-md q-ml-sm q-mr-sm">
    <q-card>
      <q-table
        grid
        title="Chillspotz:"
        :rows="store.data"
        row-key="name"
        :pagination="{ rowsPerPage: 10 }"
        class="lt-md"
      >
        <template v-slot:top-right>
          <q-btn :to="'./Add'" icon="add" color="purple"></q-btn>
        </template>
        <template v-slot:item="props">
          <q-card class="col-12 text-center">
            <q-card-section>
              <img height="200" :src="`http://localhost:3000/pictures/${props.row.foto}`" />
            </q-card-section>
            <q-card-section>{{ props.row.pid + ') ' + props.row.titel }} </q-card-section>

            <!-- <q-card-section>{{ 'Beschreibung: ' + props.row.beschreibung }} </q-card-section -->
            <q-card-section
              >{{ 'Rating:' + props.row.rating }} <br />
              {{ 'Likes:' + props.row.likes }}
            </q-card-section>
            <q-card-section
              >{{ 'GPS: ' + props.row.latitude + '; ' + props.row.longitude }}
              <!-- button -->
              <br />
              <q-btn text-color="black" @click="editItem(props.row)" icon="edit" color="yellow"
                >Edit</q-btn
              >
            </q-card-section>
          </q-card>
        </template>
      </q-table>
    </q-card>

    <!-- Webseite version -->
    <q-card>
      <q-table
        title="Spotz to chill out:"
        :rows="store.data"
        :columns="cols"
        row-key="name"
        :pagination="{ rowsPerPage: 10 }"
        class="gt-sm"
      >
        <template v-slot:top-right>
          <q-btn :to="'./Add'" @click="getLocation()" icon="add" color="purple">Add Spot</q-btn>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              align="right"
              @click="editItem(props.row)"
              color="yellow"
              text-color="black"
              icon="edit "
              >Edit</q-btn
            >
          </q-td>
        </template>

        <template v-slot:body-cell-GPS="props">
          <q-td :props="props">
            {{ 'lat: ' + props.row.latitude + ';   long:' + props.row.longitude }}
          </q-td>
        </template>

        <template v-slot:body-cell-foto="props">
          <q-td :props="props">
            <q-img :src="`http://localhost:3000/pictures/${props.row.foto}`" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- dialog -->
    <q-dialog v-model="showdetailpage">
      <q-card class="my-card">
        <img height="200" :src="`http://localhost:3000/pictures/${currentSpot.foto}`" />

        <q-card-section>
          <div class="text-h6">{{ currentSpot.pid + ')' + currentSpot.titel }}</div>
          <div class="text-subtitle2">
            {{ 'added by:' + currentSpot.added_by }} <br />
            {{ currentSpot.beschreibung }}
          </div>
        </q-card-section>
        <q-card-section>
          {{ 'Rating: ' + currentSpot.rating }} <br />{{ 'Likes: ' + currentSpot.likes }}
        </q-card-section>

        <q-card-section>
          {{ 'GPS: ' + currentSpot.latitude + ';  ' + currentSpot.longitude }}
        </q-card-section>

        <q-card-section>
          <q-btn v-close-popup="showdetailpage" icon="close" color="orange">Close</q-btn>
          <p></p>
          <q-btn @click="store.delSpot(currentSpot.pid)" v-close-popup icon="delete" color="red"
            >Delete</q-btn
          >
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="css" scoped></style>
