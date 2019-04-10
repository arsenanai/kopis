var app = new Vue({
    el: "#app",
    components: {
        Calendar: Calendar
    },
    data: {
        curr: new Date
    },
    computed: {
        formattedDate: function() {
            return dateFns.format(this.curr, "MM/DD/YYYY")
        }
    },
    created: function() {
    	
    },
    destroyed: function() {},
    methods: {}
});