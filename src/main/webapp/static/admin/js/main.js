
import Dashboard from "/OrganicStore/static/admin/js/views/Dashboard.js";
import Customer from "/OrganicStore/static/admin/js/views/Customer.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");


const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[0]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = () => {
    const routes = [
        {path:"/OrganicStore/admin-home" , view : Dashboard},
        {path:"/OrganicStore/admin-customer" , view : Customer},
        // {path:"/category" , view : Category},
        // {path:"/product" , view : Product}
    ]
    const mapRouteMatchs = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = mapRouteMatchs.find(routeMatch => routeMatch.result !== null );

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
	    // document.querySelector(".main").innerHTML =  view.getHtml();
    view.getHtml(document.querySelector(".main"));
		
    view.getScript();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        try {
            if (e.target.closest("a").matches("[data-link]")) {
                e.preventDefault();
                navigateTo(e.target.closest("a").href);
            }
        } catch (error) {
        }
    });

    router();
});


