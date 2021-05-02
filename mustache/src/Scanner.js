export default class Scanner{
   constructor(templateStr){
     this.pos = 0;
     // 尾巴,一开始就是模板字符串原文
     this.tail = templateStr;
     this.templateStr =templateStr;
   }
   scan(tag){
      if(this.tail.indexOf(tag) == 0){
        this.pos += tag.length;
        this.tail = this.templateStr.substring(this.pos)
      }  
   }
   // 让指针进行扫描,直到遇见内容结束,并且返回结束前路过的文字
   scanUtil(stopTag){
     const startPos =this.pos;
     this.pos++;
     while(!this.eos() && this.tail.indexOf(stopTag) !== 0){
        this.pos++;
        // 改变尾巴
        this.tail = this.templateStr.substring(this.pos)
     }
     return this.templateStr.substring(startPos,this.pos)
   }
   eos(){
     return this.pos >= this.templateStr.length;
   }
}