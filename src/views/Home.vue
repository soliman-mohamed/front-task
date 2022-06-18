<template>
  <div class="home">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="mb-3">
          <label for="category" class="form-label">movies By Category</label>
          <select @change="filterCategory()" v-model="category" class="form-control" id="category">
            <option value="">Choose category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
          </select>
        </div>
        <div class="mb-3">
          <button @click="createForm()" class="btn btn-sm btn-outline-success">Add New Movie</button>
        </div>
      </div>
      <hr />

      <div class="row justify-content-center">
        <div class="col-md-4" v-for="movie in movies" :key="movie.id">
          <Movie @deleteMovie="deleteMovie" @updateMovie="createForm" :movie="movie" class="mb-4" />
        </div>
      </div>

      <MovieForm @reGetMovies="getMovies" @closeModal="modal = false" :form="form" :categories="categories" :create="create"  :modal="modal" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from '../components/Movie.vue'
import MovieForm from '../components/MovieForm.vue'
import Form from "vform";

export default {
  name: 'Home',
  components: {
    Movie, MovieForm
  },
  data() {
    return {
      movies: [],
      categories: [],
      category: this.$route.params ? this.$route.params.category : "",
      uploadPercentage: 0,
      form: new Form({
        headers: {
          'enctype': "multipart/form-data"
        },
        id: "",
        name: "",
        description: "",
        image: "",
        category_id: ""
      }),
      create: false,
      modal: false
    }
  },
  created() {
    this.getMovies();
    this.getCategory();
  },
  methods:{
    async getMovies(){
      if (this.category){
        await axios.get('moviesByCategory/'+this.category).then((res)=>{
          if (res.data.status === "success"){
            this.movies = res.data.message;
          }
        }).catch();
      }else {
        await axios.get('movies').then((res)=>{
          if (res.data.status === "success"){
            this.movies = res.data.message;
          }
        }).catch();
      }
    },
    async getCategory(){
      await axios.get('category').then((res)=>{
        if (res.data.status === "success"){
          this.categories = res.data.message;
        }
      }).catch();
    },
    filterCategory(){
      this.getMovies();
    },
    createForm(movie){
      this.form.reset();
      this.form.errors.clear();
      if (movie){
        this.create = false;
        this.form.fill(movie);
      }else {
        this.create = true;
      }
      // this.form.image = "";
      this.modal = true
    },
    async deleteMovie(id){
      await axios.delete('movies/' + id).then((res)=>{
        if (res.data.status === "failed"){
          alert(res.data.status);
        }else {
          this.getMovies();
        }
      }).catch(()=>{});
    }
  }
}
</script>