import { scriptFunction } from '@/store/ui/scripts'

describe('store', () => {
  const mocks = vi.hoisted(() => ({
    mockSetCookies: vi.fn(),
    mockSetData: { set: vi.fn() }
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({
        dataStore: mocks.mockSetData
      }))
    }
  }))

  vi.mock('js-cookie', () => ({
    default: {
      set: mocks.mockSetCookies
    }
  }))

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should set cookie and update dataStore on send', () => {
    expect.assertions(2)

    document.body.innerHTML = `
      <input id="inputable" value="test value"/>
      <div id="send-button"></div>
    `

    scriptFunction()

    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const button = document.querySelector(
      '.standard-button'
    ) as HTMLButtonElement
    button.click()

    expect(mocks.mockSetCookies).toHaveBeenCalledWith('data', 'test value')
    expect(mocks.mockSetData.set).toHaveBeenCalledWith('test value')
  })

  it('should send cookies when element does not exist', () => {
    expect.assertions(2)

    document.body.innerHTML = ''

    document.querySelector('#inputable')?.remove()

    scriptFunction()

    expect(mocks.mockSetCookies).toHaveBeenCalledWith('data', 'test value')
    expect(mocks.mockSetData.set).toHaveBeenCalledWith('test value')
  })

  it('should create the send button inside #send-button', () => {
    expect.assertions(3)

    document.body.innerHTML = `
    <input id="inputable" value="test value"/>
    <div id="send-button"></div>
  `

    scriptFunction()

    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const button = document.querySelector(
      '#send-button button'
    ) as HTMLButtonElement

    expect(button).not.toBeNull()
    expect(button.className).toBe('standard-button')
    expect(button.textContent).toBe('Send')
  })
})
