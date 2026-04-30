import React from "react"
import useNow from "set-state-compare/build/use-now.js"
import usePressOutsideContext from "./use-press-outside-context"
import UUID from "pure-uuid"

/**
 * @param {React.RefObject<import("react-native").View>} childRef
 * @param {() => void} onPressOutside
 * @returns {void}
 */
export default function usePressOutside(childRef, onPressOutside) {
  const value = usePressOutsideContext()
  const registrationRef = React.useRef(/** @type {{id: string, provider: import("./provider.jsx").OutsideEyeContextValueType["clickOutsideProvider"]} | null} */ (null))

  if (!value) {
    throw new Error("Not inside click outside context")
  }

  const {clickOutsideProvider} = value

  useNow(() => {
    if (registrationRef.current) {
      registrationRef.current.provider.unregister(registrationRef.current.id)
    }

    const id = new UUID(4).format()

    clickOutsideProvider.register(id, childRef, onPressOutside)
    registrationRef.current = {id, provider: clickOutsideProvider}
  }, [childRef, clickOutsideProvider, onPressOutside])

  React.useEffect(() => {
    return () => {
      if (registrationRef.current) {
        registrationRef.current.provider.unregister(registrationRef.current.id)
        registrationRef.current = null
      }
    }
  }, [])
}
