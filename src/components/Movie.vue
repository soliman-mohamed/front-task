<template>
    <div class="home">
        <div class="card mb-4">
            <img class="card-img-top img-thumbnail" :src="movie.image" :alt="movie.name" style="height: 150px;">
            <div class="card-body">
                <h5 class="card-title">{{movie.name}}</h5>
                <p class="card-text">{{movie.description}}</p>
                <small class="text-muted"><b>Created at:</b> {{ new Date(movie.created_at).toLocaleString() }}</small>
            </div>
            <div class="card-footer">
                <button @click="updateMovie(movie)" class="btn mx-2 btn-sm btn-outline-info">edit</button>
                <button @click="deleteMovie(movie.id)" class="btn mx-2 btn-sm btn-outline-danger">delete</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Movie',
    props: {
        movie: {type: Object, default:  () => {}},
    },
    methods: {
        updateMovie(movie) {
            this.$emit('updateMovie', movie)
        },
        deleteMovie(movie) {
            this.$emit('deleteMovie', movie)
        }
    }
}
</script>
