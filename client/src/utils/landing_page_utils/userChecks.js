const validateUID = (uid) => {
    //format validation
    if((uid.length!==8)||(uid.substring(0,3)!=="uid")||(isNaN(uid.substring(3,8)))){ return false}
    //check if uid is already taken

    return true;
}

export { validateUID };