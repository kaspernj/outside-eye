import {Component} from "react"
import {Platform} from "react-native"

/**
 * @param {Component | Element} target
 * @param {Component | Element} nestedView
 * @returns {boolean}
 */
export default function isPressInsideElement(target, nestedView) {
  if (Platform.OS === "web" && target instanceof Element && nestedView instanceof Element) {
    if (target && nestedView && target.isEqualNode(nestedView)) {
      return true
    }

    for (const child of nestedView.children) {
      if (isPressInsideElement(target, child)) {
        return true
      }
    }
  } else if (target instanceof Component && nestedView instanceof Component) {
    // Does all this work on native?

    // @ts-expect-error
    if (target && nestedView && target._nativeTag === nestedView._nativeTag) {
      return true
    }

    // @ts-expect-error
    if (nestedView._children && nestedView._children.length > 0) {
      // @ts-expect-error
      for (const child of nestedView._children) {
        if (isPressInsideElement(target, child)) {
          return true
        }
      }
    }
  }

  return false
}
