import { Style } from "../types";


interface Progress{
  value: string,
  procent: number
}

interface StyleName{
  end: Progress,
  start: Progress
}

interface NewStyle{
  [key: string]: StyleName
}



const isIntoGap = (a: number, b: number, n: number): boolean => {
  const total = a-n+b;
  return (total > a && total < b) || (total < a && total > b);
} 

const coef = (scrollPosition: number, styleValue: number, nextStyleValue: number, key: number, nextKey: number): number => {
  return styleValue + ((nextStyleValue - styleValue) * (scrollPosition-key/100)*(100/(nextKey - key)));
}

const styleConstructor = (styleName: string, from: string, to: string, key: string, nextKey: string, scrollPosition: number) => {
  const units = {
    'px': { isInteger: true },
    'em': { inInteger: false},
    '%': {isInteger: false},
    'vh': {isInteger: false},
    'vw': {isInteger: false}

  } 
    let thisUnit;
    Object.keys(units).forEach((curentValue) => {
      if(from.includes(curentValue) ){
        thisUnit = curentValue;
      }
    });

    if (typeof(thisUnit) === 'undefined') thisUnit = '';
    
    from = from.replace(String(thisUnit), '');
    to = to.replace(String(thisUnit), '');

    if(styleName === 'transform'){
      let fromStyleValue = from.split('(')[1].split(')')[0];
      let toStyleValue = to.split('(')[1].split(')')[0];
      
      console.log(`${coef(scrollPosition, Number(fromStyleValue), Number(toStyleValue), Number(key), Number(nextKey) )}${thisUnit}`);
      return `${coef(scrollPosition, Number(fromStyleValue), Number(toStyleValue), Number(key), Number(nextKey) )}${thisUnit}`

    }
    
    return `${coef(scrollPosition, Number(from), Number(to), Number(key), Number(nextKey) )}${thisUnit}`;
} 


const computeStyle = (styles: object | undefined, ...params: any[]): Style => {
  const computedStyle: Style = {};

  const animateStyle: Style = {};
  const animateTransformStyle: Style = {};
  const staticStyle: NewStyle = {};
  const staticTransformStyle: NewStyle  = {};

  const staticStyleConsructor = (styleName: string ,value: string, procent: number, isTransfrom: boolean) => {
    if(isTransfrom){
      if(typeof(staticTransformStyle[styleName]) === 'undefined') {
        staticTransformStyle[styleName] = {
          start: {
            value: '',
            procent: 0
          },
          end: {
            value: '',
            procent: 0
          }
        };
        staticTransformStyle[styleName].start.value = value;
        staticTransformStyle[styleName].start.procent = procent;
      }
      console.log(typeof(staticTransformStyle[styleName].end.value), value)
      if(staticTransformStyle[styleName].end.procent < procent*100){
        staticTransformStyle[styleName].end.value = value;
        staticTransformStyle[styleName].end.procent = procent;
      }
      
      

    }else{
      if(typeof(staticStyle[styleName]) === 'undefined') {
        staticStyle[styleName] = {
          start: {
            value: '',
            procent: 0
          },
          end: {
            value: '',
            procent: 0
          }
        };
        staticStyle[styleName].start.value = value;
        staticStyle[styleName].start.procent = procent;
      }

      if( staticStyle[styleName].end.procent < procent*100){
        staticStyle[styleName].end.value = value;
        staticStyle[styleName].end.procent = procent;
      }
    }
  }

  if(typeof(styles) !== 'undefined'){
    for( const [key, value] of Object.entries(styles) ){
      for ( const [styleName, styleArray] of Object.entries(value) ){
        if(typeof(styleArray) == 'object' && styleArray !== null){
          for(const [index, styleValue] of Object.entries(styleArray)){      
            for ( const [nextKey, nextValue] of Object.entries(styles) ){
              for ( const [nextStyleName, nextStyleArray] of Object.entries(nextValue) ){
                if(typeof(nextStyleArray) == 'object' && nextStyleArray !== null){   
                  for(const [index, nextStyleValue] of Object.entries(nextStyleArray)){
                    if( Number(nextKey) - Number(key) > 0 && styleName === nextStyleName ){
                      if(typeof(styleValue) === 'string' && typeof(nextStyleValue) === 'string'){
                        if( isIntoGap(Number(key)/100, Number(nextKey)/100, params[0]) ){
                            if(styleName === 'transform'){
                              if(styleValue.split('(')[0] === nextStyleValue.split('(')[0]){
                                animateTransformStyle[styleValue.split('(')[0] as keyof Style] = styleConstructor(styleName, styleValue, nextStyleValue, key, nextKey, params[0]);
                              }  
                            }
                            else{
                              animateStyle[styleName as keyof Style] = styleConstructor(styleName, styleValue, nextStyleValue, key, nextKey, params[0]);
                            }
                          
                        }
                      
                      else{
                        if(styleName === 'transform' && nextStyleName === 'transform'){
                          if(styleValue.split('(')[0] === nextStyleValue.split('(')[0]){
                            staticStyleConsructor(styleValue.split('(')[0], styleValue.split('(')[1].split(')')[0], Number(key), true)
                            staticStyleConsructor(nextStyleValue.split('(')[0], nextStyleValue.split('(')[1].split(')')[0], Number(nextKey), true)                            
                          }
                        }
                        else{
                          staticStyleConsructor(styleName, styleValue, Number(key), false)
                          staticStyleConsructor(nextStyleName, nextStyleValue, Number(nextKey), false)
                        }
                      } 
                    }
                  }
                    
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  for( const [key, value] of Object.entries(staticStyle) ){
    
      if(Number(value['start']['procent'])/100 > params[0]){
        computedStyle[key as keyof Style] = value['start']['value'];
      }
      if(Number(value['end']['procent'])/100 < params[0]){
        computedStyle[key as keyof Style] = value['end']['value'];
      }
    
  }
  for( const [key, value] of Object.entries(animateStyle) ){
    computedStyle[key as keyof Style] = value;
  }
  for( const [key, value] of Object.entries(animateStyle) ){
    computedStyle[key as keyof Style] = value;
  }

  for( const [key, value] of Object.entries(staticTransformStyle) ){
    
      console.log('test:', animateTransformStyle[key as keyof Style])
      if(typeof(animateTransformStyle[key as keyof Style]) === 'undefined'){
        if(Number(value['start']['procent'])/100 > params[0]){
        
          animateTransformStyle[key as keyof Style] = value['start']['value'];
        }
        if(Number(value['end']['procent'])/100 < params[0]){
          animateTransformStyle[key as keyof Style] = value['end']['value'];
        }
      }
    
  }
  let transform = '';
  for( const [key, value] of Object.entries(animateTransformStyle) ){
    transform+= `${key}(${value})`

  }
  computedStyle['transform'] = transform;
  

  console.log('animateTransformStyle: ', animateTransformStyle)
  console.log('animateStyle: ', animateStyle)
  console.log('staticStyle: ', staticStyle)
  console.log('staticTransformStyle: ', staticTransformStyle)

  return computedStyle;
  
  
  
};

export default computeStyle;
