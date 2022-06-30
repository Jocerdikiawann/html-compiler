/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 *
 */

const validNameChar = /[a-zA-Z0-9_$]/;

export type Molecule = {
  start: number;
  end: number | null;
  type: "Fragment" | "Element" | "Text";
  data: string | null;
  name: string | null;
  children: Array<Molecule>;
  attributes: any;
};

export function toMolecule(source: string): {
  js: string | null;
  html: Molecule;
  css: string | null;
} {
  let index = 0;
  let template = ``;

  let root: Molecule = {
    start: 0,
    end: 0,
    type: "Fragment",
    data: null,
    name: null,
    children: [],
    attributes: {},
  };

  let stack = [root];
  let currentMolecule = root;

  function fragment() {
    let char = template[index];

    if (char === " ") {
      index += 1;
    }

    //check tag <span> until </span>
    if (char === "<") {
      return tag;
    }

    return text;
  }

  function tag() {
    //get after <
    let start = index++;
    //take name
    let char = template[index];
    //unfortunattely if char === / that mean the tag must be closed
    const isClosedTag = char === "/";

    if (isClosedTag) {
      index += 1;
      char = template[index];
    }

    let name = "";

    //take name if until found >
    while (validNameChar.test(char)) {
      name += char;
      index += 1;
      char = template[index];
    }

    //never found > throw eror
    if (isClosedTag) {
      if (char !== ">")
        throw Error(`Unexpected > at ${name}: ${index} actual is ${char}`);

      char += 1;
      currentMolecule.end = index;
      stack.pop();
      currentMolecule = stack[stack.length - 1];

      //we found > and search for children
      return fragment;
    }

    const molecule: Molecule = {
      start: start,
      end: null, //fill later at next recursive
      name: name,
      type: "Element",
      data: null,
      children: [],
      attributes: {},
    };

    //current add children
    currentMolecule.children.push(molecule);
    stack.push(molecule);

    //change current to children
    currentMolecule = molecule;

    //temp stop
    if (char === ">") {
      index += 1;
      return fragment;
    }
  }

  function text() {
    let start = index;
    let data = "";

    while (index < template.length && template[index] !== "<") {
      data += template[index++];
    }

    currentMolecule.children.push({
      start: start,
      end: index,
      name: "Text",
      type: "Text",
      data: data,
      children: [],
      attributes: {},
    });

    return fragment;
  }
  //split into script,template,style block
  const { html, script, style } = extract(source);

  template = html;
  root.end = html.length;

  //still have no ide about this
  // function invoke vs function call ?
  let state: any = fragment;

  while (index < template.length - 1) {
    state = state();
  }

  return {
    html: root,
    js: script,
    css: style,
  };
}

function extract(source: string): {
  script: string | null;
  html: string;
  style: string | null;
} {
  let js = null;
  let html = "";

  if (source.includes("<script>") && source.includes("</script>")) {
    //todo extract to each context
    let startScriptPosition = source.search("<script>");
    let endScriptPosition = source.search("</script>");
    let finalEndScript = endScriptPosition + 9;

    js = source.slice(startScriptPosition, finalEndScript);
    html = source.slice(finalEndScript, source.length);

    return {
        script: js,
        html: html,
        style: null,
      };
  }

  return{
    script: null,
    html: source,
    style: null,
  }

  
}
