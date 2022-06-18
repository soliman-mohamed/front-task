<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link to="/" class="navbar-brand">Logo</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li v-if="user" class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>

                    <li v-if="user" class="nav-item">
                        <router-link to="/categories" class="nav-link">Categories</router-link>
                    </li>

                    <li v-if="user" class="nav-item">
                        <router-link to="/movies" class="nav-link">Movies</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li v-if="!user" class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li v-if="!user" class="nav-item">
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </li>
                    <li v-if="user" class="nav-item">
                        <button @click="logout" class="btn btn-sm btn-outline-success">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Nav',
    computed: {
        ...mapGetters(['user']),
    },

    methods:{
        logout() {
            this.$store.dispatch('logout')
        },
    }
}
</script>