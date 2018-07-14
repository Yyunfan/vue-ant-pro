import ResizeObserverLite from 'resize-observer-lite'
import { matchQueries } from 'container-query-toolkit'
import isShallowEqual from './isShallowEqual'

export default class ContainerQueryCore {
    result = {}

    constructor(query, callback) {
        this.rol = new ResizeObserverLite(size => {
            const result = matchQueries(query)(size);
            if (!isShallowEqual(this.result, result)) {
                callback(result);
                this.result = result;
            }
        });
    }

    observe(element) {
        this.rol && this.rol.observe(element);
    }

    disconnect() {
        if (this.rol) {
            this.rol.disconnect();
            this.rol = null
        }
    }
}
