
import Dashboard from "/OrganicStore/static/admin/js/views/Dashboard.js";
import Customer from "/OrganicStore/static/admin/js/views/Customer.js";
import Category from "/OrganicStore/static/admin/js/views/Category.js";
import {Login} from "/OrganicStore/static/admin/js/views/login.js";
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
        {path:"/OrganicStore/admin/" , view : Dashboard},
        {path:"/OrganicStore/admin/customer" , view : Customer},
        {path:"/OrganicStore/admin/category" , view : Category},
        // {path:"/OrganicStore/login" , view : Login}
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
        navigateTo("/OrganicStore/admin/");
    }
    const view = new match.route.view(getParams(match));
    // if(location.pathname!="/OrganicStore/login"){
    //     document.querySelector("body").classList.remove("hidden");
    // }
    // view.getAsync();
    // view.getHtml();
		
    // view.getScript();
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


