import lookup from './lookup'

export default function renderTemplate(tokens,data){
    let resultStr = '';
    for(let i=0;i<tokens.length;i++){
      const token =tokens[i];
       if(token[0] === 'text'){
          resultStr+=token[1]
       }else if(token[0] === 'name'){
         resultStr+= lookup(data,token[1])
       }else if(token[0] === '#'){
        resultStr+=parseArray(token,data)
       }
    }
    return resultStr  
}

/* 处理数组 参数是token*/
function parseArray(token,data){
  let resultStr='';
   const v=lookup(data,token[1]);
   if(!v)return resultStr;
 
   for(let i =0;i<v.length;i++){
    resultStr+= renderTemplate(token[2],{
      ...v[i],
      ".":v[i],
    })
   }
   return resultStr;
}