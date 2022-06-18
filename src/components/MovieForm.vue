<template>
    <!-- Modal -->
    <div class="modal" :class="modal ? 'd-block' : ''" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{create ? 'Add Movie' : 'Edit Movie ' + this.form.id}}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="create ? createNewMovie() : updateMovie()">
                        <div class="progress mb-3" v-if="uploadPercentage !== 0">
                            <div class="progress-bar" role="progressbar" :style="'width:' + uploadPercentage +'%;'"  aria-valuemin="0" aria-valuemax="100">{{uploadPercentage}}%</div>
                        </div>
                        <div class="alert alert-danger" v-if="form.errors.has('error')"
                             v-html="form.errors.get('error')"></div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" v-model="form.name" :class="{'is-invalid': form.errors.has('name')}" class="form-control" id="name" placeholder="Name">
                            <span class="text-danger" v-if="form.errors.has('name')"
                                  v-html="form.errors.get('name')"></span>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea rows="5" v-model="form.description" :class="{'is-invalid': form.errors.has('description')}" class="form-control" id="description" placeholder="Description"></textarea>
                            <span class="text-danger" v-if="form.errors.has('description')"
                                  v-html="form.errors.get('description')"></span>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">category</label>
                            <select v-model="form.category_id" :class="{'is-invalid': form.errors.has('category_id')}" class="form-control" id="category">
                                <option value="">Select category</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                            </select>
                            <span class="text-danger" v-if="form.errors.has('category_id')"
                                  v-html="form.errors.get('category_id')"></span>
                        </div>

                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <input @change="handleImageUpload()" :class="{'is-invalid': form.errors.has('image')}" accept="image/x-png,image/gif,image/jpeg,image/jpg" ref="image" type="file" id="image" class="form-control" />
                            <span class="text-danger" v-if="form.errors.has('image')" v-html="form.errors.get('image')"></span>
                        </div>
                        <div class="mb-3 d-flex justify-content-between align-items-end">
                            <button type="submit" :disabled="form.busy" class="btn btn-outline-success">
                                <span v-if="form.busy" aria-hidden="true" role="status" class="spinner-border spinner-border-sm"></span>
                                {{create ? 'Add Movie' : 'Edit Movie'}}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'MovieForm',
        props: {
            form: {type: Object, default:  () => {}},
            create: {type: Boolean, default:  () => false},
            modal: {type: Boolean, default:  () => false},
            categories: {type: Array, default:  () => []},
        },
        data(){
            return{
                uploadPercentage: 0,
            }
        },
        watch: {
            modal(){
                // this.form.image = "";
                this.$refs.image.value = null;
            }
        },
        methods: {
            handleImageUpload(){
                let image = this.$refs.image.files;
                if (image.length > 0){
                    this.form.image = image[0];
                }else {
                    this.form.image = "";
                }
            },
            closeModal(){
                this.$emit('closeModal')
            },
            reGetMovies(){
                this.$emit('reGetMovies')
            },
            async createNewMovie(){
                await this.form.post('movies', {
                    onUploadProgress: function( progressEvent ) {
                        this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                    }.bind(this)}).then((res)=>{
                    if (res.data.status === "failed"){
                        this.form.errors.set(res.data.message);
                    }else {
                        // success
                        this.form.reset();
                        this.form.errors.clear();
                        this.closeModal();
                        this.reGetMovies();
                    }
                }).catch(()=>{}).finally(()=>{
                    this.uploadPercentage = 0;
                });
            },
            async updateMovie(){
                await this.form.put('movies/' + this.form.id, {
                    onUploadProgress: function( progressEvent ) {
                        this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                    }.bind(this)}).then((res)=>{
                    if (res.data.status === "failed"){
                        this.form.errors.set(res.data.message);
                    }else {
                        // success
                        this.form.reset();
                        this.form.errors.clear();
                        this.closeModal();
                        this.reGetMovies();
                    }
                }).catch(()=>{}).finally(()=>{
                    this.uploadPercentage = 0;
                });
            },
        }
    }
</script>