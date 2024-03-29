import area from "/OrganicStore/static/common/area.js";

export const initArea = (cityElem,districtElem,subDistrictElem) => {
    for (const [index, data] of area.entries()) {
        let city = data.city;
        let districtSet = data.districtSet;
        let subDistrictSet = data.subDistrictSet;
        let html = `<option value="${city}">${city}</option>`;

        cityElem.insertAdjacentHTML("beforeend", html);

        // Add  district option tag
        for (let district in districtSet) {
            html = `<option value="${district}">${districtSet[district]}</option>`;
            districtElem.insertAdjacentHTML("beforeend", html)
            // Add  subDistrict option tag
            for (let subDistrict of subDistrictSet[district]) {
                html = `<option class="d-none" cityIndex="${index}" districtIndex="${district}" value="${subDistrict.id}">${subDistrict.subDistrict}</option>`;
                subDistrictElem.insertAdjacentHTML("beforeend", html)
            }
        }

    }
}

export const AddAreaEventListener = (districtElem,subDistrictElem) => {
        // d-none => display: none
        subDistrictElem.querySelectorAll(`option[districtIndex="0"]`)
            .forEach(e => e.classList.remove("d-none"));
 
        districtElem.addEventListener("change", e => {
            const districtIndex = e.target.value;
            const childrens = Array.from(subDistrictElem.children);

            childrens.forEach(item => {
                if (item.getAttribute(`districtIndex`) == districtIndex) {
                    item.classList.remove("d-none");
                } else {
                    item.classList.add("d-none");
                }
            });
            let defaultSelected = `option[districtIndex="${districtIndex}"]`;
            subDistrictElem.querySelector(defaultSelected).selected = true;
        })

}