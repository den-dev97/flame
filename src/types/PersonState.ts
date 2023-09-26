import type Person from "@/types/Person";

export default interface PersonState {
    currentPerson: Person;
    people: Person[];
    favorites: Person[];
}
