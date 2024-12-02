// 1. 修改购物车商品数量
// a) 减少数量
const minusButtons = document.querySelectorAll('.minus')
for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener('click', function () {
    // 读取商品当前购买数量
    let currentNumber = this.nextElementSibling.value - 0
    // 读取商品的单价
    let currentPrice =
      this.parentNode.parentNode.previousElementSibling.innerText.slice(1)

    // 至少要购买一件商品
    if (currentNumber <= 1) return
    // 修改当前商品的购买数量
    this.nextElementSibling.value = --currentNumber

    // 小计金额 = 商品数量 * 商品单价
    let totalPrice = currentNumber * currentPrice
    // DOM 更新显示小计金额
    this.parentNode.parentNode.nextElementSibling.innerText =
      '￥' + totalPrice.toFixed(2)

    countNumberAndAmount()
  })
}

// b) 增加数量
const plusButtons = document.querySelectorAll('.plus')
for (let i = 0; i < plusButtons.length; i++) {
  plusButtons[i].addEventListener('click', function () {
    // 读取商品当前购买数量
    let currentNumber = this.previousElementSibling.value - 0
    // 读取商品的单价
    let currentPrice =
      this.parentNode.parentNode.previousElementSibling.innerText.slice(1)

    // 购买数量不能超出库存量（假设库存量为20）
    if (currentNumber >= 20) return
    // 修改当前商品的购买数量
    this.previousElementSibling.value = ++currentNumber

    // 小计金额 = 商品数量 * 商品单价
    let totalPrice = currentNumber * currentPrice
    // DOM 更新显示小计金额
    this.parentNode.parentNode.nextElementSibling.innerText =
      '￥' + totalPrice.toFixed(2)

    countNumberAndAmount()
  })
}

// 2. 文本框中输入数值修改商品数量
const numberInputs = document.querySelectorAll('.number')
for (let i = 0; i < numberInputs.length; i++) {
  // 记录未修改前商品的数量，用于输入数据的验证
  let tempNumber = 1
  numberInputs[i].addEventListener('focus', function () {
    tempNumber = this.value - 0
  })

  numberInputs[i].addEventListener('blur', function () {
    // 读取商品当前购买数量
    let currentNumber = parseInt(this.value - 0)

    // 输入的不是数值
    if (isNaN(currentNumber)) {
      this.value = tempNumber
      return
    }

    // 输入的数值大于等于 1 小于等于库存量（假设库存量为 20）
    if (currentNumber < 1 || currentNumber > 20) {
      return (this.value = tempNumber)
    }

    // 读取商品的单价
    let currentPrice =
      this.parentNode.parentNode.previousElementSibling.innerText.slice(1)

    // 小计金额 = 商品数量 * 商品单价
    let totalPrice = currentNumber * currentPrice
    // DOM 更新显示小计金额
    this.parentNode.parentNode.nextElementSibling.innerText =
      '￥' + totalPrice.toFixed(2)

    countNumberAndAmount()
  })

  numberInputs[i].focus()
  numberInputs[i].blur()
}

// 3. 统计总的购买数量和支付金额
function countNumberAndAmount() {
  // 获取购物车中每个商品的购买数量
  const goodsNumbers = document.querySelectorAll('.number')
  let totalNumber = 0
  for (let i = 0; i < goodsNumbers.length; i++) {
    totalNumber += goodsNumbers[i].value - 0
  }
  // 更新显示所有商品的购买数量之和
  document.querySelector('.total-number').innerText = totalNumber

  // 获取购物车中每个商品的小计
  const goodsTotal = document.querySelectorAll('.total')
  let totalAmout = 0
  for (let i = 0; i < goodsTotal.length; i++) {
    totalAmout += goodsTotal[i].innerText.slice(1) - 0
  }
  // 更新显示购物车中每个商品金额之和
  document.querySelector('.total-amout').innerText = totalAmout.toFixed(2)
}

// 初始统计总数量和金额
countNumberAndAmount()
