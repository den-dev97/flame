<template>
  <img v-if="!currentPerson" src="@/assets/img/preloader.svg" alt="preloader">

  <div v-else class="wrapper">
    <table>
      <tr v-for="(value, key) in currentPerson" :key="key">
        <td v-text="key"/>
        <td v-text="value" />
      </tr>
    </table>
    <button v-if="!isFavorite" @click="addToFavorite">
      Add to Favorite
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import findPerson from "@/helpers/find-person";
import fetchAPI from "@/helpers/fetch-api";

onMounted(async () => {
  await searchPerson()
});

const store = useStore();
const route = useRoute();
const currentPerson = ref(null)
const id = route.params.id;
const isFavorite = computed(() => !!findPerson(store.state.favorites, currentPerson.value));

async function searchPerson() {
  try {
    currentPerson.value = await fetchAPI(`https://swapi.dev/api/people/${id}`);
  } catch (error) {
    console.error(`Search failed: ${(error as Error).message}`);
  }
}

function addToFavorite() {
  if (currentPerson.value) store.commit('toggleFavorite', currentPerson.value);
}

</script>

