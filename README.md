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
