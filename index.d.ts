// Type definitions for Pvjs
// Project: Pvjs
// Definitions by: Jacob Windsor jcbwndsr.com
import {Opts} from "./src/wrappers/vanilla";
export as namespace Pvjs;

export = Pvjs;

/* Declare the Pvjs function with overloads */
// TODO: Add the callback type
declare function Pvjs(selector: string, about:string): void;
declare function Pvjs(selector: string, about:string, opts: Opts): void;
declare function Pvjs(selector: string, about:string, opts: Opts, callback: any): void;
