<template>
  <v-container>
    <v-alert 
      :value="alert.visible"
      :dismissible="true"
      :color="alert.color"
      :type="alert.type">
      {{alert.message}}
    </v-alert>
    <v-row
      class="mb-3"
    >
      <v-col>
        <v-select class="pa 2"
          v-model="query.world"
          :items="worlds"
          label="World"
          @input="getRanking"
        ></v-select>
      </v-col>
      <v-col>
        <v-select class="pa 2"
          v-model="query.category"
          :items="categories"
          label="Job"
          @input="getRanking"
        ></v-select>
      </v-col>
      <v-col>
        <v-select class="pa 2"
          v-model="query.order"
          :items="orders"
          label="Order"
          @input="getRanking"
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="ranking.headers"
      :items="ranking.avatars"
      hide-default-footer
      disable-pagination
      disable-filtering
      disable-sort
      class="ranking"
    >
      <template v-slot:item.avatar="{ item }">
        <v-img class="avatar"
         :src="avatarUrl + item.avatar"
        ></v-img>
      </template>
      <template v-slot:item.job="{ item }">
        <v-img class="job"
        :src="'/static/assets/job-icons/' + item.job + '.png'"
        ></v-img>
      </template>
      <template v-slot:item.world="{ item }">
        <v-img class="world"
        :src="'/static/assets/world-icons/' + item.world + '.png'"
        ></v-img>
      </template>
    </v-data-table>
    <v-pagination
      v-model="this.page"
      :length="length"
      :page="this.page"
      @input="getRanking"
    ></v-pagination>
  </v-container>
</template>

<script>
import { API_URL, WORLDS } from '@/config.js'
import jobs from '@/services/jobhelper'
import ranking from '@/services/ranking'

export default {
  data: () => ({
    length: 1,
    page: 1,
    orders: [
      'Asc',
      'Desc'
    ],
    categories: jobs.categories(),
    worlds: [],
    avatarUrl: API_URL + 'avatar/image/',
    query: {
      page: 1,
      order: 'asc',
      category: 'any',
      world: 1
    },
    ranking: {
      headers: [
        { text: 'Rank', value: 'rank' },
        { text: 'Avatar', value: 'avatar' },
        { text: 'Name', value: 'name' },
        { text: 'World', value: 'world' },
        { text: 'Job', value: 'job' },
        { text: 'Level / Move', value: 'level' }
      ],
      avatars: []
    },
    alert: {
      visible: false,
      color: 'red',
      type: 'error',
      message: ''
    }
  }),
  methods: {
    getWorlds () {
      WORLDS.forEach(world => this.worlds.push(world.name))
    },
    async getRanking () {
      this.query.page = this.page
      this.query.category = this.query.category.toLowerCase()
      this.query.order = this.query.order.toLowerCase()
      WORLDS.forEach(world => {
        if (world.name === this.query.world) {
          this.query.world = world.id
        }
      })
      console.log(this.query.world)
      console.log(this.query)
      try {
        this.ranking.avatars = []
        const response = await ranking.query(this.query)
        console.log(response)
        if (response && response.data.success) {
          const avatars = response.data.data
          this.length = response.last
          this.query.page = response.current
          avatars.forEach(avatar => {
            this.ranking.avatars.push({
              rank: this.query.job !== '' ? avatar.nRank : avatar.nOverallRank,
              avatar: avatar.dwCharacterID,
              name: avatar.character_stat.sCharacterName,
              world: avatar.nWorld,
              job: jobs.get(avatar.character_stat.nJob).category,
              level: avatar.character_stat.nLevel + ` (${avatar.nRankMove})`
            })
          })
        } else if (response.data.error) {
          this.alert.message = response.data.error
          this.alert.visible = true
        }
      } catch (ex) {
        this.alert.message = 'An unknow error occured while contacting the ranking API.'
        this.alert.visible = true
      }
    }
  },
  async mounted () {
    this.getWorlds()
    this.query = {...this.query, ...this.$route.query}
    this.getRanking()
  }
}
</script>

<style scoped>
.avatar {
  position: relative;
  left: -25px;
  transform: scaleX(-1);
  width: 100px;
  display: block;
}
.world {
  width: 90px;
}
.job {
  width: 25px;
}
.ranking {
  margin-bottom: 10px;
}
</style>
