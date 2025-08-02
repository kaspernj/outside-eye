import {v4 as uuidv4} from "uuid"

export default function usePressOutside(childRef, onPressOutside) {
  const value = usePressOutsideContext()
  const id = React.useMemo(() => uuidv4(), [])

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

