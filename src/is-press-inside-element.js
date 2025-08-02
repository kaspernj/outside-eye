import {Platform} from "react-native"

export default function isPressInsideElement(target, nestedView) {
  if (Platform.OS == "web") {
    if (target && nestedView && target.isEqualNode(nestedView)) {
      return true
    }

    for (const child of nestedView.children) {
      if (isPressInsideElement(target, child)) {
        return true
      }
    }
  } else {
    // Does all this work on native?

    if (target && nestedView && target._nativeTag === nestedView._nativeTag) { // eslint-disable-line no-underscore-dangle
      return true
    }

    if (nestedView._children && nestedView._children.length > 0) { // eslint-disable-line no-underscore-dangle
      for (const child of nestedView._children) { // eslint-disable-line no-underscore-dangle
        if (isPressInsideElement(target, child)) {
          return true
        }
      }
    }
  }

  return false
}
