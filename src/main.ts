import { off, on } from './index'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const createEl = (tagName: string) => {
  return document.createElement(tagName)
}

{
  console.log('事件监听')
  const div = createEl('div')
  div.style.marginBottom = '20px'
  const btn1 = createEl('button')
  btn1.textContent = '按钮1'

  const btn2 = createEl('button')
  btn2.textContent = '按钮1'

  const clear1 = createEl('button')
  clear1.textContent = '清除按钮1点击事件'

  const btn1OnClick = () => {
    console.log('按钮1被点了')
  }

  on(btn1, 'click', btn1OnClick)
  on(btn1, 'click', btn1OnClick)

  on(clear1, 'click', () => {
    off(btn1, 'click', btn1OnClick)
  })

  div.appendChild(btn1)
  div.appendChild(btn2)
  div.appendChild(clear1)
  app.appendChild(div)
}

{
  console.log('事件监听')
  const clear1 = document.querySelector<HTMLDivElement>('#clear1')
  const div = document.querySelector<HTMLDivElement>('.parent')!
  app.appendChild(div)
  const clickLi = () => {
    console.log('li 被委托')
  }
  on(div, 'click', 'li', clickLi, true)

  on(clear1 as HTMLElement, 'click', () => {
    off(div, 'click', clickLi, true)
  })
}

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
