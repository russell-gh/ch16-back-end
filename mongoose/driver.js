const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connect = async () => {
  try {
    const connection = await mongoose.connect(`mongodb://127.0.0.1:27017`, {
      useNewUrlParser: false,
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });

    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////

    const personSchema = new Schema({
      name: String,
      age: Number,
      location: String,
      isHappy: Boolean,
    });

    const Person = mongoose.model("Person", personSchema);

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
  } catch (e) {
    console.log("Are you sure MongoDB is running", e);
  }
};

connect();
