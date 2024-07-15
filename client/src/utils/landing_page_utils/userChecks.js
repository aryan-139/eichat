const validateUID = (uid) => {
    //format validation
    if((uid.length!==8)||(uid.substring(0,3)!=="uid")||(isNaN(uid.substring(3,8)))){ return false}
    //check if uid is already taken
    
    return true;
}

const validateFirstName = (firstName) => {
    if(firstName.length<1){return false;}
    return true;
}
const validateLastName = (lastName) => {
    if(lastName.length<1){return false;}
    return true;
}
const validatePhoneNumber = (phoneNumber) => {
    if((phoneNumber.length!==10)||(phoneNumber.isNaN)){return false;}
    return true;
}

export { validateUID, validateFirstName, validateLastName, validatePhoneNumber };