export class Router {

    subs = []

    constructor(routes) {
        this.handleLocation = this.handleLocation.bind(this)
        this.route = this.route.bind(this)

        this.routes = this.#parseRoutes(routes)

        window.onpopstate = this.handleLocation;
        window.route = this.route;
        this.handleLocation();
    }

    #parseRoutes(routes){
        return Object.entries(routes).reduce((acc, [uri, cb]) => {
            const rule = uri
                .replace(/([\\\/\-\_\.])/g, "\\$1")
                .replace(/\{[a-zA-Z]+\}/g, "(:any)")
                .replace(/\:any/g, "[\\w\\-\\_\\.]+")
                .replace(/\:word/g, "[a-zA-Z]+")
                .replace(/\:num/g, "\\d+");

            return [...acc, {
                route: uri,
                reg: new RegExp("^" + rule + "$", "i"),
                handler: cb
            }]
        }, [])
    }

    set onChange(fn) {
        this.subs.push(fn)
    }

    handleLocation() {
        const path = window.location.pathname;
        const res = [];
        let route;
        for (let i = 0; i < this.routes.length; i++){
            const matches = path.match(this.routes[i].reg)
            if (matches) {
                res.push([...matches.map(el => el.replace('/', ''))])
                route = this.routes[i];
                break;
            }
        }
        this.subs.forEach(fn => fn())
        if (typeof route.handler === 'function')
            route.handler(res);
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();
        this.handleLocation();
    };
}
