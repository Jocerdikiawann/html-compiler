import { assert, expect, test ,describe,it} from 'vitest'

const validNameChar = /[a-zA-Z0-9_$]/;


describe("Parser Testing",()=>{
    it('pastiin parse itu function',()=>{
        assert.deepEqual(typeof parse,'function',"Harusnya")
    })
    it("parsing html basic",()=>{
        let template = `<span>ini span</span>`

        expect(parse(template)).equal({
            start:0,
            end:21
        })
        
    })
})

function parse(template:string):any{
    let index=0

    let start = 0

    let end = template.length

    let result ={}

    
    function fragment(){
        const start = index++
        let char = template[index]

       

        if(char == '<'){
            let name = ''
            let element = {
                start:index,
                
            }

            while(validNameChar.test(char)){
                name += char
                index += 1
                char = template[index]
            }

            result= {
                start:element.start,
                name:name
            }
        }else{

        index +=1
        }
    }

    while(index < template.length){
        fragment()
    }

    return {
        start:start,
        end:end,
        result:result
    }
}

