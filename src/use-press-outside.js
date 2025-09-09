import React from "react"
import useContext from "./use-press-outside-context"
import UUID from "pure-uuid"

export default function usePressOutside(childRef, onPressOutside) {
  const value = useContext()
  const id = React.useMemo(() => new UUID(4).format(), [])

  if (!value) {
    throw new Error("Not inside click outside context")
  }

  React.useMemo(() => {
    value.clickOutsideProvider.register(id, childRef, onPressOutside)
  }, [childRef, onPressOutside])

  React.useEffect(() => {
    return () => {
      value.clickOutsideProvider.unregister(id)
    }
  }, [])
}
