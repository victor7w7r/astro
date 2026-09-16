import { dataService } from '@/common/ui/services'
import { script } from '@/store/ui/scripts'

describe('store script', () => {
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

  it('registers the store-form custom element', () => {
    expect(customElements.get('store-form')).toBeDefined()
  })

  it('does not register the custom element twice', () => {
    expect(() => script()).not.toThrow()
    expect(customElements.get('store-form')).toBeDefined()
  })

  it('keeps Store State unchanged while typing', async () => {
    const form = document.createElement('store-form')
    document.body.append(form)
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    const input = form.querySelector('input')!
    input.value = 'Draft message'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    expect(form.textContent).toContain('Store State: Not yet')
    expect(dataService().dataStore.get().text).toBe('')
  })

  it('saves the draft when the button is clicked', async () => {
    const form = document.createElement('store-form')
    document.body.append(form)
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    const input = form.querySelector('input')!
    const button = form.querySelector('button')!

    input.value = 'Saved message'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    button.click()
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    expect(form.textContent).toContain('Store State: Saved message')
    expect(form.textContent).toContain('Saved.')
    expect(dataService().dataStore.get().text).toBe('Saved message')
  })

  it('shows Not yet when an empty draft is saved', async () => {
    const form = document.createElement('store-form')
    document.body.append(form)
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    const button = form.querySelector('button')!
    button.click()
    await (form as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete

    expect(form.textContent).toContain('Store State: Not yet')
    expect(dataService().dataStore.get().text).toBe('')
  })
})
