import InstantSearch from "/OrganicStore/static/web/js/utils/InstantSearch.js";

const searchProduct =  document.querySelector('#searchProd');
const instantSearchProducuts = new InstantSearch(searchProduct,{
    inputSelector : ".instant-search__input",
    searchURL : new URL("/OrganicStore/api-search-product",window.location.origin),
    queryParam : "q",
    templateFunction : (result) =>{
        return `
            <div class="instant-search__result--left">
                <img src="data:image/jpg;base64,${result.base64Images}" alt="${result.name}">
            </div>
            <div class="instant-search__result--right">
                <div class="instant-search__result-title"> 
                    <span> ${result.name} </span>
                </div>
                <div class="instant-search__result-price"> ${result.price}đ </div>
                <p> ${result.description} </p>
            </div>
        `
    }
});

console.log(instantSearchProducuts);