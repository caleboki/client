<template>
	<div class="photo__show">
		<div class="photo__row">
			<div class="photo__image">
				<div class="photo__box">
					
					<img :src="'http://localhost:8000/images/' + photo.image" v-if="photo.image">
				</div>
			</div>
			<div class="photo__details">
				<div class="photo__details_inner">
					<small v-if="photo.user">Submitted by: {{photo.user.name}}</small>
					<h1 class="photo__title">{{photo.name}}</h1>
					<p class="photo__description">{{photo.description}}</p>
					<button type="button" class="btn btn-info btn-block">Bookmark This Image</button>
					
                    <div v-if="accessToken && user_name === photo_name">
						<router-link :to="`/photos/${photo.id}/edit`" class="btn btn-primary">
							Edit
						</router-link>
						<button class="btn btn__danger" @click="remove" :disabled="isRemoving">Delete</button>
					</div>
                    
				</div>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	//import Auth from '../../store/auth'
    import Flash from '@/helpers/flash'
    import axios from 'axios'
	//import { get, del } from '@/helpers/api'
	export default {
		data() {
			return {
                accessToken: '',
                user_name: '',
                photo_name: '',
				isRemoving: false,
				photo: {
					user: {},
					
				}
			}
		},
		created() {   
			
            if (this.auth()) {
                this.accessToken = this.$auth.accessToken
				this.user_name = this.$auth.user.name
				console.log(this.$auth.user.name)  
            }

            axios({
                method: 'get', 
                url: `http://localhost:8000/api/photos/${this.$route.params.id}`,
                headers: {
                    Authorization: 'Bearer ' + this.$auth.accessToken
                }
                }).then((res) => {

					this.photo = res.data.photo
					
					this.photo_name = this.photo.user.name
					//console.log(this.photo.user.name)   

                })
            
		},
		methods: {

            auth() {
               if (this.$auth.accessToken != null) {

                   return true
                   
               }
               return false
            },
			remove() {               
                this.isRemoving = false 
                axios({
                    method: 'DELETE', 
                    url: `http://localhost:8000/api/photos/${this.$route.params.id}`,
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.accessToken
                    }
                    }).then((res) => {

						
						Flash.setSuccess('You have successfully deleted this photo!')
						this.$router.push('/')
                        

					}).catch(function (error) {
						// handle error
						console.log(error.data);
					})
			}
		}
	}
</script>