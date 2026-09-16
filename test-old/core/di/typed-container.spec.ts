import { asClass, asValue } from 'awilix'

import { createTypedContainer } from '~/di/typed-container'

describe('createTypedContainer', () => {
  it('should resolve a class dependency correctly', () => {
    expect.assertions(2)

    class MyService {
      sayHello() {
        return 'Hello, World!'
      }
    }

    const registrations = {
      myService: asClass(MyService)
    }

    const container = createTypedContainer(registrations)

    const myServiceInstance = container.resolve('myService')

    expect(myServiceInstance).toBeInstanceOf(MyService)
    expect(myServiceInstance.sayHello()).toBe('Hello, World!')
  })

  it('should resolve a value dependency correctly', () => {
    expect.assertions(1)

    const registrations = { myValue: asValue(42) }
    const container = createTypedContainer(registrations)
    const myValueInstance = container.resolve('myValue')

    expect(myValueInstance).toBe(42)
  })
})
