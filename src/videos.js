var app = new Vue({
    el: '#app',
    data: {
        cursor: 0,
        selectedAlbum: 0,
        albums: alb,
    },
    created: function(){
        if(this.albums.length>0)
            this.albums.forEach(function (album, i) {
                if(album.videos.length>0)
                    album.videos.forEach(function (video, j){
                        this.getTitleAndDuration(video)
                    }.bind(this))
            }.bind(this))
    },
    methods: {
        changeSelectedAlbum: function(number) {
            this.selectedAlbum = number
        },
        changeSelectedVideo: function(number) {
            this.albums[this.selectedAlbum].selectedVideo = number
        },
        isSelectedAlbum: function(index) {
            return (index === this.selectedAlbum) ? 'fc-blue' : ''
        },
        isSelectedVideo: function(index) {
            return (index === this.albums[this.selectedAlbum].selectedVideo) ? 'selected' : ''
        },
        selectAlbum: function(index) {
            this.selectedAlbum = index
            this.cursor = 0
        },
        selectVideo: function(index) {
            this.albums[this.selectedAlbum].selectedVideo = index
            $('#videoModal').modal()
        },
        getStyle: function(video) {
            return "background-image: url('https://img.youtube.com/vi/"+video.link+"/0.jpg');"
        },
        getSelectedVideoLink: function(){
            return 'https://www.youtube.com/embed/'+this.albums[this.selectedAlbum].videos[this.albums[this.selectedAlbum].selectedVideo].link
        },
        getTitleAndDuration: function(video){
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet%2C+contentDetails&id='+video.link+'&key=AIzaSyA682zBklG2iwiXVEJ9ZElSpSItjwAKc9k')
                .then(function(response){
                    var videosPage = response.data
                    video.title = videosPage.items[0].snippet.localized.title
                    var duration = videosPage.items[0].contentDetails.duration
                    duration = duration.substring(2,duration.length)
                    if(duration.indexOf("M")!=-1 || duration.indexOf("S")!=-1)
                        duration = duration.replace("H", ":");
                    else
                        duration = duration.replace("H", ":00:00");
                    if(duration.indexOf("S")!=-1){
                        duration = duration.replace("M", ":");
                        duration = duration.replace("S", "");
                    }else
                        duration = duration.replace("M",":00")
                    video.duration = duration
                }.bind(video));
        },
    }
})