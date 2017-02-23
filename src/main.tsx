import {pvjs} from './pvjs-wrapper/pvjs-wrapper.component';
export {Pvjs} from './pvjs-wrapper/pvjs-wrapper.component';

declare var window: any;

window.pvjs = pvjs;
export let pvjs = pvjs;