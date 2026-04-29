import React from "react"
import useNow from "set-state-compare/build/use-now.js"
import usePressOutsideContext from "./use-press-outside-context"
import UUID from "pure-uuid"

/**
 * Registers a ref as a blocker — while the ref is mounted, all onPressOutside callbacks are suppressed for clicks inside it.
 * @param {React.RefObject<import("react-native").View>} blockerRef
 * @returns {void}
 */
export default function usePressOutsideBlocker(blockerRef) {
  const value = usePressOutsideContext()
  const registrationRef = React.useRef(/** @type {{id: string, provider: import("./provider.jsx").OutsideEyeContextValueType["clickOutsideProvider"]} | null} */ (null))

  if (!value) {
    throw new Error("Not inside click outside context")
  }

  const {clickOutsideProvider} = value

  useNow(() => {
    if (registrationRef.current) {
      registrationRef.current.provider.unregisterBlocker(registrationRef.current.id)
    }

    const id = new UUID(4).format()

    clickOutsideProvider.registerBlocker(id, blockerRef)
    registrationRef.current = {id, provider: clickOutsideProvider}
  }, [blockerRef, clickOutsideProvider])

  React.useEffect(() => {
    return () => {
      if (registrationRef.current) {
        registrationRef.current.provider.unregisterBlocker(registrationRef.current.id)
        registrationRef.current = null
      }
    }
  }, [])
}
