export function statusFilter(array, value, callback) {
    const arr = array.filter((object) => {
        return object.status === value ? object : null
    });
    
    this.setState({
        rendered: arr 
    },
      () =>  {
          if(callback) callback();
      }
    );
}