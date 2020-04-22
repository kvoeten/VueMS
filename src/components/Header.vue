<template>
   <v-container>
    <v-app-bar id="title-parent" ref="titleParent"
      app
      clipped-left
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="/static/assets/header.png"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(255,76,76,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-toolbar-title :scroll="titleheight" style="height:80%"><h1 id="title-main" ref="titleMain" :style="title_style">{{title}}</h1></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import {APP_TITLE} from '@/config.js'

export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data: () => ({
    title: APP_TITLE,
    title_style: {
      'height': '100%',
      'font-size': '160px',
      'line-height': '100px'
    },
    drawer: false
  }),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    },
    titleheight () {
      let height = this.$refs.titleParent.styles.height
      height = Math.trunc((height.substring(0, height.length - 2) * 0.65))
      var margin = Math.trunc(height / 1.25)
      this.$set(this.title_style, 'font-size', height + 'px')
      this.$set(this.title_style, 'line-height', margin + 'px')
    }
  },
  created () {
    window.addEventListener('scroll', this.titleheight)
  },
  destroyed () {
    window.removeEventListener('scroll', this.titleheight)
  },
  mounted () {
    this.titleheight()
  }
}
</script>

<style scoped>

</style>
