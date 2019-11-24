export function searchFilter(array, value, callback) {
    
    const arr = array.filter((object) => {
        return object.name.includes(value) ? object : null
    });
    this.setState({
        rendered: arr
    },
      () =>  {
          if(callback) callback();
      }
    );
    
}