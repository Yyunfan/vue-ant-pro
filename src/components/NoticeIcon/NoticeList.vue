<template>
    <div>
        <a-list class="list" v-if="data && data.length">
            <a-list-item class="item" :class="[ item.read ? 'read' : '' ]" :key="item.key || i" v-for="(item, i) in data" @click="onClick(item)">
                <a-list-item-meta class="meta">
                    <a-avatar slot="avatar" :src="item.avatar" v-if="item.avatar"></a-avatar>
                    <div class="title" slot="title">
                        {{ item.title }}
                        <div class="extra" v-if="item.extra && item.status">
                            <a-tag :color="color[item.status]" :style="{ marginRight: 0 }">{{item.extra}}</a-tag>
                        </div>
                    </div>
                    <div slot="description">
                        <div class="description" :title="item.description">{{ item.description }}</div>
                        <div class="datetime">{{ item.datetime }}</div>
                    </div>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
        <div class="notFound" v-else>
            <img :src="emptyImage" alt="not found" v-if="emptyImage">
            <div>{{ emptyText || locale.emptyText }}</div>
        </div>
        <div class="clear" @click="onClear">
            {{ locale.clear }}
            {{ title }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        locale: {
            type: Object,
            default () {
                return {}
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        emptyText: {
            type: String,
            default: ''
        },
        emptyImage: {
            type: String,
            default: ''
        }
    },
    methods: {
        onClick (item) {
            this.$emit('click', item)
        },
        onClear () {
            this.$emit('clear')
        }
    },
    data () {
        return {
            color: {
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold',
            }
        }
    }
}
</script>

<style lang="less" scoped src="./NoticeList.less"></style>

