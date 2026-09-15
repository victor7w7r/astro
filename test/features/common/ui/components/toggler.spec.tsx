import { fireEvent, render, screen } from '@solidjs/testing-library'

import { Toggler } from '@/common/ui/components/toggler/toggler.svelte'

describe('toggler', () => {
  const mocks = vi.hoisted(() => ({
    mockToggle: vi.fn()
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({
        themeStore: vi.fn(),
        toggle: mocks.mockToggle
      }))
    }
  }))

  vi.mock('@nanostores/solid', () => ({
    useStore: vi.fn(() => ({
      isDark: false,
      togglePeer: 'bg-white'
    }))
  }))

  it('should render with initial state', () => {
    expect.assertions(2)

    render(() => <Toggler />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('should toggle dark mode on checkbox change', () => {
    expect.assertions(1)

    render(() => <Toggler />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mocks.mockToggle).toHaveBeenCalled()
  })

  it('should reflect dark mode state from themeStore', () => {
    expect.assertions(1)

    render(() => <Toggler />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
  })

  it('should apply the correct class based on themeStore', () => {
    expect.assertions(1)

    render(() => <Toggler />)

    const toggleDiv = screen.getByTestId('toggleable')

    expect(toggleDiv).toHaveClass('bg-white')
  })
})
