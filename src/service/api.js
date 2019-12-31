let baseUrl = process.env.BASE_URL
let currentMode = process.env.CURRENT_MODE

switch (currentMode) {
case 'dev':
    baseUrl = '//beta-baidu.com/api'
    break
case 'beta':
    baseUrl = '//beta-baidu.com/api'
    break
case 'online':
    baseUrl = '//baidu.com/api'
    break
}

module.exports = {
    hostname: {
        baseUrl
    },
    API: {
        test: '/test/one'
    }
}
