<script>
import { matchQueries } from 'container-query-toolkit'
import ContainerQueryCore from './ContainerQueryCore'
import { enquireScreen, unenquireScreen } from '@/utils/enquire-js';
import debounce from 'lodash/debounce'

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};
/*
    this.initialSize = {
        width: 300,
        height: 300
    }
    can match { 'screen-xs': true, 'screen-sm': false, ...: falses }'
*/
export default {
    data () {
        return {
            isMobile: false,
            params: this.initialSize ? matchQueries(query)(this.initialSize) : {}
        }
    },
    created () {
        this.enquireHandler = enquireScreen(mobile => {
            this.isMobile = mobile
            this.handleMenuCollapse(!!mobile)
        })
    },
    mounted () {
        this.$nextTick(() => {
            this.startObserving(query)
        })
    },
    beforeDestroy () {
        if (this.enquireScreen) {
            unenquireScreen(this.enquireHandler);
        }
        if (this.cqCore) {
            this.cqCore.disconnect()
            this.cqCore = null
        }
    },
    methods: {
        startObserving (query) {
            this.cqCore = new ContainerQueryCore(query, this.cqCallback)
            this.cqCore.observe(this.$el)
        },
        cqCallback: debounce(function (params) {
            console.log(params, 'match params')
            this.params = params
        }, 100)
    }
}
</script>
