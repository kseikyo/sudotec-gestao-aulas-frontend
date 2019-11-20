export function changeHandler(event, callback = null) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked: target.value;
  const name = target.name;
  
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

