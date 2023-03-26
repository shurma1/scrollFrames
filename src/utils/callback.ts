
const callback = (func: string | undefined, ...params: any[]): void => {
    if(func !== undefined){
        var entire = func.toString(); 
        var body = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        let userFunction = new Function('data', body);
        userFunction(...params);
    }
  };
  
  export default callback;