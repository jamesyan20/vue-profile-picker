<template>
	<div>
		<label :style="this.disabled == false ? 'cursor:pointer' : '' ">
			<slot/>
			<input :disabled="this.disabled" type="file" hidden name="profile" accept="image/*" @change="onFileSelected" />
		</label>
		<transition>
			<div v-if="show" class="mod">
				<div class="mod-content">
					<section class="mod-header">
						<p class="mod-header-title" v-text="this.title"></p>
						<span @click="show = false" class="close">&times;</span>
					</section>
					<section v-if="this.img != ''" class="">
						<cropper ref="cropper" class="cropper"
							imageRestriction="fill-area"
							:stencil-props="{
								aspectRatio: 1/1
							}"
							@change="change"
							image-restriction="fit-area"
							default-boundaries="fill"
							image-class="cropper__image"
							:resize-image="{adjustStencil: true}"
							:src="img"
						/>
					</section>
					<section class="mod-buttons">
						<!-- <button class="mod-button cancel" v-text="this.cancel"></button>-->
						<button @click="$emit('change',final_image); show = false" class="mod-button confirm" v-text="this.confirm"></button>
					</section>
				</div>
			</div>
		</transition>	
	</div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  name: "VueProfilePicker",
  components: {
	Cropper
  },
  props:{
	disabled:{
		type:Boolean,
		default:false,
	},
	title:{
		default:'Choose your Profile Photo',
		type:String
	},
	confirm:{
		default:'Okay',
		type:String
	},
	cancel:{
		default:'Cancel',
		type:String
	},
  },
  data() {
    return {
		show:false,
		img:'',
		final_image:''
	};
  },
  methods:{
	onFileSelected(event){
		this.show = !this.show;
		try{
        		this.img = URL.createObjectURL(event.target.files[0]);
			this.show = true;
		} catch {
			this.img = ''
		}
	},
	change({coordinates,canvas}){
		var _this = this;
		canvas.toBlob(function(blob){
			_this.final_image =  blob;
			//_this.final_image =  URL.createObjectURL(blob);
		},'image/png');
		return coordinates;
	},
	}
};
</script>

<style>
.vue-advanced-cropper__image{
	border-radius:10px;
}
.cropper{
	margin-bottom:20px;
	width:100%;
	aspect-ratio: 1/1;
}
	/* The Modal (background) */
.mod {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
}

/* Modal Content/Box */
.mod-content {
  border-radius:10px;
  background-color: white;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 30%; /* Could be more or less, depending on screen size */
}

.mod-header{
	display:flex;
	justify-content: space-between;
	align-items: center;
	color:#111827;
	margin-bottom:10px;
}

/* The header title */
.mod-header-title{
	font-size: 1.3rem;
	font-weight: 500;
}

/* Buttons */
.mod-buttons{
	font-size:20px;
	display:flex;
	justify-content: flex-end;
	align-items: center;
}
.mod-button{
	border-radius:10px;
	padding:5px 20px 5px 20px;
	color:white;
}
.confirm{
	background-color: #3B82F6;
}
.cancel{
	background-color: #EF4444;
}



/* The Close Button */
.close {
  color: #aaa;
  font-size: 40px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #ff4d4d;
  text-decoration: none;
  cursor: pointer;

  -webkit-transition: background-color 100ms linear;
  -ms-transition: background-color 100ms linear;
   transition: background-color 100ms linear;
}
</style>
