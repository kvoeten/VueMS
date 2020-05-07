<template>
  <v-container class="article">
    <v-alert 
      :value="alert.visible"
      :dismissible="true"
      :color="alert.color"
      :type="alert.type">
      {{alert.message}}
    </v-alert>
    <h3 class="date"><i>{{`${author}, ${date}`}}</i></h3>
    <h1 class="title">{{title}}</h1>
    <v-divider></v-divider>
    <span v-html="content"></span>
  </v-container>
</template>

<script>
import news from '@/services/news'

export default {
  data: () => ({
    author: '..', 
    date: '..',
    title: 'Loading...',
    content: '',
    alert: {
      visible: false,
      color: 'red',
      type: 'error',
      message: ''
    }
  }),
  async mounted () {
    const response = await news.getArticle(this.$route.params.id)
    if (response && response.data.success) {
      const article = response.data.data
      this.author = article.author
      this.title = article.title
      this.date = news.getDate(article.created_at)
      this.content = article.content
    } else {
      this.alert.visible = true
      this.alert.message = 'Unable to find the news article!'
    }
  }
}
</script>

<style scoped>
  .article {
    width: 85vw;
    color: white;
    text-align: left;
  }
  .title {
    font-size: 120px;
    width: 50%;
  }
  .date {
    width: 50%;
    float: right;
    text-align: right;
  }
</style>
