<script setup lang="ts">
    const props = defineProps<{
        title: string,
        magnet: string,
        cached: boolean,
        tracker: string,
    }>()
    const emit = defineEmits(['torrent-selected']);

    import { TorboxAPI } from '../TorboxAPI';
    let api = new TorboxAPI()

    function onClickQueue(){
        api.QueueTorrentByMagnet(props.magnet).then((response) => {
            if (response) {
                let torrentId = response['data']['torrent_id'];
                console.log(torrentId)
                emit('torrent-selected', torrentId);
            }
        })
    }
</script>

<template>
    <div class="component-box">
        <p>{{ title }}</p> <span>Cached: {{ cached }}</span>
        <p>Tracker: {{ tracker }}</p>
        <button :magnet="magnet" @click="onClickQueue">Queue</button>
    </div>
</template>

<style scoped>
.component-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    text-align: left;
}
</style>