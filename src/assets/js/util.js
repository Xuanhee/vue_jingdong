// 两数之间随机数
export function getRandomInt(min, max) {
  return Math.random() * (max - min + 1) + min | 0
}
