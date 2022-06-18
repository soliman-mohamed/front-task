<template>
    <div class="categories">
        <div class="container">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h6 class="card-title">Categories</h6>
                    <button @click="createForm()" class="btn btn-sm btn-outline-success">Add New Category</button>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Created at</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in categories" :key="category.id">
                                <td>{{index + 1}}</td>
                                <td>{{category.name}}</td>
                                <td>{{new Date(category.created_at).toLocaleString() }}</td>
                                <td>
                                    <button @click="goToHome(category.id)" class="btn mx-2 btn-sm btn-outline-success">Category movies</button>
                                    <button @click="createForm(category)" class="btn mx-2 btn-sm btn-outline-info">edit</button>
                                    <button @click="deleteCategory(category.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal" :class="modal ? 'd-block' : ''" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{create ? 'Add Category' : 'Edit Category'}}</h5>
                        <button type="button" class="btn-close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="create ? createNewCategory() : updateCategory()">
                            <div class="alert alert-danger" v-if="form.errors.has('error')"
                                 v-html="form.errors.get('error')"></div>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" v-model="form.name" :class="{'is-invalid': form.errors.has('name')}" class="form-control" id="name" placeholder="Name">
                                <span class="text-danger" v-if="form.errors.has('name')"
                                      v-html="form.errors.get('name')"></span>
                            </div>
                            <div class="mb-3 d-flex justify-content-between align-items-end">
                                <button type="submit" :disabled="form.busy" class="btn btn-outline-success">
                                    <span v-if="form.busy" aria-hidden="true" role="status" class="spinner-border spinner-border-sm"></span>
                                    {{create ? 'Add Category' : 'Edit Category'}}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "vform";
export default {
    name: 'categories',
    data(){
        return {
            categories: [],
            form: new Form({
                id: "",
                name: ""
            }),
            create: false,
            modal: false
        }
    },
    created(){
        this.getCategory();
    },
    methods:{
        async getCategory(){
            await axios.get('category').then((res)=>{
                if (res.data.status === "success"){
                    this.categories = res.data.message;
                }
            }).catch();
        },
        createForm(category){
            this.form.reset();
            this.form.errors.clear();
            if (category){
                this.create = false;
                this.form.fill(category);
            }else {
                this.create = true;
            }
            this.modal = true
        },
        closeModal(){
            this.modal = false
        },
        async createNewCategory(){
            await this.form.post('category').then((res)=>{
                if (res.data.status === "failed"){
                    this.form.errors.set(res.data.message);
                }else {
                    // success
                    this.form.reset();
                    this.form.errors.clear();
                    this.create = false;
                    this.modal = false;
                    this.getCategory();
                }
            }).catch(()=>{});
        },
        async updateCategory(){
            await this.form.put('category/' + this.form.id).then((res)=>{
                if (res.data.status === "failed"){
                    this.form.errors.set(res.data.message);
                }else {
                    // success
                    this.form.reset();
                    this.form.errors.clear();
                    this.create = false;
                    this.modal = false;
                    this.getCategory();
                }
            }).catch(()=>{});
        },
        async deleteCategory(id){
            await axios.delete('category/' + id).then((res)=>{
                if (res.data.status === "failed"){
                    alert(res.data.status);
                }else {
                    this.getCategory();
                }
            }).catch(()=>{});
        },
        goToHome(category){
            this.$router.push({
                name: 'Home',
                params:{
                    category: category
                },
            }).catch(()=>{});
        }
    }
}
</script>