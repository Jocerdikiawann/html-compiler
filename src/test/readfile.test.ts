/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import { assert, describe, expect, it } from "vitest";

import {join} from "path"
import {readFile} from "../compiler/files"
import {toMolecule} from "../compiler/parser"

describe("File Parser Testing", () => {


  it("read file and parsing",()=>{
    let source = readFile(join(__dirname,"tes.svelte"))
    expect(source).equal("<span>ini span</span>")

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
  })
});