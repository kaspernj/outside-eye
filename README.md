# outside-eye

Detect clicks outside certain elements.

# Install

```bash
npm install outside-eye
```

In your layout:
```jsx
import OutsideEyeProvider from "outside-eye/build/provider"

return (
  <OutsideEyeProvider>
    <YourApp />
  </OutsideEyeProvider>
)
```

On the outer layout which should be considered outside:
```jsx
import usePressOutsideProps from "outside-eye/build/use-press-outside-props.js"

const pressOutsideProps = usePressOutsideProps(restProps)

return (
  <View {...pressOutsideProps>
    <RestOfYourApp />
  </View>
)
```

# Usage

Detect clicks outside:
```jsx
import usePressOutside from "outside-eye/build/use-press-outside"

export default () => {
  const onPressOutside = useCallback(() => {
    console.log("onPressOutside")
  }, [])

  const contentRef = useRef()

  usePressOutside(contentRef, onPressOutside)

  return (
    <Layout>
      <View ref={contentRef}>
        <Text>My content</Text>
      </View>
    <Layout>
  )
}
```

## Blockers

Use `usePressOutsideBlocker` to register a full-screen element (such as a modal overlay) as a blocker. While a blocker is mounted, all `onPressOutside` callbacks are suppressed for clicks inside the blocker element. This prevents pop menus and other registered elements from closing when clicking inside a modal.

```jsx
import usePressOutsideBlocker from "outside-eye/build/use-press-outside-blocker"
import usePressOutsideProps from "outside-eye/build/use-press-outside-props"

const Modal = ({children, onRequestClose}) => {
  const overlayRef = useRef()
  const pressOutsideProps = usePressOutsideProps()

  usePressOutsideBlocker(overlayRef)

  return (
    <View ref={overlayRef} style={fullScreenOverlayStyle} {...pressOutsideProps}>
      <Pressable onPress={onRequestClose} style={backdropStyle} />
      <View style={contentStyle}>
        {children}
      </View>
    </View>
  )
}
```

When the modal is open, clicking inside it will not trigger `onPressOutside` on other registered elements (like a pop menu that opened the modal). The modal handles its own backdrop dismiss via a `Pressable`.
