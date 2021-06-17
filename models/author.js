const { DateTime } = require("luxon");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

AuthorSchema.virtual("lifespan").get(function () {
  return `${formattedDate(this.date_of_birth)} -
    ${formattedDate(this.date_of_death)}`;
});

AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

const formattedDate = (date) => {
  return date
    ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
    : "";
};

module.exports = mongoose.model("Author", AuthorSchema);
