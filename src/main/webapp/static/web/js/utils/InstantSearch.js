class InstantSearch {
    constructor(instantSearch,options) {
        this.options =options;
        this.elements = {
            main : instantSearch,
            input : instantSearch.querySelector(options.inputSelector),
            resultsContainer : document.createElement('div')
        }

        this.elements.resultsContainer.classList.add("instant-search__result--container");
        this.elements.main.appendChild(this.elements.resultsContainer);

        this.addListeners();
    }

    addListeners() {
        let delay;
        this.elements.input.addEventListener('input',()=>{ 
            clearTimeout(delay);
            
            const query = this.elements.input.value.trim().replace(/\s+/g," ");
            
            const searchBtn = this.elements.main.querySelector('.instant-search__btn');
            
            if(query.length<3) {
                if(searchBtn&&!searchBtn.classList.contains('disable')) {
                    searchBtn.classList.add('disable');
                }
            } else if(searchBtn&&searchBtn.classList.contains('disable')) {
                searchBtn.classList.remove('disable');
            }

            delay = setTimeout(()=>{
                if(query.length<3) { 
                    this.populateResults([]);
                    return;
                }

                this.callSearchAPI(query).then((results ) => {
                        this.populateResults(results);
                });

            }, 500);
        })

        this.elements.input.addEventListener('focus',() => {
            this.elements.resultsContainer.classList.add("instant-search__result-container--visible");
        });
    
        this.elements.input.addEventListener('blur',() => {
            this.elements.resultsContainer.classList.remove("instant-search__result-container--visible");
        });
    }
    
    /**
     * Cập nhật hiển thị kết quả dưới thanh  search bar.
     *
     * @param {Object[]} results Danh sách các kết quả tìm kiếm 
    */
    populateResults(results) {
        // Xóa các kết quả đang tồn tại
        if(results==[]) {

        }
        while (this.elements.resultsContainer.firstChild) {
            this.elements.resultsContainer.removeChild(
                this.elements.resultsContainer.firstChild
            );
        }
        // Cập nhật danh sách dưới search bar
        for (const result of results) {
            this.elements.resultsContainer.appendChild(
                this.createResultElement(result)
            );
        }   
    }

    /**
     * Tạo request đến endpoint và lấy về results.
     *
     * @param {string} query Search query
     * @returns {Promise<Object[]>}
     */    
    callSearchAPI(query) {
        const url = new URL(this.options.searchURL.toString()); //copy

        url.searchParams.set(this.options.queryParam, query);

        this.setLoading(true);
        
        // setTimeout(() => {
        return new Promise(resolve => {
            setTimeout(resolve,300);
        })
        .then(() => {
            return fetch(url,{
                method : "get",
            })
        })
        .then(res => {
            if(res.status!==200) {
                throw new Error("Lỗi tìm kiếm");
            }
            // throw new Error("Lỗi tìm kiếm");
            return res.json();
        })
        .catch(e =>{ 
            console.error(e);

            return [];
        })
        .finally((results ) => {
            this.setLoading(false);

            return results;
        })
    }

    setLoading(bool) {
        this.elements.main.classList.toggle("instant-search--loading",bool);
    }

    /**
     * Tạo ra các HTML element đại diện cho  mỗi result ở trong  results.
     * Sau này có thể truyền 1 tham số callback có thể là gọi api hay j đó để security
     *
     * @param {Object} result kết quả tìm kiếm
     * @returns {HTMLAnchorElement}
     */
    createResultElement(result) {
        
        const element = (this.options.anchor) ? document.createElement("a") : document.createElement("div");
        element.classList.add("instant-search__result");
        element.insertAdjacentHTML("afterbegin",this.options.templateFunction(result));

        // attribute href
        element.setAttribute('href',`/OrganicStore/details/${result.id}`);
        element.setAttribute('data-id',`${result.id}`);
        element.setAttribute('data-link','');

        // Chặn trước khi blur ra khỏi
        element.addEventListener('mousedown',(e) => {
            e.preventDefault();
        })
        return element;

        // gọi callback có thể là gọi api hay j đó để security (chưa làm)
    }
}

export default InstantSearch;