<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/records">Records</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div class="logo" > <span class="s">S</span>nake Game</div>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

@font-face {
    font-family: 'Aquila';
    src: url('assets/aquila.regular.ttf') format('truetype');
}

body, button {
  color: $color-text;
  background-color: $color-surface;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
}

#app {
    text-align: center;
  }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: $color-accent;
    }
  }
}

.logo {
  margin-top: 0.5em;
  font-family: 'Aquila';
  font-size: 3em;
  .s{
    color: $color-accent;
  }
}
</style>
