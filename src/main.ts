
import './style.css'

import {append,element, insert, setText, set_input_value, text} from "./internal/dom"
import {App,Fragment, listen,init} from "./internal/App"
import {safe_not_equal} from "./internal/utils"

const app = document.querySelector<HTMLDivElement>('#app')!


function instance(
  $$self:any,
  $$options:any,
  $$invalidate:(i:any,ret:any,...res:any)=>any
):Array<any>{
  let count =0
  let name='trian'

  function handle_counter(){
    $$invalidate(0,(count+=1))
  }

  function input_handler(e:any){

    
    name = e.target.value
    $$invalidate(1,name)
  }

  return[count,name,handle_counter,input_handler]
}

function fragment(ctx:Array<any>):Fragment{
  let div:HTMLElement
  let h1: HTMLElement;
  let btn:HTMLElement;
  let input:HTMLInputElement
  let span:HTMLSpanElement


  return {
    create(){
     
      div = element('div')
      h1 = element('span')
      btn = element('button')
      input = element('input')
      span = element('span')


    

      setText("Klik Saya",btn)
      setText(ctx[0],h1)
      setText(ctx[1],span)

      set_input_value(input,ctx[1])

      listen(btn,'click',ctx[2])
      listen(input,'input',ctx[3])

      
    },
    mount(target:any,anchor:any) {
      
      insert(target,div,anchor)
      append(div,h1)
      append(div,btn)
      append(div,input)
      append(div,span)


    },
    update(ctx:any,dirty:Array<number>) {
      if(dirty[0] != -1){
        setText(ctx[0],h1)
      }
      
      if(dirty[1] != -1){
  
        //name
        set_input_value(input,ctx[1])
        setText(ctx[1],span)
      }
     
      
    },
    destroy() {
        
    },
  }
}

class MainComponent extends App{
  constructor(options:any){
    
    super()
    init(this,options,instance,fragment,safe_not_equal)
    
  }
}
new MainComponent({
  target:app,
  anchor:null
})