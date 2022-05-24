import Shopping from "/OrganicStore/static/web/js/views/Shopping.js";
import Details from "/OrganicStore/static/web/js/views/Details.js";
import CartSub from "/OrganicStore/static/web/js/utils/cart_sub.js";
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

const loader = ()=>{
    // document.querySelector("#preloder").style.display = "block";
    // document.querySelector(".loader").style.display = "block";
    // $(".loader").fadeOut();
    // $("#preloder").delay(50).fadeOut("slow");
    $("html, body").animate({ scrollTop: "0" }, 500);
}

const router = () => {
    const routes = [
        // {path:"/OrganicStore/" , view : Home},
        // {path:"/OrganicStore/admin/category" , view : Category},
        // {path:"/OrganicStore/details/:id/:a" , view : Details},
        {path:"/OrganicStore/details/:id" , view : Details},
        {path:"/OrganicStore/shopping" , view : Shopping}
    ]
    const mapRouteMatchs = routes.map(route => {
        console.log(location.pathname.match(pathToRegex(route.path)));
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
        navigateTo("/OrganicStore/shopping");
    }
    new match.route.view(getParams(match)); // get view
    loader();
    
};

window.addEventListener("popstate", router ,true);

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
    new CartSub(document.querySelector('.cart_subs'));
    router();

});


