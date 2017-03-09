import {Manipulator} from "./manipulator";
/**
 * Factory to get the Manipulator class. Ensures a singleton per uid.
 */
export namespace Factory {
    let instances: {} = {};

    export function getInstance(element: SVGElement, uid: string) {
        if (instances.hasOwnProperty(uid)) {
            return instances[uid];
        }
        let instance = createInstance(element);
        instances[uid] = instance;
        return instance;
    }

    function createInstance(element: SVGElement) {
        return new Manipulator(element, null)
    }
}