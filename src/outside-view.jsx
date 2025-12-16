import React from "react"
import usePressOutsideProps from "./use-press-outside-props.js"
import {View} from "react-native"

/**
 * @param {object} props
 * @param {import("react").ReactNode} props.children
 * @returns {import("react").JSX.Element}
 */
function ClickOutsideView({children, ...restProps}) {
  const clickOutsideProps = usePressOutsideProps()

  return (
    <View {...restProps} {...clickOutsideProps}>
      {children}
    </View>
  )
}

export default React.memo(ClickOutsideView)
