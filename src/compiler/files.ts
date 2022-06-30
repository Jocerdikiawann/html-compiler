import {readFileSync} from "fs"
import dedent from "dedent"


export function readFile(fileName:string){
    return dedent(readFileSync(fileName,"utf-8"))
}