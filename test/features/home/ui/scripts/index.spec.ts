import { dataService } from '@/common/ui/services'
import { script } from '@/home/ui/scripts'

describe('home script', () => {
  beforeAll(() => {
    script()
  })

  beforeEach(() => {
    dataService().dataStore.set({ color: 'purple', text: '' })
    document.body.replaceChildren()
  })

  it('does nothing when custom elements are unavailable', () => {
    vi.stubGlobal('customElements', undefined)

    expect(() => script()).not.toThrow()

    vi.unstubAllGlobals()
  })

  it('registers the home-intro custom element', () => {
    expect(customElements.get('home-intro')).toBeDefined()
  })

  it('renders the theme-aware branding and stored state', async () => {
    dataService().setText('Saved message')
    const intro = document.createElement('home-intro')
    document.body.append(intro)

    await (intro as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    const imageClasses = [...intro.querySelectorAll('img')].map(
      image => image.className
    )

    expect(imageClasses).toContain('dark:hidden')
    expect(imageClasses).toContain('hidden dark:block')
    expect(intro.textContent).toContain('Store State: Saved message')
  })

  it('renders Not yet when no message is stored', async () => {
    const intro = document.createElement('home-intro')
    document.body.append(intro)

    await (intro as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    expect(intro.textContent).toContain('Store State: Not yet')
  })
})
