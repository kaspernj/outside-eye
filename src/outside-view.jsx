import React from "react"
import usePressOutsideProps from "./use-press-outside-props.js"
import {View} from "react-native"

const ClickOutsideView = React.memo(({children, ...restProps}) => {
  const clickOutsideProps = usePressOutsideProps()

  return (
    <View {...restProps} {...clickOutsideProps}>
      {children}
    </View>
  )
})

export default ClickOutsideView
