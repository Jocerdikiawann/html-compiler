export type HtmlType = 'Element' | 'Fragment' | 'Text' |'None'
export type Htmlname = 'Span' | 'Div' | 'Paragraph'|'None'

export type Parent={
    html:Html | null,
    js:Js|null,
    css:Css|null
}

export type Js={}

export type Css={

}
export type Html={
    start: number,
	end: number,
    type: HtmlType,
	name: Htmlname,
	attributes: any,
	children: Array<Html>
}

export function parse(template:string):Parent{
    let index =0;
    let root:Html ={
        start:0,
        end:template.length,
        type:'Fragment',
        name:'None',
        attributes:{},
        children:[]
    }

    function checkFragment(){
        const char = template[index]

      
        if(char == '<'){
             checkTag()
        }
        index = index+1
    }

    function checkTag(){

    }

    while(index < template.length){
        checkFragment()
       
    }
    
    return {
        html:root,
        js:null,
        css:null
    }
}