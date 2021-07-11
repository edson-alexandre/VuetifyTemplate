<template>
    <v-container>
        <v-card>
            <v-card-title>Cadastro de Usuários</v-card-title>
            <v-data-table :headers="headers" :items="users">
            <template v-slot:[`item.actions`]={item}>
                <v-btn rounded small color="secondary" @click="edit(item.id)">Editar</v-btn>
            </template>  
        </v-data-table>
        <v-card-actions>
            <v-btn color="primary" @click="edit(0)">Novo</v-btn>
        </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '../../../global'

export default {
    data() {
        return {
            headers: [
                {value: 'id', text: "Código"},
                {value: 'username', text: "Nome"},
                {value: 'email', text: "Email"},
                {value: 'Role.role_name', text: "Papel"},
                {value: 'actions', text: "Ações"},
            ],
            users: []
        }
    },
    methods: {
        getUsers() {
            axios({
                method: 'GET',
                url: `${baseApiUrl}/users`
            })
            .then(res => {
                res
                this.users = res.data
            })
            .catch( error => console.log(error))
        },
        edit(id){
            this.$router.push({path: `/usuario/${id}`})
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>

<style>

</style>