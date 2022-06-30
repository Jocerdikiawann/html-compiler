/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import { assert, describe, expect, it } from "vitest";
import {toMolecule} from "../compiler/parser"
import dedent from "dedent"

describe("Parser Testing", () => {
  it("pastin toMolecule itu function", () => {
    assert.deepEqual(typeof toMolecule, "function", "Harusnya");
  });
  it("parsing html basic", () => {
    let source = dedent`
    <span>ini span</span>
    `
    assert.deepEqual(toMolecule(source),{
      html:{
        start:0,
        end:21,
        type:"Fragment",
        data:null,
        name:null,
        children:[
            {
                start:0,
                end:20,
                type:"Element",
                data:null,
                name:"span",
                children:[
                    {
                        start:6,
                        end:14,
                        type:"Text",
                        data:"ini span",
                        name:"Text",
                        children:[
                        ],
                        attributes:{}
                    }
                ],
                attributes:{}
            }
        ],
        attributes:{}
    },
    js:null,
    css:null
    });
  });

  it("find index <script></script>",()=>{
    let source = `<script>let name;</script><div>ini div</div>`

    let startScriptPosition = source.search("<script>")
    let endScriptPosition = source.search("</script>")
    let finalEndScript = (endScriptPosition+9)

    let script = source.slice(startScriptPosition,finalEndScript)
    let html = source.slice(finalEndScript,source.length)
    

    expect(startScriptPosition).equal(0)
    expect(endScriptPosition).equal(17)


  

    expect(script).equal(`<script>let name;</script>`)

    expect(html).equal(`<div>ini div</div>`)
  })
});

