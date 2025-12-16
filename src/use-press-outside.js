import React from "react"
import usePressOutsideContext from "./use-press-outside-context"
import UUID from "pure-uuid"

/**
 * @param {React.RefObject<import("react-native").View>} childRef
 * @param {() => void} onPressOutside
 * @returns {void}
 */
export default function usePressOutside(childRef, onPressOutside) {
  const value = usePressOutsideContext()
  const id = React.useMemo(() => new UUID(4).format(), [])

  if (!value) {
    throw new Error("Not inside click outside context")
  }

  React.useMemo(() => {
    value?.clickOutsideProvider?.register(id, childRef, onPressOutside)
  }, [childRef, onPressOutside])

  React.useEffect(() => {
    return () => {
      value?.clickOutsideProvider?.unregister(id)
    }
  }, [])
}
