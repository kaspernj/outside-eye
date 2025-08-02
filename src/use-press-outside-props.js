import React from "react"
import usePressOutsideContext from "./use-press-outside-context.js"

export default function usePressOutsideProps(props = {}) {
  const shared = React.useMemo(() => ({}), [])
  const {onStartShouldSetResponder, ...restProps} = props

  shared.onStartShouldSetResponder = onStartShouldSetResponder
  shared.clickOutsideContext = usePressOutsideContext()

  const actualProps = React.useMemo(() => ({
    onStartShouldSetResponder: (e) => {
      shared.clickOutsideContext.props.onStartShouldSetResponder(e)

      if (shared.onStartShouldSetResponder) {
        return shared.onStartShouldSetResponder(e)
      }
    }
  }), [])

  if (!shared.clickOutsideContext) {
    throw new Error("Not inside outside-eye context")
  }

  return Object.assign({}, actualProps, restProps)
}
