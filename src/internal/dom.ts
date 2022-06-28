export function element<K extends keyof HTMLElementTagNameMap>(name: K) {
  return document.createElement<K>(name);
}
export function element_is<K extends keyof HTMLElementTagNameMap>(
  name: K,
  is: string
) {
  return document.createElement<K>(name, { is });
}

export function setText(text: string, el: HTMLElement) {
  return (el.textContent = text);
}

export function append(target: Node, node: Node) {
	target.appendChild(node);
}

export function detach(node: Node) {
  node.parentNode?.removeChild(node);
}

export function insert(target: Node, node: Node, anchor?: Node) {
  target.insertBefore(node, anchor || null);
}

export function text(data: string) {
	return document.createTextNode(data);
}
export function space() {
	return text(' ');
}

export function empty() {
	return text('');
}
export function set_input_value(input:HTMLInputElement, value:any) {
	input.value = value == null ? '' : value;
}