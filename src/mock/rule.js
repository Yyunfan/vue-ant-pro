// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
        key: i,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        progress: Math.ceil(Math.random() * 100),
    });
}

export function getRule() {
    const dataSource = [...tableListDataSource]

    const result = {
        list: dataSource,
    };
    return result
}

export function postRule(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const {
        method,
        no,
        description
    } = body;

    switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
        tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
        break;
    case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableListDataSource.unshift({
            key: i,
            href: 'https://ant.design',
            avatar: [
                'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
                'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
            ][i % 2],
            no: `TradeCode ${i}`,
            title: `一个任务名称 ${i}`,
            owner: '曲丽丽',
            description,
            callNo: Math.floor(Math.random() * 1000),
            status: Math.floor(Math.random() * 10) % 2,
            updatedAt: new Date(),
            createdAt: new Date(),
            progress: Math.ceil(Math.random() * 100),
        });
        break;
    default:
        break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getRule,
    postRule,
};
