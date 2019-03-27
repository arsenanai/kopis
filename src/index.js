var app = new Vue({
	el: '#app',
	components: {
	    Calendar,
	},
	data: {
		curr: new Date(),
	},
	computed: {
		formattedDate() {
	      return dateFns.format(this.curr, 'MM/DD/YYYY');
	    }
	},
	created() {
	  //this.myEventHandler();
	  //window.addEventListener("resize", this.myEventHandler);
	},
	destroyed() {
	  //window.removeEventListener("resize", this.myEventHandler);
	},
	methods: {
	  /*myEventHandler(e) {
	    var slides = document.getElementsByClassName("main-carousel-image");
	    var carouselContainer = slides.item(i).parentElement.parentElement;
		for(var i = 0; i < slides.length; i++){
		   slides.item(i).style.height = carouselContainer.offsetWidth*9/16+'px';
		}
	  }*/
	}
})