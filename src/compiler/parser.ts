
const validNameChar = /[a-zA-Z0-9_$]/;

export type Molecule ={
    start:number,
    end:number|null,
    type:'Fragment'|'Element'|'Text',
    data:string|null,
    name:string|null,
    children:Array<Molecule>,
    attributes:any
}

export function toMolecule(source: string): {
    js:string|null,
    html:Molecule,
    css:string|null
} {
    let index = 0;
    let template = ``

    let root:Molecule = {
        start: 0,
		end: 0,
		type: 'Fragment',
        data:null,
        name:null,
		children: [],
        attributes:{}
    }

    let stack = [root]
    let current = root


    function fragment(){
        let char = template[index]

        if(char === ' '){
            index +=1
        }

        //check tag <span> until </span>
        if(char === "<"){
            return tag
        }

        
        return text
        
    }

    function tag(){
        //get after <
        let start = index++
        //take name
        let char = template[index]
        //unfortunattely if char === / that mean the tag must be closed
        const isClosedTag = char === "/"

        if(isClosedTag){
            index+=1
            char = template[index]
        }
       
        let name = ''

        //take name if until found >
        while(validNameChar.test( char )){
            name += char
            index +=1
            char = template[index]
        }

        //never found > throw eror
        if(isClosedTag){
            if(char !== ">") throw Error(`Unexpected > at ${name}: ${index} actual is ${char}`)

            char +=1
            current.end = index
            stack.pop()
            current = stack[stack.length -1]

            //we found > and search for children
            return fragment

        }

        const element:Molecule ={
            start:start,
            end:null,//fill later at next recursive
            name:name,
            type:"Element",
            data:null,
            children:[],
            attributes:{}
        }

        //current add children
        current.children.push(element)
        stack.push(element)

        //change current to children
        current = element


        //temp stop
        if(char === ">"){
            index  +=1
            return  fragment
        }

        index = template.length
    }

    function text(){
        let start = index
        let data =''

        while(index < template.length && template[index] !== "<"){
            data += template[index++]
        }

        current.children.push({
            start:start,
            end:index,
            name:"Text",
            type:'Text',
            data:data,
            children:[],
            attributes:{}
        })

        return fragment
       
    }
    //split into script,template,style block
    const {
        html,
        script,
        style
    } = extract(source)

    template = html
    root.end = html.length

    //still have no ide about this
    // function invoke vs function call ?
    let state:any = fragment

    while(index < template.length-1){
        state = state()
    }

    return {
        html:root,
        js:script,
        css:style
    }
}

function extract(source:string):{
    script:string|null,
    html:string,
    style:string|null
}{
    //todo extract to each context
    return{
        script:null,
        html:source,
        style:null
    }
}