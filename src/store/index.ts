import { createStore } from 'vuex';
import type Person from "@/types/Person";
import type PersonState from "@/types/PersonState";
import type { Commit } from "vuex";
import fetchAPI from "@/helpers/fetch-api";

export default createStore({
    state: {
        people: [],
        favorites: [],
    },
    mutations: {
        setPeople(state: PersonState, people: Person[]) {
            state.people = people;
        },
        toggleFavorite(state: PersonState, person: Person) {
            const index = state.favorites.findIndex(f => f.name === person.name);
            if (index === -1) state.favorites.push(person);
            else state.favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        loadFavorites(state: PersonState) {
            const favorites = localStorage.getItem('favorites');
            if (favorites) state.favorites = JSON.parse(favorites);
        },
    },
    actions: {
        async fetchPeople({ commit }: { commit: Commit }) {
            try {
                const data = await fetchAPI('https://swapi.dev/api/people');
                commit('setPeople', data.results);
            } catch (error) {
                console.error(`Fetch failed: ${(error as Error).message}`);
            }
        },
        loadFavorites({ commit }: { commit: Commit }) {
            commit('loadFavorites');
        },
    }
});
