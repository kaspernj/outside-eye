import React from "react"

/**
 * @typedef {object} PressOutsideContext
 * @property {object} props
 * @property {import("./types.js").onStartShouldSetResponderType} props.onStartShouldSetResponder
 */

/**
 * @param {PressOutsideContext | null} value
 */
const PressOutsideContext = React.createContext(null)

export default PressOutsideContext
