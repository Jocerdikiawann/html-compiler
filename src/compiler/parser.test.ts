/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
import { assert, describe, it } from "vitest";
import {toMolecule} from "./parser"

describe("Parser Testing", () => {
  it("pastiin parse itu function", () => {
    assert.deepEqual(typeof toMolecule, "function", "Harusnya");
  });
  it("parsing html basic", () => {
    let source = `<span>ini span</span>`;
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
});

