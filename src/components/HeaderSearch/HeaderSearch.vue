<style lang="less" src="./index.less" scoped></style>

<template>
    <span :class="className" class="headerSearch" @click="enterSearchMode">
        <a-icon type="search" key="Icon" />
        <a-auto-complete
            key="AutoComplete"
            :dataSource="dataSource"
            @change="onChange"
            @search="handleSearch"
            :value="value"
            class="input"
            :class="{ show: searchMode }"
        >
            <a-input type="text" :placeholder="placeholder" @keydown="onKeyDown" @blur="leaveSearchMode" />
        </a-auto-complete>
    </span>
</template>

<script>
export default {
    name: 'HeaderSearch',
    data() {
        return {
            searchMode: false,
            value: '',
            // dataSource: []
        }
    },
    props: {
        className: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        onSearch: {
            type: Function,
            default: () => {}
        },
        onPressEnter: {
            type: Function,
            default: () => {}
        },
        defaultActiveFirstOption: {
            type: Boolean,
            default: false
        },
        dataSource: {
            type: Array,
            default () {
                return []
            }
        },
        defaultOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onKeyDown (e) {
            if (e.key === 'Enter') {
                this.timeout = setTimeout(() => {
                    this.onPressEnter(this.value) // Fix duplicate onPressEnter
                }, 0)
            }
        },
        onChange (value) {
            console.log(value, 'value')
            this.value = value
        },
        handleSearch (value) {
            // this.dataSource = !value ? [] : [
            //     value,
            //     value + value,
            //     value + value + value,
            // ]
        },
        onSelect (value) {
            console.log('onSelect', value);
        },
        enterSearchMode () {
            this.searchMode = true
            this.$nextTick(() => {
                const input = this.$refs && this.$refs.ele
                // console.log(input, 'input', this)
                input.focus()
            })
        },
        leaveSearchMode () {
            this.value = ''
            this.searchMode = false
        }
    },
    beforeDestroy () {
        clearTimeout(this.timeout)
        // this.timeout = null
    }
}
</script>
