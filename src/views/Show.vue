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
					
                    <div v-if="accessToken && $auth.isAuthenticated()">
						<router-link :to="`/photos/${photo.id}/edit`" class="btn btn-primary" v-if="user_name === photo_name">
							Edit
						</router-link>
						<button class="btn btn__danger" @click="remove" :disabled="isRemoving" v-if="user_name === photo_name">Delete</button>
						<button class="btn btn-info" @click="bookmark" >{{ bookmarked }}</button>
					</div>
                    
				</div>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	
    import Flash from '@/helpers/flash'
    import axios from 'axios'
	
	export default {
		data() {
			return {
                accessToken: '',
                user_name: '',
                photo_name: '',
				isRemoving: false,
				photo: {
					user: {},
					
				},
				storeURL: `http://localhost:8000/api/bookmark`,
				bookmarked: ''
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
					
					if (this.photo.user) {

						this.photo_name = this.photo.user.name					
						
					}
					this.bookmarked = res.data.bookmarked 

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
			},

			bookmark(){

				if (this.$auth.isAuthenticated()) {

					axios({
					method: 'post',
					url: this.storeURL,
					data: this.photo,
					headers: {
					'Authorization': `Bearer ${this.$auth.accessToken}`
					}
					}).then((res) => {
						console.log(this.$auth.isAuthenticated())
                    
					if(res.data.bookmarked) {
						this.bookmarked = res.data.bookmarked
						
                        Flash.setSuccess(res.data.message)
                        this.$router.push(`/photos/${this.photo.id}`)
                    }
                    
                	})
					
				}
				else {

					Flash.setSuccess('Please log in')

				}
			
				

			}
		}
	}
</script>