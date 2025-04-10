<script setup lang="ts">
const props = defineProps<{
    id: number,
    name: string,
    size: number,
    torrentId: number
}>()
const emit = defineEmits(['file-selected']);

import { ref, type Ref } from 'vue';
import { TorboxAPI } from '../TorboxAPI';
import { Utils } from '../utils';

const api = new TorboxAPI()
let urlAndroid: Ref<undefined, undefined>|Ref<string, string> = ref(undefined);
let url = ref(undefined);

const regex = /[Ss](\d{2})[Ee](\d{2})/i;
const match = props.name.match(regex);
let season: number, episode: number;

if (match) {
    season = parseInt(match[1]);
    episode = parseInt(match[2]);
}

async function onClickGetVideo() {
    const fetchedData = await api.GetStreamFromFile(props.torrentId, props.id);
    console.log(fetchedData)
    let deviceType = Utils.GetDeviceType()
    if (deviceType == Utils.DeviceType.Android){
        urlAndroid.value = `intent:${fetchedData}#Intent;action=android.intent.action.VIEW;type=video/*;end;`
    }
    url.value = fetchedData;
}
</script>

<template>
    <div class="component-box">
        <p>{{ name }}</p>
        <p>
            <span>Season: {{ season }}</span>&nbsp;&nbsp;&nbsp;
            <span>Episode: {{ episode }}</span>&nbsp;&nbsp;&nbsp;
            <span>Size: {{ Math.round(size / 1000000) }} Mb</span>
        </p>
        <p>
            <span>
                <a class="video-link" v-if="urlAndroid !== undefined" :href="urlAndroid">Play on Android</a>
                <a class="video-link" v-if="url !== undefined" :href="url">Direct Video Link</a>
                <button @click="onClickGetVideo" v-else>Get video</button>
            </span>
        </p>
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