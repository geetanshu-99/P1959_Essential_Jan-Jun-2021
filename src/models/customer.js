const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  packName: [
    {
      type: String,
      trim: true,
    },
  ],
  months: {
    type: Number,
    trim: true,
  },
  balance: {
    type: Number,
    default: 100,
  },
});

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  return customerObject;
};

customerSchema.pre("save", async function (next) {
  const customer = this;
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
