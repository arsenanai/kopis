if(typeof channel === 'undefined' || typeof api_key === 'undefined')
    alert("Contact website admin to specify Youtube Channel And API Key")
else{
var app = new Vue({
    el: '#app',
    data: {
        api_key: api_key,
        channel: channel,
        selectedVideo: 0,
        videos: [],
    },
    created: function(){
        if(channel.length>0){
            axios.get('https://www.googleapis.com/youtube/v3/search?key='+this.api_key+'&channelId='+this.channel+'&part=id,snippet&order=date&maxResults=25')
                .then(function(response){
                    var items = response.data.items
                    var video = null
                    for(var i=0;i<items.length-1;i++){
                        video = {
                            id: items[i].id.videoId,
                            title: items[i].snippet.title,
                            duration: "",
                            //publishDate: items[i].snippet.publishedAt,
                            thumbnail: items[i].snippet.thumbnails.high.url,
                        }
                        this.videos.push(video)
                        this.getDuration(items[i].id.videoId, i)
                    }
                }.bind(this))
        }else{
            alert("Contact website admin to specify correctly Youtube Channel")
        }
    },
    methods: {
        isSelectedVideo: function(index) {
            return (index === this.selectedVideo) ? 'selected' : ''
        },
        getStyle: function(video) {
            return "background-image: url('"+video.thumbnail+"');"
        },
        selectVideo: function(index) {
            this.selectedVideo = index
            $('#videoModal').modal()
        },
        getSelectedVideoLink: function(){
            return 'https://www.youtube.com/embed/'+this.videos[this.selectedVideo].id
        },
        getDuration: function(videoId, i){
            var video = this.videos[i]
            return axios.get('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet%2C+contentDetails&id='+videoId+'&key='+this.api_key)
                .then(function(response){
                    var videosPage = response.data
                    var duration = ""
                    if(typeof videosPage.items[0] !== "undefined"){
                        duration = videosPage.items[0].contentDetails.duration
                        console.log(duration)
                        var hours = duration.match(/(\d+)H/);
                        var minutes = duration.match(/(\d+)M/);
                        var seconds = duration.match(/(\d+)S/);
                        duration = ""
                        if (hours) duration += parseInt(hours[1])+":";
                        if (minutes && hours) 
                            duration += minutes[1].length>1 ? minutes[1]+":" : "0"+minutes[1]+":";
                        else if(minutes)
                            duration += minutes[1]+":"
                        else if(hours)
                            duration += "00:"
                        else
                            duration += "0:"
                        if (seconds) 
                            duration += seconds[1].length>1 ? seconds[1]: "0"+seconds[1];
                        else
                            duration += "00"
                    }
                    video.duration = duration
                }.bind(video));
        },
    }
})
}