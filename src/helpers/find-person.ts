import type Person from "@/types/Person";

export default function findPerson(list: Person[], person: string | null): Person | undefined {
    if (typeof person === 'string') return list.find((fav: Person) => fav.name === person);
    if (person !== null) return list.find((fav: Person) => fav.name === (person as Person).name);
}
