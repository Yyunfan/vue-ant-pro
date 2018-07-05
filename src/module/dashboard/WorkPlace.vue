<template>
    <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
                class="projectList"
                style="margin-bottom: 24px"
                title="进行中的项目"
                :bordered="false"
                :loading="projectLoading"
                :bodyStyle="{ padding: 0 }"
            >
                <router-link slot="extra" to="/">全部项目</router-link>
                <a-card-grid class="projectGrid" v-for="item in notice" :key="item.id">
                    <a-card :bodyStyle="{ padding: 0 }" :bordered="false">
                        <a-card-meta :title="item.title" :description="item.description">
                            <a-avatar slot="avatar" size="small" :src="item.logo" />
                            <!-- <router-link :to="item.href" slot="title">{{ item.title }}</router-link> -->
                            <div class="cardTitle">
                            </div>
                        </a-card-meta>
                        <div class="projectItemContent">
                            <router-link :to="item.memberLink">{{ item.member || '' }}</router-link>
                            <span class="dattetime" v-if="item.updatedAt" :title="item.updatedAt">{{ fromNow(item.updatedAt) }}</span>
                        </div>
                    </a-card>
                </a-card-grid>
            </a-card>
            <a-card
                :bordered="false"
                :bodyStyle="{ padding: 0 }"
                class="activeCard"
                title="动态"
                :loading="activitiesLoading"
            >
                <!-- <a-list :loading="activitiesLoading" :dataSource="activities">
                    <div class="activitiesList">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-list-item-meta>
                                <a-avatar slot="avatar" :src="item.user.avatar" />
                            </a-list-item-meta>
                        </a-list-item>
                    </div>
                </a-list> -->
            </a-card>
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
                :style="{ marginBottom: '24px' }"
                title="快速开始 / 便捷导航"
                :bordered="false"
                :bodyStyle="{ padding: 0 }"
            >
                <EditableLinkGroup :links="links"></EditableLinkGroup>
            </a-card>
            <a-card
                :bodyStyle="{ paddingTop: 12, paddingBottom: 12 }"
                :bordered="false"
                title="团队"
            >
                <div class="members">
                    <a-row :gutter="48">
                        <a-col :span="12" v-for="item in members" :key="`members-item-${item.id}`">
                            <router-link :to="item.link">
                                <a-avatar :src="item.logo" size="small"></a-avatar>
                                <span class="member">{{ item.title }}</span>
                            </router-link>
                        </a-col>
                    </a-row>
                </div>

            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapState } from 'vuex'
import EditableLinkGroup from '@/components/EditableLinkGroup'
moment.extend(relativeTime)

const links = [
    {
        title: '操作一',
        href: '',
    },
    {
        title: '操作二',
        href: '',
    },
    {
        title: '操作三',
        href: '',
    },
    {
        title: '操作四',
        href: '',
    },
    {
        title: '操作五',
        href: '',
    },
    {
        title: '操作六',
        href: '',
    },
];
const members = [
    {
        id: 'members-1',
        title: '科学搬砖组',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        link: '',
    },
    {
        id: 'members-2',
        title: '程序员日常',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
        link: '',
    },
    {
        id: 'members-3',
        title: '设计天团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
        link: '',
    },
    {
        id: 'members-4',
        title: '中二少女团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
        link: '',
    },
    {
        id: 'members-5',
        title: '骗你学计算机',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
        link: '',
    },
];
export default {
    created () {
        this.projectLoading = true
        this.dispatch({
            type: 'project/fetchNotice',
        })
            .finally(() => {
                this.projectLoading = false
            })
        this.activitiesLoading = true
        this.dispatch({
            type: 'activities/fetchList'
        })
            .finally(() => {
                this.activitiesLoading = false
            })
        this.dispatch({
            type: 'chart/fetch',
        });
    },
    data () {
        return {
            activitiesLoading: false,
            projectLoading: false,
            links,
            members
        }
    },
    computed: {
        ...mapState({
            notice: state => state.project.notice,
            activities: state => state.activities.list
        })
    },
    methods: {
        fromNow (date) {
            return moment(date).fromNow()
        }
    },
    components: {
        EditableLinkGroup
    }
}
</script>
<style lang="less" src="./WorkPlace.less"></style>
