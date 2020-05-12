<template>
  <v-container>
    <v-footer
      padless
      absolute
    >
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center footer"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.name"
            :to="icon.url"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon.name }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>{{title}}</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
import {APP_TITLE, FOOTER} from '@/config.js'

export default {
  computed: {

  },
  data: () => ({
    title: APP_TITLE,
    icons: FOOTER.icons
  }),
  methods: {
    
  }
}
</script>
<style scoped>
.footer {
  width: 100%;
  background-image: 
    linear-gradient(to top,rgba(255,76,76,.8), rgba(128,208,199,.3)),
    url('../assets/footer.jpg');
}
</style>
