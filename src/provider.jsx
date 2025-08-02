import {shapeComponent, ShapeComponent} from "set-state-compare/src/shape-component"
import isPressInsideElement from "./is-press-inside-element"
import OutsideEyeContext from "./context.js"
import React from "react"

const OutsideEyeProvider = React.memo(shapeComponent(class OutsideEyeProvider extends ShapeComponent {
  onStartShouldSetResponder = null
  registered = {}

  render() {
    const {children, ...restProps} = this.props
    const restPropsKeys = Object.keys(restProps)

    if (restPropsKeys.lengt > 0) {
      throw new Error(`Unknown props given: ${restPropsKeys.join(", ")}`)
    }

    const props = React.useMemo(() => ({
      onStartShouldSetResponder: (event) => {
        event.persist()

        const {onStartShouldSetResponder} = this.tt

        for (const registerID in this.tt.registered) {
          const {childRef, onPressOutside} = this.tt.registered[registerID]

          // if press outside, execute onPressOutside callback
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

    const value = React.useMemo(() => ({
      clickOutsideProvider: this,
      props
    }), [])

    return (
      <OutsideEyeContext.Provider value={value}>
        {children}
      </OutsideEyeContext.Provider>
    )
  }

  register(id, childRef, onPressOutside) {
    this.registered[id] = {childRef, onPressOutside}
  }

  unregister(id) {
    delete this.registered[id]
  }
}))

export default OutsideEyeProvider
