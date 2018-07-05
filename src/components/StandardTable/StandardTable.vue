<template>
    <div class="standardTable">
        <div class="tableAlert">
            <a-alert type="info" showIcon>
                <template slot="message">
                        已选择 <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项&nbsp;&nbsp;
                        <span v-for="item in needTotalList" :key="item.dataIndex">
                            {{ item.title }}总计&nbsp;
                            <span style="font-weight: 600;">
                                {{ item.render ? item.render(item.total) : item.total }}
                            </span>
                        </span>
                        <a @click="cleanSelectedKeys" style="margin-left: 24px;">清空</a>
</template>
            </a-alert>
            <!-- <a-alert :message="`已选择${ selectedRows.length }项，服务调用次数总计 1 万`"></a-alert> -->
        </div>
        <a-table
            :rowKey="rowKey || 'key'"
            :rowSelection="rowSelection"
            :dataSource="data"
            :columns="columns"
            :loading="loading"
            @change="handleTableChange"
        ></a-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedRowKeys: [],
            needTotalList: []
        }
    },
    props: {
        selectedRows: {
            type: Array
        },
        loading: {
            type: Boolean,
            default: false
        },
        data: {},
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        rowKey: {}
    },
    computed: {
        rowSelection() {
            const {
                selectedRowKeys
            } = this;
            return {
                selectedRowKeys,
                onChange: this.handleRowSelectChange,
                onSelection: this.onSelection
            }
        }
    },
    methods: {
        initTotalList(columns) {
            const totalList = [];
            columns.forEach(column => {
                if (column.needTotal) {
                    totalList.push({ ...column,
                        total: 0
                    });
                }
            });
            return totalList;
        },
        handleRowSelectChange(selectedRowKeys, selectedRows) {
            console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
            let needTotalList = [...this.needTotalList];
            needTotalList = needTotalList.map(item => {
                return {
                    ...item,
                    total: selectedRows.reduce((sum, val) => {
                        return sum + parseFloat(val[item.dataIndex], 10);
                    }, 0),
                };
            });
            this.$emit('selectRow', selectedRows)
            this.selectedRowKeys = selectedRowKeys
            this.needTotalList = needTotalList
        },
        handleTableChange(pagination, filters, sorter) {
            this.$emit('change', pagination, filters, sorter)
        },
        cleanSelectedKeys() {
            return this.handleRowSelectChange([], []);
        },
        onSelection() {}
    },
    created() {
        this.needTotalList = this.initTotalList(this.columns)
    }
}
</script>
