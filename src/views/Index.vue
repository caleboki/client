<template>
	<div class="photo__list">
		<div class="photo__item" v-for="photo in photos">
			<router-link class="photo__inner" :to="`/photos/${photo.id}`" style="margin-bottom:0px;">
				
				<img :src="'http://localhost:8000/images/' + photo.image" v-if="photo.image">
				<p class="photo__name">{{photo.name}} </p>
				
			</router-link>
			<!-- <div style="margin-left:240px;"><button type="button" class="btn btn-info btn-block">Bookmark</button></div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
    //import { get } from '@/helpers/api'
    import axios from 'axios'
	export default {
		data() {
			return {
				photos: []
			}
		},
		created() {
            
            console.log(this.$auth.accessToken)
            axios.get('http://localhost:8000/api/photos')
                	.then((res) => {
					this.photos = res.data.photos
					console.log(res.data)
                    
            	})
		}
	}
</script>