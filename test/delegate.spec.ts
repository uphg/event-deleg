describe('xxx', () => {
  let outer: HTMLDivElement
  let inner: HTMLDivElement
  beforeEach(() => {
    document.body.innerHTML = `<div class="outer"><div class="inner"></div></div>`
    outer = document.querySelector('.outer') as HTMLDivElement
    inner = document.querySelector('.inner') as HTMLDivElement
  })

  afterEach(() => {
    document.body.innerHTML = ''
    outer = null
    inner = null
  })

  it('点击一次', () => {
    
  })
})