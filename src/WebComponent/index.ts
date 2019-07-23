import { CustomElement } from "./CustomElement";
declare let window: any;

const registerElement = () =>
  window.customElements.define("wikipathways-pvjs", CustomElement);

if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "complete") {
    registerElement();
  } else {
    window.addEventListener(
      "load",
      function listener(event) {
        window.removeEventListener("load", listener, false);
        registerElement();
      },
      false
    );
  }
}
