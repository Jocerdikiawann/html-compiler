import { parse } from './compiler/parsing'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerText = `${JSON.stringify(parse(`<span>ini span</span>`))}`
