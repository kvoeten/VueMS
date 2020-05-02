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

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="login"
              width="60%"
            >
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import Authenticator from '@/services/authenticator'

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
    setAlert (message) {
      this.$set(this.alert, 'color', 'red')
      this.$set(this.alert, 'type', 'error')
      this.$set(this.alert, 'message', message)
      this.$set(this.alert, 'visible', true)
    },
    async validate () {
      if (this.$refs.form.validate()) {
        Authenticator.login({
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
    },
    async login () {
      try {
        const response = await Authenticator.login({
          username: this.name,
          password: this.password
        })
        if (response.error) {
          alert(response.error)
        } else {
          const info = {
            token: response.data.access_token,
            expires: response.data.expires_in * 1000
          }
          console.log(info)
          this.$store.dispatch('setToken', info)
          const user = await Authenticator.user()
          this.$store.dispatch('setUser', user.data)
          this.$router.push({
            name: 'home'
          })
        }
      } catch (error) {
        console.log(error)
        this.setAlert('An unknown error has occured. Please try again later or contact the site admin if the problem persists.')
      }
    }
  }
}
</script>

<style scoped>
</style>
