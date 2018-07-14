<template>
    <div>
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <template v-if="expandForm">
                        <a-form @submit="handleSearch" ref="form">
                            <a-row :gutter="gutter">
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="规则编号">
                                        <a-input placeholder="请输入"></a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="使用状态">
                                        <a-select placeholder="请选择" style="width: 100%">
                                            <a-select-option :value="0">关闭</a-select-option>
                                            <a-select-option :value="1">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="调用次数">
                                        <a-input-number style="width: 100%;"></a-input-number>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="gutter">
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="更新日期">
                                        <a-date-picker style="width: 100%;" placeholder="请输入更新日期" />
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="使用状态">
                                        <a-select placeholder="请选择" style="width: 100%">
                                            <a-select-option :value="0">关闭</a-select-option>
                                            <a-select-option :value="1">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="使用状态">
                                        <a-select placeholder="请选择" style="width: 100%">
                                            <a-select-option :value="0">关闭</a-select-option>
                                            <a-select-option :value="1">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <div style="overflow: hidden;">
                                <span style="float: right;margin-bottom: 24px;">
                                    <a-button type="primary" htmlType="submit">查询</a-button>
                                    <a-button style="margin-left: 8px;">重置</a-button>
                                    <a @click="toggleForm" style="margin-left: 8px;">收起<a-icon type="up" /></a>
                                </span>
                            </div>
                        </a-form>
                    </template>
                    <template v-else>
                        <a-form @submit="handleSearch" ref="searchForm">
                            <a-row :gutter="gutter">
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="规则编号">
                                        <a-input placeholder="请输入"></a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <a-form-item label="使用状态">
                                        <a-select placeholder="请选择" style="width: 100%">
                                            <a-select-option :value="0">关闭</a-select-option>
                                            <a-select-option :value="1">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="8" :sm="24">
                                    <span class="submitButtons">
                                        <a-button type="primary">查询</a-button>
                                        <a-button style="margin-left: 8px;" @click="handleFormReset">重置</a-button>
                                        <a style="margin-left: 8px;" @click="toggleForm">展开<a-icon type="down" /></a>
                                    </span>
                                </a-col>
                            </a-row>
                        </a-form>
                    </template>
                </div>
                <div class="tableListOperator">
                    <a-button icon="plus" type="primary" @click="handleModalVisible">新建</a-button>
                    <template v-if="selectedRows.length">
                        <span>
                            <a-button>批量操作</a-button>
                            <a-dropdown>
                                <a-menu slot="overlay" @click="handleMenuClick">
                                    <a-menu-item key="1">删除</a-menu-item>
                                    <a-menu-item key="2">批量审批</a-menu-item>
                                </a-menu>
                                <a-button>
                                    更多操作
                                    <a-icon type="down" />
                                </a-button>
                            </a-dropdown>
                        </span>
                    </template>
                </div>
                <StandardTable
                    :selectedRows="selectedRows"
                    :data="list"
                    :loading="loading"
                    :columns="columns"
                    @selectRow="handleSelectRows"
                    @change="handleStandardTableChange"
                >
                </StandardTable>
            </div>
        </a-card>
    </div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import StandardTable from '@/components/StandardTable/index'
// import styles from './TableList.less';

import { Form } from 'vue-antd-ui'

const gutter = { md: '8', lg: '24', xl: '48' }
const getValue = obj => Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
export default {
    name: 'TableList',
    data () {
        return {
            gutter: 8,
            modalVisible: false,
            expandForm: false,
            selectedRows: [],
            formValues: {},
            loading: false
            // searchForm: {}
        }
    },
    mounted () {
        this.loading = true
        this.dispatch({
            type: 'rule/fetch',
        })
            .finally(() => {
                this.loading = false
            })
        this.$nextTick(() => {
            console.log(this.$refs.searchForm.getFieldDecorator, 'comp')
        })
    },
    components: {
        StandardTable
    },
    methods: {
        handleStandardTableChange (pagination, filtersArg, sorter) {
            const { formValues } = this
            const filters = Object.keys(filtersArg).reduce((obj, key) => {
                const newObj = { ...obj };
                newObj[key] = getValue(filtersArg[key]);
                return newObj;
            }, {});

            const params = {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
                ...formValues,
                ...filters,
            };
            if (sorter.field) {
                params.sorter = `${sorter.field}_${sorter.order}`;
            }

            // this.dispatch({
            //     type: 'rule/fetch',
            //     payload: params,
            // });
        },
        handleFormReset () {
            // const { form, dispatch } = this.props;
            // form.resetFields();
            this.formValues = {}
            this.dispatch({
                type: 'RULE_FETCH',
                payload: {},
            });
        },
        toggleForm () {
            this.expandForm = !this.expandForm
        },
        handleMenuClick (e) {
            const { selectedRows } = this
            if (!selectedRows) return
            switch (e.key) {
            case 'remove':
                this.dispatch({
                    type: 'rule/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.selectedRows = []
                    },
                });
                break;
            default:
                break;
            }
        },
        handleSelectRows (rows) {
            this.selectedRows = rows
        },
        handleSearch (e) {
            e.preventDefault();

            const { dispatch, form } = this.props;

            form.validateFields((err, fieldsValue) => {
                if (err) return;

                const values = {
                    ...fieldsValue,
                    updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                };
                this.formValues = values

                this.dispatch({
                    type: 'RULE_FETCH',
                    payload: values,
                });
            });
        },
        handleAdd (fields) {
            this.dispatch({
                type: 'rule/add',
                payload: {
                    description: fields.desc,
                },
            });

            this.$message.success('添加成功');
            this.modalVisible = false
        },
        handleModalVisible (flag) {
            this.modalVisible = !!flag
        },
        // checkAll (value) {
        //     this.checkAllMsg = '当前全选状态是：' + value
        //     if (!value) {
        //         this.selectedRows = []
        //     }
        //     !value ? (this.selectedRows = []) : (this.selectedRows = list)
        // },
        // clickRow (obj) {
        //     console.log(obj);
        //     const { row = {}} = obj || {}
        //     const exist = _.find(this.selectedRows, row)
        //     !exist && this.selectedRows.push(row)
        //     this.clickRowMsg = '当前点击第"+obj.index+"行';
        // }
    },
    computed: {
        ...mapState({
            list: state => state.rule.data.list
        }),
        totalInvokeCount () {
            const count = _.reduce(this.selectedRows, (num, row) => {
                console.log(row, 'row')
                console.log(num, 'N')
                return num + row.callNo
            }, 0)
            console.log(count, 'count')
            return count
        }
    },
    filters: {
        transferTime (val) {
            if (!val) return ''
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    created () {
        this.columns = [
            {
                title: '规则编号',
                dataIndex: 'no'
            },
            {
                title: '描述',
                dataIndex: 'description'
            },
            {
                title: '服务调用次数',
                dataIndex: 'callNo',
                sorter: true,
                align: 'right',
                customRender: val => `${val} 万`,
                needTotal: true
            },
            {
                title: '状态',
                dataIndex: 'status',
                filters: [
                    {
                        text: status[0],
                        value: 0
                    },
                    {
                        text: status[1],
                        value: 1,
                    },
                    {
                        text: status[2],
                        value: 2,
                    },
                    {
                        text: status[3],
                        value: 3,
                    },
                ],
                onFilter: (value, record) => {
                    console.log(value, 'value onfilter')
                    console.log(record, 'record onfilter', record.status.toString() === value)
                    return record.status.toString() === value
                },
                customRender: val => {
                    return <a-badge status={statusMap[val]} text={status[val]}></a-badge>
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                sorter: true,
                customRender: val => {
                    return <span>{dayjs(val).format('YYYY-MM-DD HH:mm:ss')}</span>
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                customRender: val => {
                    return (
                        <div>
                            <a href=''>配置</a>
                            <a-divider type='vertical'></a-divider>
                            <a href=''>订阅警报</a>
                        </div>
                    )
                }
            }
        ]
    },
}
</script>
<style lang="less" src="./Table.less"></style>
