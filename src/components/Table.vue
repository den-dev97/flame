<template>
  <div @click="handleClick">
    <img v-if="!peopleList.length && !displayFavorites" src="@/assets/img/preloader.svg" alt="preloader">
    <div v-else class="grid-container">
      <div class="grid-item header" v-for="header in headers" :key="header" v-text="header" />
      <div v-for="person in displayList" :key="person.name" class="grid-row">
        <div class="grid-item" v-for="header in onlyHeaders" :key="header" v-text="person[header]" />
        <div class="grid-item">
          <button :data-name="person.name">
            {{ findPerson(favorites, person) ? 'Remove Favorite' : 'Add Favorite' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import { useStore } from 'vuex';
import findPerson from "../helpers/find-person";

const store = useStore();

onMounted(async () => {
  await store.dispatch('loadFavorites');
  await store.dispatch('fetchPeople')
});

const props = defineProps<{
  displayFavorites?: boolean,
}>();

const headers = ['name', 'height', 'mass', 'hair_color', 'action'];
const onlyHeaders = ['name', 'height', 'mass', 'hair_color'];
const peopleList = computed(() => store.state.people);
const favorites = computed(() => store.state.favorites);
const displayList = computed(() => props.displayFavorites ? favorites.value : peopleList.value);

function handleClick (event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName === 'BUTTON') {
    const personName = target.getAttribute('data-name') as string | null;
    const person = findPerson(displayList.value, personName)
    if (person) store.commit('toggleFavorite', person);
  }
}

</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.grid-item {
  padding: 1rem;
  border: 1px solid #ccc;
}

.grid-item.header {
  font-weight: bold;
  background-color: #f2f2f2;
}

.grid-row {
  display: contents;
}
</style>
