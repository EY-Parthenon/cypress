/// <reference types="cypress" />
import $ from 'cash-dom'
import { MountingOptions } from '@vue/test-utils'
// @ts-ignore
import { mount as VTUmount } from '@vue/test-utils/dist/vue-test-utils.esm-bundler'

/* global cy,Cypress */
export const mount = (
  comp: any,
  options: Omit<MountingOptions<any>, 'attachTo'> & { log?: boolean } = {},
) => {
  const componentName =
    comp.name ??
    (() => {
      if (!comp.__file) return '--Component--'

      const a = comp.__file.split('/')

      return a[a.length - 1].replace(/.\w+$/, '')
    })()
  const message = `<${componentName} ... />`
  let logInstance: Cypress.Log

  return cy.then(() => {
    if (options.log !== false) {
      logInstance = Cypress.log({
        name: 'mount',
        message: [message],
      })
    }

    $('body').html('')
    const $root = $(`<div/>`)

    $root.html('')
    $('body').append($root)
    const wrapper = VTUmount(comp, { attachTo: $root[0], ...options })

    return cy
    .wrap(wrapper, { log: false })
    .wait(1, { log: false })
    .then(() => {
      if (logInstance) {
        logInstance.snapshot('mounted')
        logInstance.end()
      }

      return wrapper
    })
  })
}
