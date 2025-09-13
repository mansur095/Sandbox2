// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  defaults: {
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto'
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto'
    }
  }
})
