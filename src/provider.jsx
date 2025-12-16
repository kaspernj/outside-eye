// @ts-expect-error
import {shapeComponent, ShapeComponent} from "set-state-compare/src/shape-component.js"
import isPressInsideElement from "./is-press-inside-element"
import OutsideEyeContext from "./context.js"
import React from "react"

/**
 * @typedef {object} ClickOutsideProviderContext
 * @property {import("./types.js").onStartShouldSetResponderType} onStartShouldSetResponder
 */

/**
 * @typedef {{clickOutsideProvider: OutsideEyeProvider, props: ClickOutsideProviderContext}} OutsideEyeContextValueType
 */

class OutsideEyeProvider extends ShapeComponent {
  /** @type {function | null} */
  onStartShouldSetResponder = null

  /** @type {Record<string, any>} */
  registered = {}

  render() {
    // @ts-expect-error
    const {children, ...restProps} = this.props
    const restPropsKeys = Object.keys(restProps)

    if (restPropsKeys.length > 0) {
      throw new Error(`Unknown props given: ${restPropsKeys.join(", ")}`)
    }

    const props = React.useMemo(() => /** @type {ClickOutsideProviderContext} */ ({
      onStartShouldSetResponder: (event) => {
        event.persist()

        const {onStartShouldSetResponder} = this

        for (const registerID in this.registered) {
          const {childRef, onPressOutside} = this.registered[registerID]

          // if press outside, execute onPressOutside callback
          // @ts-expect-error
          if (onPressOutside && childRef?.current && !isPressInsideElement(event.target, childRef.current)) {
            onPressOutside()
          }
        }

        // return onStartShouldSetResponder in case it is passed to OutsideView
        if (onStartShouldSetResponder) {
          return onStartShouldSetResponder(event)
        }
      }
    }), [])

    /** @type {OutsideEyeContextValueType} */
    const value = React.useMemo(() => /** @type {OutsideEyeContextValueType} */ ({
      clickOutsideProvider: this,
      props
    }), [])

    return (
      // @ts-expect-error
      <OutsideEyeContext.Provider value={value}>
        {children}
      </OutsideEyeContext.Provider>
    )
  }

  /**
   * @param {string} id
   * @param {React.RefObject<import("react-native").View>} childRef
   * @param {() => void} onPressOutside
   * @returns {void}
   */
  register(id, childRef, onPressOutside) {
    this.registered[id] = {childRef, onPressOutside}
  }

  /**
   * @param {string} id
   */
  unregister(id) {
    delete this.registered[id]
  }
}

export default React.memo(shapeComponent(OutsideEyeProvider))
