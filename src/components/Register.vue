<template>
  <v-container width="80vw">
    <v-row
      :no-gutters="true"
      class="mb-3"
    >
      <v-col
        height="10vw"
        :lg="12"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <v-alert 
          :value="alert.visible"
          :dismissible="true"
          :color="alert.color"
          :type="alert.type">
          {{alert.message}}
        </v-alert>
      </v-col>
    </v-row>
    <v-row
        :no-gutters="true"
        class="mb-3"
      >
        <v-col
          height="25vw"
          :lg="6"
          :md="6"
          :sm="6"
          :xs="6"
        >
          <v-img style="margin-left:20%"
              position="center"
              width="50%"
              src="/static/assets/Hello.png"
            >
          </v-img>
        </v-col>

        <v-col
          height="25vw"
          :lg="5"
          :md="5"
          :sm="5"
          :xs="5"
        >

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="30"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              type="password"
              :counter="30"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Gender is required']"
              label="Gender"
              required
            ></v-select>

            <v-date-picker
              v-model="birthday"
              :rules="birthdayRules"
              width="100%"
              label="Birthday"
              required>
            </v-date-picker>

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              width="60%"
            >
              Submit
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import Authenticator from '@/services/authenticator'
import { GRANT_URL } from '@/config.js'

export default {
  data: () => ({
    code: null,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Name must be less than 30 characters'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 30) || 'Password must be less than 30 characters'
    ],
    select: null,
    items: [
      'Male',
      'Female',
      'Honestly Both'
    ],
    birthday: new Date().toISOString().substr(0, 10),
    birthdayRules: [
      v => !!v || 'Birthday is required.',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    checkbox: false,
    alert: {
      visible: false,
      color: 'red',
      type: 'error',
      message: ''
    }
  }),
  methods: {
    getGender () {
      let gender = 2
      if (this.select === 'Male') gender = 0
      else if (this.select === 'Female') gender = 1
      return gender
    },
    setAlert (response) {
      if (!response || response.status !== 200) {
        this.$set(this.alert, 'color', 'red')
        this.$set(this.alert, 'type', 'error')
        this.$set(this.alert, 'message', 'An unknown error has occured. Please try again later or contact the site admin if the problem persists.\r\nMost of the time this error is related to your discord code being no longer valid, so please navigate to the home page and try again.')
        this.$set(this.alert, 'visible', true)
        return
      }
      if (response.data.success) {
        this.$set(this.alert, 'color', 'green')
        this.$set(this.alert, 'type', 'success')
        this.$set(this.alert, 'message', 'Your account has been registered succesfully! You can now proceed to login.')
        this.$set(this.alert, 'visible', true)
      } else if (response.data.error) {
        this.$set(this.alert, 'color', 'red')
        this.$set(this.alert, 'type', 'error')
        this.$set(this.alert, 'message', response.data.error)
        this.$set(this.alert, 'visible', true)
      }
    },
    async validate () {
      if (this.$refs.form.validate()) {
        Authenticator.register({
          name: this.name,
          password: this.password,
          gender: this.getGender(),
          code: this.code,
          birthday: this.birthday
        }).then(response => {
          this.setAlert(response)
        }).catch(error => {
          console.log(error)
          this.setAlert(null)
        })
      }
    }
  },
  mounted () {
    if (!this.$route.query.code) {
      location.replace(GRANT_URL)
    } else {
      this.code = this.$route.query.code
    }
  }
}
</script>

<style scoped>
  #title {
    font-size: 80px
  }
</style>
