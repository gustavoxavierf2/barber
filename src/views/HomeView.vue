<template>
  <v-main style="min-height: 768px; display: flex" class="Content">
  </v-main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>


<style scoped>
  .Content{
  background-color: black;
  opacity: 90%;
  background-image: url("../assets/BackGround.jpg");
  background-size: cover;
  margin-left: 180px;
}
</style>