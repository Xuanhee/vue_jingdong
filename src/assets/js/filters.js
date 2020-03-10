import Vue from 'vue'

/**
 * 保留两位小数
 * @param value 调用过滤器时,调用的数值
 */
Vue.filter('priceValue', (value) => {
  // 如果没有文本返回空
  if (!value && value !== 0) return ''
  value = Number(value)
  // 使用toFixed 必须是数值类型
  return value.toFixed(2)
})

Vue.filter('formatCountDown', (value) => {
  // 没有数据返回空
  if (!value) return ''
  // 不是时间格式的数据 返回原值
  if (value.indexOf(':') === -1) return value
  // 处理时间格式,小于2位的前面添加一个0
  let arr = value.split(':')
  arr = arr.map((item) => {
    if (item.length < 2) {
      return '0' + item
    }
    return item
  })
  return arr.join(':')
})
