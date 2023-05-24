<template>
  <div>
	<div class="p-4 flex flex-row space-x-4 items-center bg-white shadow-md rounded-xl">
		<vue-profile-picker @change="onChange">
			<div class="group relative w-full">
				<div class="group-hover:opacity-100 opacity-0">
					<div class="group hover:opacity-100 flex items-center justify-center opacity-80 absolute rounded-full h-24 w-24 bg-gray-600">
						<div class="group-hover:font-bold flex items-center justify-center space-x-2 text-lg text-gray-200">
							<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<rect width="48" height="48" fill="url(#pattern0)"/>
							<defs>
								<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
									<use xlink:href="#image0_6_4" transform="scale(0.0208333)"/>
								</pattern>
								<image id="image0_6_4" width="48" height="48" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA00lEQVR4nO2WMQ7CMBAE/SgKvpWKEkr+l2+E2/uBkZGQKIhjBZS7lXYkV25m1z7LpQgh0gBgMjMDMLv7qTAB4AagfixfluVcSOUrTQisy3OEcPfLRoD8IbB9Cq8QqQcbYyHmLKK3zl5dW2b2ON54XXBPiOl4646Ymd1HB9vMriWKXqs2ECKtPMau09e9TPK1dxIU8sgWYo88soT4RR4kAyv5v6Pmo1DzUaj5KKB3Pgio+SCg5gMB66/yDbV8g1q+QS3foJZvUMs3qOUb1PJCCFGO4gm+i37JSdHEFgAAAABJRU5ErkJggg=="/>
							</defs>
							</svg>
						</div>
					</div>
				</div>
				<div v-bind:style="`background-image: url('${this.image}')`" class="bg-cover h-24 w-24 rounded-full"></div>
			</div>
		</vue-profile-picker>
		<div class="flex flex-col space-y-2 text-gray-800">
			<span class="font-bold">{{this.name}}</span>
			<span class="">Super Hero</span>
		</div>
	</div>
  </div>
</template>

<script>
import VueProfilePicker from '../VueProfilePicker/VueProfilePicker.vue';
export default {
  name: 'App',
props:["name"],
  components: {
	VueProfilePicker
},
data(){
		return{
			image:'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
		}
	},
methods:{
	onChange(blob) {
		var im = URL.createObjectURL(blob);
	
		this.image = im;
		this.$toast.open({
			message: 'Wow! You have a beautiful face!',
			type: 'success',
		});
	}
},
}
</script>

<style>

</style>
