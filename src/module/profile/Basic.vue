<template>
    <a-card
        :bordered="false"
    >
        <DescriptionList size="large" title="退款申请" :style="{ marginBottom: '32px' }">
            <Description term="取货单号">1000000000</Description>
            <Description term="状态">已取货</Description>
            <Description term="销售单号">1234123421</Description>
            <Description term="子订单">3214321432</Description>
        </DescriptionList>
        <a-divider :style="{ marginBottom: '32px' }"></a-divider>
        <DescriptionList size="large" title="用户信息" :style="{ marginBottom: '32px' }">
            <Description term="用户姓名">付小小</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="常用快递">菜鸟仓储</Description>
            <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
            <Description term="备注">无</Description>
        </DescriptionList>
        <a-divider :style="{ marginBottom: '32px' }"></a-divider>
        <div class="title">退货商品</div>
        <a-table
            :style="{ marginBottom: '24px' }"
            :pagination="false"
            :loading="loading"
            :dataSource="goodsData"
            :columns="goodsColumns"
            rowKey="id"
        >
        </a-table>
        <div class="title">退货进度</div>
        <a-table
            :style="{ marginBottom: '16px' }"
            :pagination="false"
            :loading="loading"
            :dataSource="basicProgress"
            :columns="progressColumns"
            rowKey="id"
        >
        </a-table>
    </a-card>
</template>

<script>
import { mapState } from 'vuex'
import forEach from 'lodash/forEach'
import size from 'lodash/size'
import { DescriptionList, Description } from '@/components/DescriptionList'

export default {
    components: {
        DescriptionList,
        Description,
    },
    data () {
        return {
            loading: false
        }
    },
    created () {
        console.log(this.$route, 'r')
        this.loading = true
        this.dispatch({
            type: 'profile/fetchBasic'
        })
            .finally(() => {
                this.loading = false
            })
        this.goodsColumns = [
            {
                title: '商品编号',
                dataIndex: 'id',
                key: 'id',
                customRender: (text, row, index) => {
                    if (index < size(this.basicGoods)) {
                        return <a href="">{text}</a>;
                    }
                    return {
                        children: <span style={{ fontWeight: 600 }}>总计</span>,
                        props: {
                            colSpan: 4,
                        },
                    };
                },
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                customRender: this.renderContent,
            },
            {
                title: '商品条码',
                dataIndex: 'barcode',
                key: 'barcode',
                render: this.renderContent,
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                render: this.renderContent,
            },
            {
                title: '数量（件）',
                dataIndex: 'num',
                key: 'num',
                align: 'right',
                customRender: (text, row, index) => {
                    if (index < size(this.basicGoods)) {
                        return text;
                    }
                    return <span style={{ fontWeight: 600 }}>{text}</span>;
                },
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                align: 'right',
                customRender: (text, row, index) => {
                    if (index < size(this.basicGoods)) {
                        return text;
                    }
                    return <span style={{ fontWeight: 600 }}>{text}</span>;
                },
            },
        ];

        this.progressColumns = [
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '当前进度',
                dataIndex: 'rate',
                key: 'rate',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                customRender: text =>
                    text === 'success' ? (
                        <a-badge status='success' text='成功'></a-badge>
                    ) : (
                        <a-badge status='processing' text='进行中'></a-badge>
                    ),
            },
            {
                title: '操作员ID',
                dataIndex: 'operator',
                key: 'operator',
            },
            {
                title: '耗时',
                dataIndex: 'cost',
                key: 'cost',
            },
        ];
    },
    computed: {
        ...mapState({
            basicGoods: state => state.profile.basicGoods,
            basicProgress: state => state.profile.basicProgress,
        }),
        goodsData () {
            let goodsData = [];
            if (size(this.basicGoods)) {
                let num = 0
                let amount = 0
                forEach(this.basicGoods, item => {
                    num += Number(item.num)
                    amount += Number(item.amount)
                })
                goodsData = this.basicGoods.concat({
                    id: '总计',
                    num,
                    amount
                })
            }
            return goodsData
        }
    },
    methods: {
        renderContent (value, row, index) {
            const obj = {
                children: value,
                props: {},
            };
            if (index === size(this.basicGoods)) {
                obj.props.colSpan = 0;
            }
            return obj;
        }
    }
}
</script>
<style lang="less" scoped src="./Basic.less"></style>
