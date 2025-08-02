import React from "react"
import {View} from "react-native"

const ClickOutsideView = React.memo(({children, ...restProps}) => {
  const clickOutsideProps = useClickOutsideProps()

  return (
    <View {...restProps} {...clickOutsideProps}>
      {children}
    </View>
  )
})

export default ClickOutsideView
