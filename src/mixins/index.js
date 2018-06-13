export default {
    install (Vue) {
        Vue.mixin({
            methods: {
                dispatch ({
                    type = '',
                    payload
                } = {}) {
                    return this.$store.dispatch(type, payload)
                }
            }
        })
    }
}
