// 最大的fontSize
const MAX_FONT_SIZE = 42

// 监听html被解析完成事件
document.addEventListener('DOMContentLoaded', () => {
  // 获取html标签
  const html = document.querySelector('html')
  // 获取根元素 fontSize 标准 屏幕宽度/10
  let fontSize = window.innerWidth / 10
  // 判断大小获取到的fontSize 不能超过定义的最大值
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素的字体大小, rem的大小
  html.style.fontSize = fontSize + 'px'
})
