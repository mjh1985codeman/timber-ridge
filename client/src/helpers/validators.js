
class Validator {
    isEmpty(obj) {
        const objValues = Object.values(obj);
        if(objValues.some(value => !value)) {
            return true;
        } else {
            return false;
        }
    };
}

export default new Validator();