export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (Object.keys(store.state.user).length) {
    return redirect('/')
  }
}