<template>
  <div class="home">
    <TideDisplay/>
  </div>
</template>

<script>
// @ is an alias to /src
import TideDisplay from '../components/TideDisplay.vue'

export default {
  name: 'HomeView',
  components: {
    TideDisplay
  }
}
</script>
