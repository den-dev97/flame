<template>
  <div class="search">
    <input type="text" v-model="searchQuery" @input="searchPeople" />
    <img class="input-loader" v-if="isLoad" src="@/assets/img/preloader.svg" alt="preloader">
    <ul class="list" v-if="searchResults.length">
      <li class="list-item" v-for="result in searchResults" :key="result.name">
        <router-link :to="`/peoples/${getIdFromUrl(result.url)}`" v-text="result.name"/>
      </li>
    </ul>
  </div>
  <Table />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type Person from "@/types/Person";
import Table from "@/components/Table.vue";
import fetchAPI from "@/helpers/fetch-api";

const searchQuery = ref<string>('');
const searchResults = ref<Person[]>([]);
const isLoad = ref(false)

async function searchPeople () {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }
  isLoad.value=true
  try {
    const data = await fetchAPI(`https://swapi.dev/api/people/?search=${searchQuery.value}`)
      .finally(()=>isLoad.value=false);
    searchResults.value = data.results;
  } catch (error) {
    console.error(`Search failed: ${(error as Error).message}`);
  }
}

function getIdFromUrl (url: string) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}
</script>

<style>

input {
  border: 1px solid black;
}

.search {
  margin-bottom: 5rem;
  position: relative;
}
.input-loader {
  width: 15px;
  position: absolute;
  top: 6px;
  right: 3px;
}

.list {
  padding: 0;
  list-style: none;
  background: white;
  border-radius: 6px;
  border: 1px solid rgba(128, 128, 128,.5);
  position: absolute;
  width: 100%;
}

.list-item {
  border: 1px solid rgba(128, 128, 128,.5);
  border-top: none;
  color: black;
}
</style>
