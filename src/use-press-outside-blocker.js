import React from "react"
import usePressOutsideContext from "./use-press-outside-context"
import UUID from "pure-uuid"

/**
 * Registers a ref as a blocker — while the ref is mounted, all onPressOutside callbacks are suppressed for clicks inside it.
 * @param {React.RefObject<import("react-native").View>} blockerRef
 * @returns {void}
 */
export default function usePressOutsideBlocker(blockerRef) {
  const value = usePressOutsideContext()
  const id = React.useMemo(() => new UUID(4).format(), [])

  if (!value) {
    throw new Error("Not inside click outside context")
  }

  React.useMemo(() => {
    value?.clickOutsideProvider?.registerBlocker(id, blockerRef)
  }, [blockerRef, id, value?.clickOutsideProvider])

  React.useEffect(() => {
    return () => {
      value?.clickOutsideProvider?.unregisterBlocker(id)
    }
  }, [blockerRef, id, value?.clickOutsideProvider])
}
