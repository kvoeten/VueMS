module.exports = {
  APP_TITLE: 'VueMS',
  API_URL: 'http://127.0.0.1/',
  CLIENT_ID: '1',
  CLIENT_SECRET: 'WnlXJ34B9nhIBjf5oAg12OwdLT6lopGs2cewCuVc',
  GRANT_URL: 'https://discordapp.com/oauth2/authorize?client_id=541722262458335232&redirect_uri=http%3A%2F%2F127.0.0.1:8080/register&response_type=code&scope=identify%20email',
  NAVIGATION_DRAWER: [
    {title: 'Home', url: '/', icon: 'mdi-home'},
    {title: 'Logout', url: '/logout', icon: 'mdi-account-off', loggedin: true},
    {title: 'Login', url: '/login', icon: 'mdi-account-key', loggedin: false},
    {title: 'Register', url: '/register', icon: 'mdi-account-plus', loggedin: false},
    {title: 'News', url: '/logout', icon: 'mdi-comment-text-multiple'},
    {title: 'Ranking', url: '/logout', icon: 'mdi-home'},
    {title: 'Downloads', url: '/logout', icon: 'mdi-download'},
    {title: 'Account', url: '/logout', icon: 'mdi-cog', loggedin: true},
    {title: 'Manage News', url: '/logout', icon: 'mdi-cog', loggedin: false, grade: 3},
    {title: 'Manage Users', url: '/logout', icon: 'mdi-cog', loggedin: false, grade: 5}
  ]
}
