<template>
  <v-container class="frame">
    <v-alert 
      :value="alert.visible"
      :dismissible="true"
      :color="alert.color"
      :type="alert.type">
      {{alert.message}}
    </v-alert>
    <v-select
      v-model="category"
      :items="categories"
      value=0
      label="Category"
    ></v-select>
    <v-text-field
      v-model="title"
      :counter="30"
      label="Title"
      required
    ></v-text-field>
    <v-textarea
      v-model="description"
      :counter="150"
      label="Description"
      required
    ></v-textarea>
    <editor-menu-bar
      :editor="editor" 
      v-slot="{ commands, isActive }"
    >
      <v-row
        class="px-2 pb-2 ma-0"
        justify="space-between"
      >
        <v-btn-toggle class="group"
          v-model="formatting"
          dense
          background-color="primary"
          dark
          multiple
        >
          <v-btn
            :class="{ 'v-item--active': isActive.bold() }"
            @click="commands.bold"
          >
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.strike() }"
            @click="commands.strike"
          >
            <v-icon>mdi-format-strikethrough</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle class="group"
          v-model="blocks"
          dense
          background-color="primary"
          dark
        >
          <v-btn
            :class="{ 'v-item--active': isActive.code() }"
            @click="commands.code"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <v-icon>mdi-format-pilcrow</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <v-icon>mdi-code-not-equal-variant</v-icon>
          </v-btn>
          <v-btn
            @click="commands.horizontal_rule"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            @click="showImagePrompt(commands.image)"
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle class="group"
          v-model="headers"
          dense
          background-color="primary"
          dark
        >
          <v-btn
            :class="{ 'v-item--active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <v-icon>mdi-format-header-1</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon>mdi-format-header-2</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <v-icon>mdi-format-header-3</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle class="group"
          v-model="actions"
          dense
          background-color="primary"
          dark
        >
          <v-btn
            :class="{ 'v-item--active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-btn>
          <v-btn
            :class="{ 'v-item--active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <v-icon>mdi-format-quote-close</v-icon>
          </v-btn>
          <v-btn
            @click="commands.undo"
          >
            <v-icon>mdi-undo-variant</v-icon>
          </v-btn>
          <v-btn
            @click="commands.redo"
          >
            <v-icon>mdi-redo-variant</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </editor-menu-bar>
    <v-divider class="group" />
    <editor-content :editor="editor" />
    <v-btn class="submit"
      color="success"
      @click="post"
    >
      Save
    </v-btn>
  </v-container>
</template>

<script>
import news from '@/services/news'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  Image,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  computed: {
    
  },
  data: () => ({
    update: false,
    author: '',
    title: '',
    date: '',
    description: '',
    category: 'Update',
    formatting: [],
    headers: [],
    blocks: [],
    actions: [],
    alert: {
      visible: false,
      color: 'red',
      type: 'error',
      message: ''
    },
    categories: [
      'Update',
      'Maintenance',
      'Event',
      'Info'
    ],
    editor: new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: `
        <h2>
          You can write your article here!
        </h2>
        <p>
          You are able to type directly into this page. Your work here reflects how the article looks once loaded into this page.
        </p>
      `,
      onUpdate: ({ getJSON, getHTML }) => {
        this.html = getHTML()
      }
    })
  }),
  methods: {
    showImagePrompt (command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    async post () {
      const article = {
        title: this.title,
        category: this.category,
        content: this.editor.getHTML(),
        description: this.description
      }
      if (this.update) {
        this.put(article)
      } else {
        this.store(article)
      }
    },
    async put (article) {
      try {
        const response = await news.update(article, this.$route.params.id)
        this.respond(response)
      } catch (err) {
        this.respond(null)
      }
    },
    async store (article) {
      try {
        const response = await news.store(article)
        this.respond(response)
      } catch (err) {
        this.respond(err)
      }
    },
    respond (response) {
      console.log(response)
      if (response && response.data) {
        if (response.data.success) {
          this.alert.color = 'green'
          this.alert.type = 'success'
          this.alert.message = 'Succesfully saved the article!'
        } else if (response.data.error) {
          this.alert.message = response.data.error
        } else {
          this.alert.message = 'Unable to save the article. Did your session expire?'
        }
        this.alert.visible = true
      } else {
        this.alert.message = 'Unable to save the article. Did your session expire?'
        this.alert.visible = true
      }
    }
  },
  async mounted () {
    // if the article already exists, load it for editing
    const response = await news.getArticle(this.$route.params.id)
    if (response && response.data.success) {
      const article = response.data.data
      this.author = article.author
      this.title = article.title
      this.date = news.getDate(article.created_at)
      this.editor.setContent(article.content)
      this.description = article.description
      this.update = true
    } else if (this.$route.params.id) {
      this.alert.message = 'Unable to load the requested article.'
      this.alert.visible = true
    }
  }
}
</script>

<style scoped>
  .frame {
    width: 85vw;
    color: white;
    text-align: left;
  }
  .group {
    margin-bottom: 5px;
  }
  .submit {
    margin-left: 25%;
    width: 50%;
  }
</style>
