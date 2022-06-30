/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import { pushSchedule } from "./schedular";

export interface Fragment {
  create: () => void;
  mount: (target: any, anchor: any) => void;
  update: (ctx: any, dirty: Array<number>) => void;
  destroy: () => void;
}

export interface T$$ {
  dirty: number[];
  ctx: Array<any> | null;
  fragment: Fragment | null;
  update: () => void;
}
export class BaseComponent {
  $$: T$$ | undefined;
  $$set?: ($$props: any) => void;

  constructor() {}
}

export function listen(
  node: EventTarget,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions | EventListenerOptions
) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

export function create_component(block:Fragment) {
	block && block.create();
}

export function claim_component(block:any, parent_nodes:any) {
	block && block.l(parent_nodes);
}


export function mount_component(
  component: BaseComponent,
  target: any,
  anchor: any,
  customElement: any
) {
    //todo remove this line
    customElement

  if (component.$$) {
    const { fragment }: T$$ = component.$$;
    if (fragment) {
        
      fragment.mount(target, anchor);
    }
  }
}

export function init(
  component: BaseComponent,
  options: any,
  instance: (
    component: BaseComponent,
    options: any,
    invalidate: (i: any, ret: any, ...res: any) => any
  ) => Array<any>,
  fragment: (ctx: any) => Fragment | null,
  not_equals: any
) {
  let $$: T$$ = (component.$$ = {
    ctx: null,
    fragment: null,
    dirty: [],
    update: () => {},
  });

  //todo remove this line
  // let ready = false;

  $$.ctx = instance
    ? instance(component, options.props || {}, (indexEl, value, ...rest) => {
        const val = rest.length ? rest[0] : value;
       
        //cek jika value nya sama gausah update
        if (
          $$.ctx &&
          not_equals($$.ctx!![indexEl], ($$.ctx!![indexEl] = val))
        ) {
            
          make_dirty(component, indexEl);
        }

        return value;
      })
    : [];

  $$.update();
  // ready = true;
  $$.fragment = fragment ? fragment($$.ctx) : null;

  $$.fragment?.create();

  
 
  if(options.target){
    
    mount_component(
        component,
        options.target,
        options.anchor,
        options.customElement
    )
  }
}

export function make_dirty(component: BaseComponent, index: number) {
  if (component.$$) {
    
    //dirty ga?
    let exist = component.$$.dirty.some((val) => val == index);

    //tambah baru jika gaada
    if (!exist) {
      component.$$.dirty.push(index);
      pushSchedule(component);
    } else {
      let idx = component.$$.dirty.indexOf(index);
      component.$$.dirty[idx] = index;
      pushSchedule(component);
    }
  }
}
