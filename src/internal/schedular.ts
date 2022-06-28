import { App, T$$ } from "./App";

export let dirtyComponent:Array<App> = []

const resolvedPromise = Promise.resolve()

let stillUpdate = false

export function pushSchedule(component:App){
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