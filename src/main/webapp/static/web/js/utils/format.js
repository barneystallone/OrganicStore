function currencyFormat(price) {
    return (price*1).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
}
function convertToNumber(strPrice) {
    return strPrice.replace(/[^0-9]/g,"")*1
}

export  {currencyFormat,convertToNumber} ;