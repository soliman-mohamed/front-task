<template>
    <div class="login">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6 col-8">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="card-title">Login to your Account</h6>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="login">
                                <div class="alert alert-danger" v-if="form.errors.has('error')"
                                      v-html="form.errors.get('error')"></div>
                                <div class="mb-3">
                                    <label for="mail" class="form-label">Email</label>
                                    <input type="email" v-model="form.email" :class="{'is-invalid': form.errors.has('email')}" class="form-control" id="mail" placeholder="Email" autocomplete="off">
                                    <span class="text-danger" v-if="form.errors.has('email')"
                                          v-html="form.errors.get('email')"></span>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" v-model="form.password" :class="{'is-invalid': form.errors.has('password')}" class="form-control" id="password" placeholder="Password"  autocomplete="new-password">
                                    <span class="text-danger" v-if="form.errors.has('password')"
                                          v-html="form.errors.get('password')"></span>
                                </div>
                                <div class="mb-3 d-flex justify-content-between align-items-end">
                                    <button type="submit" :disabled="form.busy" class="btn btn-outline-success">
                                        <span v-if="form.busy" aria-hidden="true" role="status" class="spinner-border spinner-border-sm"></span>
                                        Login
                                    </button>
                                    <router-link to="/register">Register</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'

export default {
    name: 'Login',
    data(){
        return {
            form: new Form({
                email: "",
                password: "",

            }),
        }
    },
    methods: {
        async login(){
            await this.form.post('login').then((res)=>{
                // success login
                this.$store.dispatch('login', res.data.authorisation).then(() => {
                   this.$router.push({ name: 'Home' });
                });
            }).catch(()=>{});
        },
    }
}
</script>