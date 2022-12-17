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
                <div class="instant-search__result-price"> ${result.price*(100-result.saleOff)/100}đ </div>
                <p> ${result.description} </p>
            </div>
        `
    }
});

document.querySelector('.instant-search__input').addEventListener('keydown',(e) => {
    if(e.keyCode==13) {
        e.preventDefault();

        if(!e.target.closest('.instant-search').querySelector('.instant-search__btn').classList.contains('disable')) {
            document.querySelector('.instant-search__btn').click();
        }
    }
}) 

document.querySelector('.instant-search__btn').addEventListener('click',(e) =>{
    // e.preventDefault();
    if(e.target.closest('.instant-search').querySelector('.instant-search__btn').classList.contains('disable')) {

        e.preventDefault();
        e.stopPropagation();
        return;
    }

    const query = document.querySelector('.instant-search__input').value;
    const url =  new URL("/OrganicStore/shopping",window.location.origin);
    url.searchParams.set('q',query)
    e.target.closest('a').setAttribute('href', url.toString())
   
})