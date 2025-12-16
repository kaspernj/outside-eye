import OutsideEyeContext from "./context.js"
import React from "react"

/**
 * @returns {import("./provider.jsx").OutsideEyeContextValueType | null}
 */
const usePressOutsideContext = () => React.useContext(OutsideEyeContext)

export default usePressOutsideContext
