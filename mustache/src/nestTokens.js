/**
 * 函数功能折叠tokens,将#和/之间tokens整合起来 
 */

export default function nestTokens(tokens){
  let nestTokens =[];
  let sections = [];
  let collector = nestTokens;

  for(let i=0; i<tokens.length;i++){
    let token =tokens[i]
     switch (token[0]) {
       case "#":
        collector.push(token);
        sections.push(token);
        collector = token[2] = []
         break;
       case "/":
         collector = sections.length ? sections[sections.length-1][2]:nestTokens
       default:
        collector.push(token)
         break;
     }
  }
  return nestTokens
}