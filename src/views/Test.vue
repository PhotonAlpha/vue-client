<template>
    <div>
        <a @click="goBack" >Go Back</a> | 

        <a @click="goRouteA" >goRouteA</a> | 

        <a @click="goRouteB" >goRouteB</a>
        <div v-bind:style="{color: this.$route.params.id}">{{ this.$route.params }}</div>
        <div>-----------------------------</div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
           str1: '',
           str2: '' 
        }
    },
    // 单文件组件注册过滤器
    filters: {
        sliceUpperCase(val) {
            return val.slice(1).toUpperCase()
        }
    },
    computed: {
        username () {
            // console.log(this.$route.params);
            return this.$route.params.username;
        }
    },
    methods: {
        goBack() {
            this.$router.push('/');
        },
        goRouteA() {
            // this.$router.push({name: '/test/red', params: {id: 'red'}, query: {plan: 'plan'}});
            this.$router.push({name: 'sub1', params: {id: 'red'}});
        },
        goRouteB() {
            this.$router.push({name: 'sub2', params: {id: 'blue'}});
        }
    }
}
// Vue.filters('sliceUpperCase', function (val) {
//     return val.slice(1).toUpperCase()
// })
</script>
