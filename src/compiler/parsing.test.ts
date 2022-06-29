import { assert, describe, it } from "vitest";
import {parse} from "./parsing"

describe("Parser Testing", () => {
  it("pastiin parse itu function", () => {
    assert.deepEqual(typeof parse, "function", "Harusnya");
  });
  it("parsing html basic", () => {
    let template = `<span>ini span</span>`;


    
    assert.deepEqual(parse(template),{
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
    });
  });
});

