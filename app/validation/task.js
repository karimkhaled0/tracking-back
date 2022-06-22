import Validator from "validator";
import isEmpty from "./isEmpty";


export const validateTaskInput = task => {

    let errors = {};


    task.location = !isEmpty(task.location) ? task.location : '';
    task.customerName = !isEmpty(task.customerName) ? task.customerName : '';
    task.customerPhonenumber = !isEmpty(task.customerPhonenumber) ? task.customerPhonenumber : '';
    task.description = !isEmpty(task.description) ? task.description : '';
    task.category = !isEmpty(task.category) ? task.category : '';
    task.startDate = !isEmpty(task.startDate) ? task.startDate : '';
    task.endDate = !isEmpty(task.endDate) ? task.endDate : '';
    task.duration = !isEmpty(task.duration) ? task.duration : '';


    if (Validator.isEmpty(task.location)) {
        errors.location = "Location field is required!";
    }

    if (Validator.isEmpty(task.customerName)) {
        errors.customerName = "customerName field is required!";
    }



    if (!Validator.isMobilePhone(task.customerPhonenumber, ['ar-EG'])) {
        errors.phonenumber = "Invalid phonenumber!!"

    }
    if (Validator.isEmpty(task.customerPhonenumber)) {
        errors.phonenumber = "Phonenumber field is required!";
    }



    if (Validator.isEmpty(task.category)) {
        errors.category = "category field is required!";
    }

    if (Validator.isEmpty(task.description)) {
        errors.description = "description field is required!";
    }
    if (Validator.isEmpty(task.duration)) {
        errors.duration = "duration field is required!";
    }

    if (!Validator.isDate(task.startDate)) {
        errors.startDate = "Invalid Date !";
    }

    if (Validator.isEmpty(task.startDate)) {
        errors.startDate = "date field is required!";
    }


    if (Validator.equals(task.endDate, task.startDate)) {
    }
    else if (!Validator.isAfter(task.endDate, task.startDate)) {
        errors.endDate = "Enddate must be after startdate";
    }




    if (!Validator.isDate(task.endDate)) {
        errors.endDate = "Invalid Date !";
    }

    if (Validator.isEmpty(task.endDate)) {
        errors.endDate = "endDate field is required!";
    }


    console.log(errors)
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

