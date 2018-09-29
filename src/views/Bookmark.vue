<template>
	<div class="photo__list" >
		<div class="photo__item" v-for="photo in photos">
			<router-link class="photo__inner" :to="`/photos/${photo.id}`" style="margin-bottom:0px;">
				
				<img :src="'http://localhost:8000/images/' + photo.image" v-if="photo.image">
				<p class="photo__name">{{photo.name}} </p>
				
			</router-link>
			
		</div>

		
	</div>
</template>
<script type="text/javascript">
    import axios from 'axios'
	export default {
		data() {
			return {
				photos: [],
			}
		},
		created() {
            
            axios({
                method: 'get', 
                url: `http://localhost:8000/api/bookmark`,
                headers: {
                    Authorization: 'Bearer ' + this.$auth.accessToken
                }
                }).then((res) => {
					this.photos = res.data.photos
					
                })
		}
	}
</script>