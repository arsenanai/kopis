const Calendar = Vue.component('calendar', {
	  template: "#calendar",
	  data() {
	    return {
	      today: new Date(),
	      selectedDate: new Date(),
	      currDateCursor: new Date(),
	      //imported from calendar_labels_.js
	      dayLabels: dayLabels,
	      monthLabels: monthLabels,
	    };
	  },
	  props: {
	    startDate: {
	      required: false,
	      type: Date,
	    }
	  },
	  computed: {
	    currMonth() {
	      return this.currDateCursor.getMonth();
	    },
	    currYear() {
	      return this.currDateCursor.getFullYear();
	    },
	    currMonthLabel() {
	      return this.monthLabels[this.currMonth];
	    },
	    weeks(){
	    	const date = this.currDateCursor;
	      	const startOfMonth = dateFns.startOfMonth(date);
	      	const endOfMonth = dateFns.endOfMonth(date);
	    	return dateFns.differenceInCalendarWeeks(endOfMonth, startOfMonth)+1;
	    }
	  },
	  mounted() {
	    if (this.startDate) {
	      this.currDateCursor = this.startDate;
	      this.selectedDate = this.startDate;
	    }
	  },
	  methods: {
	    dayClassObj(date) {
	      return {
	        'badge badge-danger' : date.isToday,
	        'current': date.isCurrentMonth,
	        'badge badge-secondary': date.isSelected,
	        'badge badge-primary': date.hasEvent
	      };
	    },
	    nextMonth() {
	      this.currDateCursor = dateFns.addMonths(this.currDateCursor, 1);
	    },
	    previousMonth() {
	      this.currDateCursor = dateFns.addMonths(this.currDateCursor, -1);
	    },
	    setSelectedDate(date) {
	      this.selectedDate = date.date;
	      this.$emit('input', this.selectedDate);
	    },
	    datesArray(weekNumber) {
	      const date = this.currDateCursor;
	      const startOfWeek = dateFns.addWeeks(dateFns.startOfWeek(dateFns.startOfMonth(date),{weekStartsOn: 1}),weekNumber);
	      const endOfWeek = dateFns.endOfWeek(startOfWeek, {weekStartsOn: 1});
	      if(dateFns.isSameMonth(new Date(this.currYear, this.currMonth), startOfWeek)){
		      const days = dateFns.eachDay(startOfWeek, endOfWeek);
		      const dates = days.map((day) => ({
		        date: day,
		        isCurrentMonth:  dateFns.isSameMonth(new Date(this.currYear, this.currMonth), day),
		        isToday: dateFns.isToday(day),
		        isSelected: dateFns.isSameDay(this.selectedDate, day),
		        hasEvent: false
		      }));
		      return dates;
		  }
	    }
	  },
	  filters: {
	    formatDateToDay(val) {
	      return dateFns.format(val, 'D');
	    }
	  },
	});