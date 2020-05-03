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
      <v-toolbar-title 
      :scroll="titleheight" @click="home" style="height:80%;padding-left:5vw;"><h1 id="title-main" ref="titleMain" :style="title_style">{{title}}</h1></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      right
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
              to="">
            <v-list-item-icon class="exit"
              @click="drawer = false">
              <v-icon>{{'mdi-close'}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="$store.state.user.icon">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{$store.state.user.name}}</v-list-item-title>
            <v-list-item-subtitle>{{$store.state.user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group
          v-model="group"
          active-class="orange--text text--accent-4"
        >
          <v-list-item 
            v-for="entry in $store.state.drawer"
            :key="entry.title"
            :to="entry.url">
            <v-list-item-icon>
              <v-icon>{{entry.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{entry.title}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import {APP_TITLE} from '@/config.js'
import debounce from 'lodash/debounce'

export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      ''
    ])
  },
  data: () => ({
    title: APP_TITLE,
    title_style: {
      'margin': 'auto',
      'height': '100%',
      'position': 'absolute',
      'font-size': '100px',
      'line-height': '100px'
    },
    drawer: false,
    group: null
  }),
  methods: {
    titleheight () {
      let height = this.$refs.titleParent.styles.height
      height = Math.trunc((height.substring(0, height.length - 2) * 0.65))
      this.$set(this.title_style, 'height', height + 'px')
      this.$set(this.title_style, 'font-size', height + 'px')
      this.$set(this.title_style, 'line-height', (height - 20) + 'px')
    },
    validateState () {
      let expiration = this.$store.state.expiration
      if (expiration != null) {
        let time = Date.now()
        if (time > expiration) {
          this.$store.dispatch('logout')
        }
      }
    },
    home () {
      if (this.$route.name !== 'home') {
        this.$router.push({
          name: 'home'
        })
      }
    }
  },
  created () {
    this.handleDebouncedScroll = debounce(this.titleheight, 8)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  mounted () {
    this.interval = setInterval(() => this.validateState(), 1000)
    this.validateState()
    this.titleheight()
  }
}
</script>
<style scoped>
  .v-container {
    width: 100vw;
  }
  .exit {
    float: right;
    padding-left: 85%
  }
</style>
