
class Validator {
    isEmpty(obj) {
        const objValues = Object.values(obj);
        if(objValues.some(value => !value)) {
            return true;
        } else {
            return false;
        }
    }

    pwValidator(pw) {
        if(pw.length < 0) {
            return false;
        } else if (pw.length >= 8) {
            return true;
        }
    }
}

export default new Validator();