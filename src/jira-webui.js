import WebUI from 'sketch-module-web-view'
import { assign } from 'lodash'
import { randomHex } from './util'

export default function (context, options) {
  options = assign({
    identifier: `jira-sketch-plugin.${options.name}.` + randomHex(0xffffffff),
    page: `${options.name}.html`,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    title: ' ',
    styleMask: (NSTitledWindowMask | NSClosableWindowMask)
  }, options)
  var w = new WebUI(context, options.page, options)
  w.dispatchWindowEvent = function (eventName, eventDetail) {
    var eventJson = JSON.stringify({ detail: eventDetail })
    w.eval(
      `window.dispatchEvent(new CustomEvent('${eventName}', ${eventJson}))`
    )
  }
  return w
}
