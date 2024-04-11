//Get Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017", {
  useNewUrlParser: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose Connection Success");
});

module.exports = db;

// const mongoose = require("mongoose");

// let connection;

// const connect = async () => {
//   try {
//     connection = await mongoose.connect(`mongodb://127.0.0.1:27017`, {
//       useNewUrlParser: false,
//     });

//     mongoose.connection.on("error", (err) => {
//       console.log(err);
//     });
//   } catch (e) {
//     console.log("Are you sure MongoDB is running", e);
//   }
// };

// connect();

// module.exports = connection;

//////////////////////
//////////////////////
//////////////////////
//////////////////////

// const Person = mongoose.model("Person", personSchema);

//delete
// const result = await Person.deleteMany({ name: "Bobby" });
// console.log(result);

//update
// const result = await Person.findOneAndUpdate(
//   { name: "Bob" },
//   { name: "Bobby" }
// );

// console.log(result);

//read
// const person = await Person.find({ name: "Bob" });
// console.log(person);

//create
// const bob = new Person({
//   name: "Bob",
//   age: 30,
//   isHappy: true,
//   location: "London",
// });

// bob.save();

//////////////////////
//////////////////////
//////////////////////
//////////////////////
