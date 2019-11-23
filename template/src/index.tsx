export default function sum(a: number, b: number) {
  return a + b;
}

function mutateElementText(
  element: HTMLElement | null,
  text: string
): HTMLElement | void {
  if (!element) {
    return console.error('mutateElementText: There is no document object');
  }
  element.textContent = text;
  return element;
}

function getElementById(id: string): HTMLElement | null {
  if (document && typeof document === 'object') {
    if (document.getElementById(id)) {
      return document.getElementById(id);
    }
  }
  return null;
}

mutateElementText(getElementById('root'), `${sum(1, 2)}`);
