<template>
  <div id="app" class="">
	<div class="flex items-center justify-center w-full bg-gray-200 min-h-screen">
		<div class="w-2/3 grid grid-cols-3 gap-4">
			<Hero v-for="(hero,index) in heros" :key="index" :name="hero"></Hero>
		</div>
	</div>
  </div>
</template>

<script>
import Hero from "./Components/Hero.vue";
export default {
  name: 'App',
  components: {
	Hero
},
data(){
		return{
			heros:[
				'Peter Parker','Kara Danvers','Tony Stark','Thor'
			],
			image:'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
		}
	}
  }
</script>

<style>

</style>
