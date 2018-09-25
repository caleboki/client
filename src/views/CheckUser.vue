<template>
    <div class="checkuser"></div>
</template>

<script>
//import { post } from '@/helpers/api'
import axios from 'axios'
import Flash from '@/helpers/flash'
export default {
  name: 'checkuser',
  data() {

    return {
        form: {
            nickname: this.$auth.user.nickname,
            name: this.$auth.user.name,
            sub: this.$auth.user.sub,
            api_token: this.$auth.accessToken
            
        },
        error: {},
        isProcessing: false
    }

  },

    mounted() {
        
        this.isProcessing = true
        
        this.error = {}
        Flash.setSuccess('You have successfully signed in.')

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/adduser',
            data: this.form
        }).then((res) => {
                
            if(res.data) {
                //Flash.setSuccess('Congratulations! You have now successfully registered.')
                console.log(res.data)
                
                this.$router.push('/')
                }
            this.isProcessing = false
            })
            .catch((err) => {
                if(err.response.status === 422) {
                    this.error = err.response.data.errors
                    console.log(this.error)
                }
                
                this.isProcessing = false
            });

        
        // post('http://localhost:8000/api/adduser', this.form)
        //     .then((res) => {
                
        //         if(res.data) {
        //             //Flash.setSuccess('Congratulations! You have now successfully registered.')
        //             console.log(res.data)
                    
        //             this.$router.push('/')
        //         }
        //         this.isProcessing = false
        //     })
        //     .catch((err) => {
        //         if(err.response.status === 422) {
        //             this.error = err.response.data.errors
        //             console.log(this.error)
        //         }
                
        //         this.isProcessing = false
        //     })
    
        }
    }
</script>
