export default (event, callback) => {
  const KEY_SPACE = 13

  switch (event.which) {
    case KEY_SPACE: {
      event.stopPropagation()
      callback()
      break
    }
    default: {
      break
    }
  }
}
