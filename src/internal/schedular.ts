/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import { BaseComponent, T$$ } from "./Component";

export let dirtyComponent:Array<BaseComponent> = []

const resolvedPromise = Promise.resolve()

let stillUpdate = false

export function pushSchedule(component:BaseComponent){
    if(!stillUpdate){
        stillUpdate = true
        dirtyComponent.push(component)
        resolvedPromise.then(flush)
    }
    
}

export function flush(){
    let current_Component
    do{
        while(flushIndex < dirtyComponent.length){
            const comp = dirtyComponent[flushIndex]
            current_Component = comp
    
            flushIndex++
            if(comp.$$){
            triggerReactive(comp.$$)
            }
        }
        dirtyComponent = []
        flushIndex =0
    }while(dirtyComponent.length)
    stillUpdate = false

    //todo remove this line
    current_Component?.$$
}

let flushIndex =0
export function triggerReactive($$:T$$){
 
        const dirty = $$.dirty
        $$.fragment?.update(
            $$.ctx,
            dirty
        )
        $$.ctx = $$.ctx

    
    
}