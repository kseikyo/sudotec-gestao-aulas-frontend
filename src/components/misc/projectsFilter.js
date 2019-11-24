export function projectsFilter(array, value, callback) {
    const arr = array.find(el => {
        return el.id === parseInt(value);
      });

    this.setState({
        rendered: arr.courses
    },
      () =>  {
          if(callback) callback();
      }
    );
}