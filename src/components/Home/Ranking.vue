<template>
  <v-container>
    <v-row
        :no-gutters="true"
        class="mb-3"
      >
        <v-col
          height="500px"
          :lg="10"
          :md="10"
          :sm="10"
          :xs="10"
        >
        
        <div class="block">
          <v-parallax src="/static/assets/Background.png">
          <v-img class="fountain"
              src="/static/assets/Ranking.png"
            >
            </v-img>
          </v-parallax>
        </div>        
          
        </v-col>

        <v-col
          :lg="2"
          :md="2"
          :sm="2"
          :xs="2"
        >
          <v-data-table
            :headers="ranking.headers"
            :items="ranking.avatars"
            hide-default-footer
            :disable-pagination="true"
            class="ranking"
          >
            <template v-slot:item.avatar="{ item }">
              <v-img class="avatar"
              :src="avatarUrl + item.id"
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
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { API_URL } from '@/config.js'
import jobs from '@/services/jobhelper'
import ranking from '@/services/ranking'

export default {
  components: {

  },
  computed: {
    
  },
  data: () => ({
    avatarUrl: API_URL + '/avatar/image/',
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
    }
  }),
  async mounted () {
    const response = await ranking.get()
    if (response && response.data.success) {
      const avatars = response.data.data
      for (let i = 0; i < avatars.length && i < 3; ++i) {
        this.ranking.avatars.push({
          rank: avatars[i].nRank,
          avatar: avatars[i].dwCharacterID,
          name: avatars[i].character_stat.sCharacterName,
          world: avatars[i].nWorld,
          job: jobs.get(avatars[i].character_stat.nJob).category,
          level: avatars[i].character_stat.nLevel + ` (${avatars[i].nRankMove})`
        })
      }
    }
  }
}
</script>

<style scoped>
  .block {
    height: 500px;
    display: block;
    overflow: visible;
  }
  .v-parallax {
    position: absolute;
    width: 100vw;
    left: 0;
    overflow: hidden;
  }
  .ranking {
    position: absolute;
    background-color:rgb(0,0,11, 0.80);
    margin-top: 50px;
    width: 650px;
    right: 15vw;
  }
  @media all and (max-width: 1000px) {
    .ranking { 
      width: 70vw;
    }
  }
  .avatar {
    position: relative;
    left: -50px;
    top: -8px;
    transform: scaleX(-1);
    height: 130px;
    display: block;
  }
  .world {
    width: 90px;
  }
  .job {
    width: 25px;
  }
  .fountain {
    position: absolute; 
    width: 470px;
    left: 0; 
    bottom: -40px; 
    overflow: visible;
  }
  @media all and (max-width: 470px) {
    .fountain { 
      width: 100vw;
    }
  }
</style>
