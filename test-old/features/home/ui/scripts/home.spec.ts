/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { define } from 'uce'
import { Mock } from 'vitest'

import { path, scriptFunction } from '@/home/ui/scripts'

describe('home', () => {
  const mocks = vi.hoisted(() => ({
    changeBlue: vi.fn(),
    changeEmerald: vi.fn(),
    changePurple: vi.fn(),
    changeRed: vi.fn(),
    themeStore: {
      get: vi.fn(() => ({ isDark: false })),
      subscribe: vi.fn()
    }
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({
        changeBlue: mocks.changeBlue,
        changeEmerald: mocks.changeEmerald,
        changePurple: mocks.changePurple,
        changeRed: mocks.changeRed,
        themeStore: mocks.themeStore
      }))
    }
  }))

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="buttons-selector"></div>
    `
  })

  it('should return the white image path when isDark is true', () => {
    expect.assertions(1)

    const result = path(true, 'white-icon', 'black-icon')

    expect(result).toBe('/img/white-icon.png')
  })

  it('should return the black image path when isDark is false', () => {
    expect.assertions(1)

    const result = path(false, 'white-icon', 'black-icon')

    expect(result).toBe('/img/black-icon.png')
  })

  it('should handle different image names correctly', () => {
    expect.assertions(2)

    const resultDark = path(true, 'white-image', 'black-image')
    const resultLight = path(false, 'white-image', 'black-image')

    expect(resultDark).toBe('/img/white-image.png')
    expect(resultLight).toBe('/img/black-image.png')
  })

  it('should define img-reactive component', () => {
    expect.assertions(1)

    vi.mock('uce', () => ({
      define: vi.fn()
    }))

    scriptFunction()

    expect(define).toHaveBeenCalledWith(
      'img-reactive',
      expect.objectContaining({
        init: expect.any(Function),
        render: expect.any(Function)
      })
    )
  })

  it('should render custom component', () => {
    expect.assertions(1)

    const [[, component]] = (define as Mock).mock.calls

    // eslint-disable-next-line vitest/prefer-spy-on
    component.html = vi.fn()

    component.props = {
      classstyle: 'scale-75 lg:scale-80',
      white: 'brandwhite'
    }

    component.render()

    expect(component.isDark).toBe(false)
  })

  it('should add buttons to the DOM', () => {
    expect.assertions(5)

    scriptFunction()

    const buttonsSelector = document.querySelector('#buttons-selector')

    expect(buttonsSelector).toBeTruthy()
    expect(buttonsSelector?.innerHTML).toContain(
      '<button class="blue-button"></button>'
    )
    expect(buttonsSelector?.innerHTML).toContain(
      '<button class="purple-button"></button>'
    )
    expect(buttonsSelector?.innerHTML).toContain(
      '<button class="red-button"></button>'
    )
    expect(buttonsSelector?.innerHTML).toContain(
      '<button class="emerald-button"></button>'
    )
  })

  it('should call themeStore.subscribe on component init', () => {
    expect.assertions(1)

    scriptFunction()

    const [[, component]] = (define as Mock).mock.calls
    component.init()
    expect(mocks.themeStore.subscribe).toHaveBeenCalled()
  })

  it('should handle button clicks', () => {
    expect.assertions(4)

    scriptFunction()

    const blueButton = document.querySelector(
      '.blue-button'
    ) as HTMLButtonElement
    const purpleButton = document.querySelector(
      '.purple-button'
    ) as HTMLButtonElement
    const redButton = document.querySelector('.red-button') as HTMLButtonElement
    const emeraldButton = document.querySelector(
      '.emerald-button'
    ) as HTMLButtonElement

    blueButton.click()
    purpleButton.click()
    redButton.click()
    emeraldButton.click()

    expect(mocks.changeBlue).toHaveBeenCalled()
    expect(mocks.changePurple).toHaveBeenCalled()
    expect(mocks.changeRed).toHaveBeenCalled()
    expect(mocks.changeEmerald).toHaveBeenCalled()
  })
})
