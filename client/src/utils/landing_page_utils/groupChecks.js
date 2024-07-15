const validateRoom = (room) => {
    if((room.length!==8)||(room.substring(0,3)!=="gid")||(isNaN(room.substring(3,8)))){ return false}
    return true;
    }
export { validateRoom };
