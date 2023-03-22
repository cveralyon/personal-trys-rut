import Vue from 'vue'
import Vcalendar from 'v-calendar'

Vue.use(Vcalendar, {             // second is optional
  datePickerTintColor: '#F00',
  firstDayOfWeek: 2, // Monday
  datePickerShowDayPopover: false
})

