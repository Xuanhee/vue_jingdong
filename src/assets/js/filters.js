import Vue from 'vue'

/**
 * 保留两位小数
 * @param value 调用过滤器时,调用的数值
 */
Vue.filter('priceValue', (value) => {
  // 如果没有文本返回空
  if (!value) return ''
  value = Number(value)
  // 使用toFixed 必须是数值类型
  return value.toFixed(2)
})
