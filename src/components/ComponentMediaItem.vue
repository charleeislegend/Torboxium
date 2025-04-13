<script setup lang="ts">
const props = defineProps<{
    id: number,
    name: string,
    popularity: number,
    poster: string
}>()
const emit = defineEmits(['show-selected']);

function getTorrents(){
    emit("show-selected", props.id)
}
</script>

<template>
    <div class="component-box">
        <p>ID: {{ props.id }}<br>Name: {{ props.name }}</p>
        <p> Popularity: {{ props.popularity }}</p>
        <img @click="getTorrents" :src="`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${props.poster}`">
    </div>
</template>

<style scoped>
.component-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    text-align: left;
}
.video-link {
    margin-right: 10px;
}
</style>