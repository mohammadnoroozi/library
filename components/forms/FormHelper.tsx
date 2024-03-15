export  function readModelProp<T>(model:any,name:string):T|undefined{
    if(!model)return undefined ;
    if(name.indexOf('.')===-1){
        return   model[name] as T;
    }

    const properties = name.split('.');
    let data=model;
    properties.forEach(property=>{
        data = !data?undefined:data[property];
    });

    return data as T;
}