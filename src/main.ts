
/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import './style.css'

import {append,element, insert, setText, set_input_value} from "./internal/dom"
import {BaseComponent,Fragment, listen,init, create_component, mount_component} from "./internal/Component"
import {safe_not_equal} from "./internal/utils"
import { Tes } from './component'

const app = document.querySelector<HTMLDivElement>('#app')!


function instance(
  $$self:any,
  $$options:any,
  $$invalidate:(i:any,ret:any,...res:any)=>any
):Array<any>{
  //todo remove this line
  $$self
  $$options
  
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
  let tes = new Tes({})


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

      create_component(tes.$$?.fragment!!)

      
    },
    mount(target:any,anchor:any) {
      
      insert(target,div,anchor)
      append(div,h1)
      append(div,btn)
      append(div,input)
      append(div,span)

      mount_component(tes,div,null,null)


    },
    update(ctx:any,dirty:Array<number>) {
      if(dirty[0] != -1){
        setText(ctx[0],h1)
      }
      
      if(dirty[1] != null || dirty[1] != undefined){
  
        //name
        set_input_value(input,ctx[1])
        setText(ctx[1],span)
      }
     
      
    },
    claim(parent) {
        
    },
    destroy() {
        
    },
  }
}

class MainComponent extends BaseComponent{
  constructor(options:any){
    
    super()
    init(this,options,instance,fragment,safe_not_equal)
    
  }
}
new MainComponent({
  target:app,
  anchor:null
})