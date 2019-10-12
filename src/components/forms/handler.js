export function changeHandler(event, callback = null) {
  const name = event.target.name;
  const value = event.target.value;

  this.setState({
    formControls: {
        ...this.state.formControls,
        [name]: value
    }
  }, () => {
    if (callback) {
      callback();
    }
  });
};
