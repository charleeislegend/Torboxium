<script setup lang="ts">
import ComponentTorrentItem from './components/ComponentTorrentItem.vue';
import ComponentFileItem from './components/ComponentFileItem.vue';

import { TorboxAPI } from './TorboxAPI.ts'
import { ref } from 'vue';

let api = new TorboxAPI()
let torrents = ref()
let files = ref()
let state = ref("torrents")
let selectedTorrentId : number = -1
let imdbUrl = ref("")

async function getTorrents(){
  const regex = /title\/(tt\d{6,12})/i;
  const match = imdbUrl.value.match(regex);
  let imdbId;

  if (match) {
      imdbId = match[1];
      const fetchedData = await api.GetTorrentsByIMDB(imdbId);
      torrents.value = fetchedData;
      state.value = "torrents"
  }
}

async function torrentSelected(torrentId: number) {
  const fetchedData = await api.GetTorrentFromMyList(torrentId)
  state.value = "files"
  files.value = fetchedData['files'];
  selectedTorrentId = torrentId;
}
</script>

<template>
  <div>
    <input v-model="imdbUrl" placeholder="Input a IMDB URL">
    <button @click="getTorrents">Get torrents</button>
  </div>
  <div id="torrents-section" v-if="state == 'torrents'">
    <ComponentTorrentItem @torrent-selected="torrentSelected" v-for="torrent in torrents" :title="torrent.raw_title"
      :magnet="torrent.magnet" :cached="torrent.cached" :tracker="torrent.tracker"></ComponentTorrentItem>
  </div>
  <div id="files-section" v-if="state == 'files'">
    <ComponentFileItem v-for="file in files" :id="file.id" :torrent-id="selectedTorrentId" :name="file.name" :size="file.size"></ComponentFileItem> 
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
