import React from "react"
import usePressOutsideContext from "./use-press-outside-context.js"

/**
 * @param {object} [args]
 * @param {import("./types.js").onStartShouldSetResponderType} [args.onStartShouldSetResponder]
 */
export default function usePressOutsideProps({onStartShouldSetResponder, ...restProps} = {}) {
  const shared = React.useMemo(() => /** @type {{onStartShouldSetResponder: import("./types.js").onStartShouldSetResponderType | undefined, clickOutsideContext: import("./context.js").PressOutsideContext | null}} */ ({}), [])

  shared.onStartShouldSetResponder = onStartShouldSetResponder
  shared.clickOutsideContext = usePressOutsideContext()

  const actualProps = React.useMemo(() => ({
    /**
     * @param {import("react-native").GestureResponderEvent} e
     * @returns {boolean}
     */
    onStartShouldSetResponder: (e) => {
      shared.clickOutsideContext?.props?.onStartShouldSetResponder(e)

      if (shared.onStartShouldSetResponder) {
        return shared.onStartShouldSetResponder(e)
      }

      return false
    }
  }), [])

  if (!shared.clickOutsideContext) {
    throw new Error("Not inside outside-eye context")
  }

  return Object.assign({}, actualProps, restProps)
}
