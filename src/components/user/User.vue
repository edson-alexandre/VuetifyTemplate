<template>
    <v-container>
        <v-card>
            <v-card-title>CADASTRO DE USUÁRIOS</v-card-title>
            <v-container>
                <v-form v-model="valid" ref="form">
                    <v-row>
                        <v-col cols="12" md=12>
                            <v-text-field 
                                v-model="user.username"
                                :rules="usernameRules"
                                label="Nome do usuário"
                                />
                        </v-col>
                        <v-col cols="12" md=12>
                            <v-text-field
                                v-model="user.email"
                                :rules="emailRules"
                                label="E-mail do usuário"
                                />
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-file-input
                                label="Imagens do usuário"
                                id="file"
                                ref="file"
                                v-model="files"
                                multiple
                                />
                        </v-col>
                    </v-row>
                </v-form>   
                  <v-list dense>
                    <v-subheader>Anexos</v-subheader>                    
                        <v-list-item
                        v-for="(file, i) in fileList"
                        :key="i"
                        style="cursor: pointer"
                        @click="getFile(file)"
                        >
                         <v-list-item-icon>
                            <v-icon v-text="'mdi-clipboard-file'"></v-icon>
                        </v-list-item-icon>
                         <v-list-item-content>
                            <v-list-item-title v-text="file">file</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list> 
            </v-container>   
            <v-progress-linear
                indeterminate
                v-if="loading"      
            ></v-progress-linear>         
            <v-card-actions right>
                <v-btn color="primary" @click="save">Salvar</v-btn>
                <v-btn color="secondary" @click="reset">Cancelar</v-btn>
                <v-btn color="success" @click="sendFiles">Enviar Anexos</v-btn>
            </v-card-actions>
        </v-card>            
    </v-container>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import { baseApiUrl } from '../../../global'

export default {
    data() {
        return {
            loading: false,
            fileList: [],
            files:null,
            valid: false,
            usernameRules: [
                v => !!v || 'É necessário informar o nome',
                //v => v.length >5 || 'O nome deve ter ao menos cinco caracteres'
            ],
            emailRules: [
                v => !!v || 'É necessário informar o e-mail',
                v => /.+@.+/.test(v) || 'Email inválido'
            ],
            user: {}
        }
    },
    methods: { 
        getFileList() {
            axios({
                method: 'GET',
                url: `${baseApiUrl}/userfilename/${this.user.id}`
            })
            .then(res => { 
                this.fileList = res.data
            })
        },
        getFile(fileName) {
            axios({
                method: 'GET',
                url: `${baseApiUrl}/userfile/${this.user.id}?fileName=${fileName}`,
                responseType:'blob'
            })
            .then(res => { 
                const blob = new Blob([res.data], { type: 'application/pdf' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                URL.revokeObjectURL(link.href)
            })
        },
        sendFiles() {
            this.loading = true
            const data = new FormData()
            this.files.forEach(file => {
                data.append('file', file, file.name);                       
            })            
            axios({
                method: 'POST',
                url: `${baseApiUrl}/userfiles/${this.user.id}`,
                headers: {
                     'Content-Type': 'multipart/form-data'
                },
                data: data
            })
            .then( res => {
                res
                alert('Arquivos salvos com sucesso!')
                this.loading = false
                this.getFileList()
                //this.navigateToUsers()
            })
            .catch(error => console.log(error))
        },    
        navigateToUsers() {
            this.$router.push({ path: '/usuario' })
        },
        async getUser() {            
            await axios({
                method: 'get',
                url: `${baseApiUrl}/users/${this.$route.params.id}`
            })
            .then(res => {
                if(res.data) this.user=res.data 
            })
            .catch(error => console.log(error))
        },
        save() {
            if(!this.valid) {
                alert('Por favor informe dados válidos para o cadastro')
                return
            }      
            axios({
                method: this.$route.params.id==0 ? 'POST' : 'PATCH',
                url: this.$route.params.id==0 ? `${baseApiUrl}/users` : `${baseApiUrl}/users/${this.user.id}`,                
                data: this.user
            })
            .then( res => {
                res
                this.navigateToUsers()
            })
            .catch(error => console.log(error))
            
        },
        reset() {
            //this.$refs.form.reset()   
            this.navigateToUsers()         
        },
    },
    async mounted() {        
        await  this.getUser()
        this.getFileList()
    }
}
</script>

<style>

</style>