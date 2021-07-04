const express = require("express");
const Customer = require("../models/customer");
const router = new express.Router();

//Show current Balance
router.get("/customers/current-balance", async (req, res) => {
  const customers = await Customer.find({});
  if (customers.length > 0) {
    const customer = customers[0];
    res.json({ customer, status: "ok" });
  } else if (customers.length <= 0) {
    let customer = new Customer();
    await customer.save();
    res.json({ customer, status: "ok" });
  } else {
    res.json({ status: "error", error: "Some error occured..." });
  }
});

//Recharge
router.patch("/customers/update-balance", async (req, res) => {
  const amount = req.body.amount;
  const customer = await Customer.find({});
  if (customer.length <= 0) {
    return res.json({ status: "error", error: "Could not update..." });
  }
  const id = customer[0]._id;
  try {
    await Customer.findByIdAndUpdate(
      { _id: id },
      { $inc: { balance: amount } },
      { new: true }
    ).then((cust) => {
      res.json({ status: "ok", cust });
    });
  } catch (e) {
    res.json({ status: "error", error: "Could not update..." });
  }
});

//Subscribe a Gold or Silver Plan
router.post("/customers/subscribe", async (req, res) => {
  let { pack, months } = req.body;
  pack = pack.trim().toLowerCase();
  if (!pack || !months) {
    return res.json({ status: "error", error: "Invalid data..." });
  }
  if (!(pack === "silver" || pack === "gold")) {
    return res.json({ status: "error", error: "Invalid pack name..." });
  }
  if (months <= 0) {
    return res.json({
      status: "error",
      error: "Please subscribe for atleast one month...",
    });
  }

  var packCharge = pack === "silver" ? 50 : 100;
  const customer = await Customer.find({});
  if (customer.length <= 0) {
    return res.json({ status: "error", error: "Could not subscribe" });
  }

  const id = customer[0]._id;
  var discount = 0;
  var discountAmount = 0;
  var totalAmount = packCharge * months;
  if (months >= 3) {
    discount = 0.1;
    discountAmount = totalAmount * discount;
    totalAmount = totalAmount - discountAmount;
  }

  try {
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          packName: pack,
          months: months,
        },
        $inc: {
          balance: -totalAmount,
        },
      },
      { new: true }
    ).then((customer) => {
      res.json({
        customer,
        status: "ok",
        packCharge,
        discountAmount,
        totalAmount,
      });
    });
  } catch (e) {
    res.json({ status: "error", error: e });
  }
});

//Display the Subscribe Pack Details
router.get("/customers/subscribe-details", async (req, res) => {
  try {
    const customers = await Customer.find({});
    if (customers.length <= 0) {
      return res.json({ status: "error", error: "No data found" });
    }
    const customer = customers[0];
    const packName = customer.packName;
    if (packName.length <= 0) {
      return res.json({ status: "error", error: "No data found" });
    }
    res.json({ status: "ok", customer });
  } catch (e) {
    res.json({ status: "error", error: "No data found" });
  }
});

//Add channels to existing Subscription
router.post("/customers/existing-subscription", async (req, res) => {
  try {
    const customer = await Customer.find({});
    const silverPack = ["zee", "sony", "star plus"];
    const goldPack = ["zee", "sony", "star plus", "discovery", "nat geo"];
    if (customer.length <= 0) {
      return res.json({ status: "error", error: "Could not add channels" });
    }
    const id = customer[0]._id;
    const packPresent = customer[0].packName;
    if (packPresent.length <= 0) {
      return res.json({
        status: "error",
        error: "Please subscribe for atleast one pack",
      });
    }

    const packages = req.body.packs
      .split(",")
      .map((name) => name.trim().toLowerCase());
    if (packPresent[0].toLowerCase() === "silver") {
      if (packages.some((i) => silverPack.includes(i))) {
        return res.json({
          status: "error",
          error: "Channel name already present",
        });
      }
    }
    if (packPresent[0].toLowerCase() === "gold") {
      if (packages.some((i) => goldPack.includes(i))) {
        return res.json({
          status: "error",
          error: "Channel name already present",
        });
      }
    }
    const packNames = customer[0].packName.map((name) => name.toLowerCase());
    const noOfChannelsUpdated = packages.length;
    let result = packages.some((i) => packNames.includes(i));
    if (result) {
      return res.json({
        status: "error",
        error: "Channel name already present",
      });
    }
    const updatedBalance = noOfChannelsUpdated * 15;
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          packName: {
            $each: packages,
          },
        },
        $inc: { balance: -updatedBalance },
      },
      { new: true }
    ).then((cust) => {
      res.json({ status: "ok", cust });
    });
  } catch (e) {
    res.json({ status: "error", error: e });
  }
});

module.exports = router;
