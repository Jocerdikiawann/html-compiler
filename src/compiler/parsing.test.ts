import { assert, expect, test ,describe,it} from 'vitest'
import {parse} from "./parsing"

describe("Parser Testing",()=>{
    it('pastiin parse itu function',()=>{
        assert.deepEqual(typeof parse,'function',"Harusnya")
    })
    it("parsing html basic",()=>{
        let template = `<span>ini span</span>`

        expect(tag(template)).equal({
            start:0,
            end:21
        })
        
    })
})

function tag(template:string):any{
    let index=0

    let start = 0

    let end = template.length



    function tag(){
        const start = index++
        const char = template[index]

        if(char === '<'){

        }

        index = index+1
        
    }

    while(index < template.length){
        tag()
    }

    return {
        start:start,
        end:end
    }
}