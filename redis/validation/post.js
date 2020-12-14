const Validator = require("validator");
const isEmpty = require("is-empty");
const Filter = require("bad-words");
const filter = new Filter();

module.exports = validatePostInput = data => {
   let errors = {};

   let { title, body } = data;
   // Converting empty fields to empty string as validator function works only with strings
   title = !isEmpty(title) ? title : "";
   body = !isEmpty(body) ? body : "";

   if (Validator.isEmpty(title)) {
      errors.title = "Title is required";
   }
   if (Validator.isEmpty(body)) {
      errors.body = "Description is required";
   }
   if (filter.isProfane(body)) {
      errors.body = "No bad words allowed";
   }
   if (filter.isProfane(title)) {
      errors.title = "No bad words allowed";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};
