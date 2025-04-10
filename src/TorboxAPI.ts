export class TorboxAPI {
    apiKey: string;
    headers;
    baseUrl;
    searchBaseUrl;

    constructor() {
        this.apiKey = ""; // You must provide your own Torbox API key
        this.headers = new Headers({ 'Authorization': `Bearer ade2abf1-61c7-4ad2-a22d-1aa3fb964193` });
        this.baseUrl = "http://192.168.0.22:5000/main";
        //this.baseUrl = "http://localhost:5000/main";
        this.searchBaseUrl = "http://192.168.0.22:5000/search";
        //this.searchBaseUrl = "http://localhost:5000/search";
    }

    async GetTorrentsByIMDB(id:string, season:number|null = null, episode:number|null = null){
        let url : string = "";
        let torrents;

        if (season == null && episode == null){
            url = `${this.searchBaseUrl}/torrents/imdb:${id}?check_cache=true`;
        }
        else if (season != null && episode != null){
            url = `${this.searchBaseUrl}/torrents/imdb:${id}?season=${season}&episode=${episode}&check_cache=true`;
        }
        else {
            throw "Season and Episode must both be provided, or neither.";
        }

        await fetch(url, { 
            method: 'GET',
            headers: this.headers,
        }).then((response) => response.json()).then( (responseData) => {
            torrents = responseData['data']['torrents']
        })
        return torrents;
    }

    async QueueTorrentByMagnet(magnet:string):Promise<any>{
        const url : string = `${this.baseUrl}/api/torrents/createtorrent`;
        const formData = new FormData();
        formData.append('magnet', magnet);
        let resp;

        await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body : formData
        }).then((response) => response.json()).then((responseData) => {
            resp = responseData;
        })
        return resp;
    }

    async GetTorrentFromMyList(id:number){
        const url : string = `${this.baseUrl}/api/torrents/mylist?id=${id}`;
        let torrent:any;
        
        await fetch(url, { 
            method: 'GET',
            headers: this.headers,
        }).then((response) => response.json()).then( (responseData) => {
            if (responseData['success'])
                torrent = responseData['data'];
            else
                return ""
        })
        return torrent;
    }

    async GetStreamFromFile(torrentId:number, fileId:number){
        const url : string = `${this.baseUrl}/api/torrents/requestdl?token=${this.apiKey}&torrent_id=${torrentId}&file_id=${fileId}`;
        let videoUrl;
        
        await fetch(url, { 
            method: 'GET',
            headers: this.headers,
        }).then((response) => response.json()).then( (responseData) => {
            if (responseData['success'])
                videoUrl = responseData['data'];
            else
                return ""
        })
        return videoUrl;
    }
}