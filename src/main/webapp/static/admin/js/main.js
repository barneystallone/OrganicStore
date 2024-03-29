
import Dashboard from "/OrganicStore/static/admin/js/views/Dashboard.js";
import Customer from "/OrganicStore/static/admin/js/views/Customer.js";
import User from "/OrganicStore/static/admin/js/views/User.js";
import Category from "/OrganicStore/static/admin/js/views/Category.js";
import Inventory from "/OrganicStore/static/admin/js/views/Inventory.js";
// import AddInventory from "/OrganicStore/static/admin/js/views/AddInventory.js";
import Product from "/OrganicStore/static/admin/js/views/Product.js";
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
        {path:"/OrganicStore/admin/user" , view : User},
        {path:"/OrganicStore/admin/category" , view : Category},
        {path:"/OrganicStore/admin/inventory/:param" , view : Inventory},
        {path:"/OrganicStore/admin/inventory" , view : Inventory},
        {path:"/OrganicStore/admin/product" , view : Product}
    ]
    const mapRouteMatchs = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = mapRouteMatchs.find(routeMatch => routeMatch.result !== null );

    if (!match) {  
        // match = {
        //     route: routes[0],
        //     result: [location.pathname]
        // };
        // navigateTo("/OrganicStore/admin/");
        location.pathname = "/OrganicStore/admin/";
    } else{
        if(location.pathname=="/OrganicStore/admin/inventory/khohang") {
            document.documentElement.style.setProperty('--green', '#287bff');
        } else {
            document.documentElement.style.setProperty('--green', '#009879');
        }
        new match.route.view(getParams(match)); // get view
    }
};

window.addEventListener("popstate", router ,true);

window.getCookie = (name) => {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) 
        return match[2];
    
    return null;
}
window.setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        try {
            if (e.target.closest("a")&&e.target.closest("a").matches("[data-link]")) {
                e.preventDefault();
                navigateTo(e.target.closest("a").href);
            }
        } catch (error) {
        }
    });

    router();

    // Logout -> refresh history api
    document.querySelector('.navigation li:last-child a').addEventListener('click',(e)=>{
		e.preventDefault();
        fetch(e.target.closest("a").href,{method:'GET'})
        .then(() => {
            history.go(0);
        })
	})
});


