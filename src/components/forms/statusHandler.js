export function statusHandler(event, callback = null) {
    const target = event.target;
    const value = target.checked;
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
  
  