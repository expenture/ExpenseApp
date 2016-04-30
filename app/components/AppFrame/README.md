# AppFrame

Wraps together a `RootNavigator`, `TabView` and `AppNavigator`s to provide a frame for container components to mount in. Handles navigating, `onFocus` callback function for each mounted component and hardware back press on Android.

## API & Examples

Every component mounted directly in the frame needs to call `this.props.onConstruct(this)` in `componentWillMount()` and `this.props.onDestruct(this)` in `componentWillUnmount()`:

```js
class Page extends Component {
  componentWillMount() {
    this.props.onConstruct(this);
  }

  componentWillUnmount() {
    this.props.onDestruct(this);
  }

  ...
}
```

Every component mounted directly in the frame can have a `onFocus()` function. This function will be called if:

1. Navigated to the new component.
2. Navigated back to an existing component.
3. Selecting tab and the component is focused.

Every component mounted directly in the frame can have a `onRefresh()` function, and the function will be called if the current tab is pressed while the current app navigator is at root.

On Android, hardware back press is handled for app navigations (things in `renderAppScene`), while you have to handle the back press for root navigations (things in `renderRootScene`) (because there might be, editing views for example, in root navigations, and you have to do something, suppose comfirm, while leaving the view).

For other instructions, see `Demo.js`.
