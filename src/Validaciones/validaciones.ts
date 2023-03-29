export function validateOnlyLetters(entry: any): Boolean{
    const patternLetters = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i')
    if (patternLetters.test(entry)) {return false;}
    return true
}
export function validatePhone(entry: any): Boolean {
    const patternNumbers = new RegExp('^[0-9]+$', 'i')
    if(patternNumbers.test(entry)) {
        return false
    }
    return true
}
export function validateOnlyNumbers(entry: any): Boolean{
    if(isNaN(entry)) return true;
}
export function validateEmptyField(entry: any): boolean{
    if(entry == 0) return true;
}
export function validateDate(entry: any): boolean{
    const dateFormat = new RegExp("/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/")
    if (dateFormat.test(entry)) 
        return false
    
}

export function validateBool(entry: any): boolean{
    if(entry == "true" || entry == "false") return false;
    
}
export function validateEmail(entry: any){
    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(entry)) {
        return false
    }
    return true
}

