import { render, screen } from '@solidjs/testing-library'

import { CookieState } from '@/common/ui/components/cookie-state/cookie-state'

describe('cookieState', () => {
  const mocks = vi.hoisted(() => ({
    mockGetCookies: vi.fn()
  }))

  vi.mock('js-cookie', () => ({
    default: {
      get: mocks.mockGetCookies
    }
  }))

  it('should display "Not yet" when cookie is undefined', () => {
    expect.assertions(1)

    mocks.mockGetCookies.mockReturnValue(undefined)

    render(() => <CookieState />)

    expect(screen.getByText('Cookie State: Not yet.')).toBeInTheDocument()
  })

  it('should display "Not yet" when cookie is an empty string', () => {
    expect.assertions(1)

    mocks.mockGetCookies.mockReturnValue('')

    render(() => <CookieState />)

    expect(screen.getByText('Cookie State: Not yet.')).toBeInTheDocument()
  })

  it('should display the cookie value when cookie is set', () => {
    expect.assertions(2)

    mocks.mockGetCookies.mockReturnValue('someData')

    render(() => <CookieState />)

    expect(screen.getByText('Cookie State: Yes, you write')).toBeInTheDocument()
    expect(screen.getByText('someData')).toBeInTheDocument()
  })
})
