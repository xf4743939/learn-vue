/* 
* 可以在dataObj 对象中,寻找连续点符号的keyName 属性
*/

export default function lookup(dataObj,keyName){
    if(keyName.includes('.') && keyName !== '.'){
      let temp = dataObj;
      const keys = keyName.split('.');
      for(let i=0;i<keys.length;i++){
        temp = temp[keys[i]]
      }
      return temp;
    }
    return dataObj[keyName]
};