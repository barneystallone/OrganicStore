export default class SelectTag {
    constructor(){
        this.elements = {
            selectHtml : select,
            optionHtml : optionHtml,
        }
    }

    creatOptionTag (config) {
        // config  => id="film", name="category" ,data-id= "aaaa" , data-value="ten text"
        const template = document.createElement("template");
        template.innerHTML = optionHtml;
        let option = template.content.firstElementChild,
            input  = option.querySelector('input');
        for(const [key,value] of Object.entries(config)) {
            input.setAttribute(key,value);
        }
        option.querySelector('label').setAttribute('for',config.id);
        option.querySelector('label').textContent = config["data-value"];
        return option;
    }
    
    AddListener() {
        const selected = document.querySelector(".selected");
        const optionsContainer = document.querySelector(".options-container");
        
        const optionsList = document.querySelectorAll(".option");
        
        selected.addEventListener("click", () => {
            optionsContainer.classList.toggle("active");
        });
        
        optionsList.forEach(o => {
            o.addEventListener("click", (e) => {
                if(e.target.closest('label')==null){
                    o.querySelector('label').click();
                }
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                // document.querySelector('input[data-id="2"]+label').click()
            });
        });  
    }
}

const select = `
    <div class="select-box">
        <div class="options-container">
          <div class="option">
            <input type="radio" class="radio" id="view_all" name="category" data-val="null" checked/>
            <label for="view_all">View All</label>
          </div>

          
        </div>

        <div class="selected">
            View All
        </div>
      </div>

`;
const optionHtml = `
    <div class="option">
        <input type="radio" class="radio" />
        <label ></label>
    </div>
`;