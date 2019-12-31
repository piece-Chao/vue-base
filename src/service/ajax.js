import axios from 'axios'
import Vue from 'vue'
import { hostname } from './api'
const vue = new Vue()
let baseURL = '/'
baseURL = hostname.baseUrl
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

const filterResult = (result) => {
    if (result.data && result.data.code === 9000) {
        result.data = {
            code: -9000,
            message: result.data.message
        }
    } else if (result.data && result.data.code === 401) {
        window.location.href = result.data.data
    }
    return result
}

export const ajax = {
    showError (result, hideError) {
        if (!hideError) {
            setTimeout(() => {
                vue.$Modal.error({
                    title: '信息提示',
                    content: result && result.message ? result.message.replace(/\n|\r\n/g, '<br/>') : '网络异常，请重试！'
                })
            }, 300)
        }
    },
    httpPost (url, params, hideError, postType) {
        let _this = this
        let configObj = rebuildPostData(params, postType)
        vue.$Loading.start()
        return new Promise(function (resolve, reject) {
            let obj = {
                method: 'POST',
                url: url,
                data: configObj.params,
                headers: { 'content-type': configObj.headersConfig }
            }
            axios(obj).then((result) => {
                vue.$Loading.finish()
                filterResult(result)
                resolve(result.data)
                if (result.data.code !== 0) {
                    _this.showError(result.data, hideError)
                }
            }).catch((res) => {
                vue.$Loading.error()
                res = filterResult(res)
                _this.showError(res, hideError)
                resolve({ data: { code: 999 } })
            })
        })
    },
    httpGet (url, params, hideError) {
        let _this = this
        vue.$Loading.start()
        return new Promise(function (resolve, reject) {
            axios({
                method: 'GET',
                url: url,
                params: {
                    ...params
                }
            }).then((result) => {
                vue.$Loading.finish()
                if (url.indexOf('/sendNote') > -1) {
                    return
                }
                filterResult(result)
                resolve(result.data)
                if (result.data.code !== 0) {
                    if (result.data.msg && result.data.msg.indexOf('不存在') > -1) {
                        return
                    }
                    _this.showError(result.data, hideError)
                }
            }).catch((res) => {
                vue.$Loading.error()
                filterResult(res)
                _this.showError(res, hideError)
                resolve({ data: { code: 999 } })
            })
        })
    }
}

let ajaxPostType = {
    JSON: 'JSON',
    FORMDATA: 'FORMDATA'
}
const rebuildPostData = (params, postType) => {
    let headersConfig = ''
    switch (postType) {
    case ajaxPostType.JSON:
        headersConfig = 'application/json;charset=utf-8'
        break
    case ajaxPostType.FORMDATA:
        headersConfig = 'multipart/form-data'
        break
    default:
        headersConfig = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    return {
        headersConfig,
        params
    }
}
