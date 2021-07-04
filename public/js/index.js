//View Balance
document
  .getElementById("view-balance")
  .addEventListener("click", showCurrentBalance);
async function showCurrentBalance(event) {
  event.preventDefault();
  const result = await fetch("/customers/current-balance").then((res) =>
    res.json()
  );
  if (result.status === "ok") {
    alert("Current Balance is ₹" + result.customer.balance);
  } else {
    alert(result.error);
  }
}

//Recharge form toggle
document
  .getElementById("recharge-amount")
  .addEventListener("click", toggleInput);
function toggleInput() {
  var x = document.getElementById("recharge-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Recharge the amount
document
  .getElementById("recharge-form")
  .addEventListener("submit", updateBalance);
async function updateBalance(event) {
  event.preventDefault();
  const result = await fetch("/customers/update-balance", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: document.getElementById("recharge-value").value,
    }),
  }).then((res) => res.json());
  if (result.status === "ok") {
    document.getElementById("recharge-value").value = "";
    alert(
      "Recharge completed successfully.\nCurrent balance is ₹" +
        result.cust.balance
    );
    document.getElementById("recharge-form").style.display = "none";
  } else {
    alert(result.error);
  }
}

//Toggle packs available forms
document
  .getElementById("packs-available")
  .addEventListener("click", togglePacksAvailable);
function togglePacksAvailable() {
  var x = document.getElementById("available-packs");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//Subscribe Gold/Silver Plan form toggle
document
  .getElementById("subscribe-packs")
  .addEventListener("click", toggleSubscribe);
function toggleSubscribe() {
  var x = document.getElementById("subscribe-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("subscribed-packs-details").innerHTML = "";
  }
}

//Subscribe plans
document
  .getElementById("subscribe-form")
  .addEventListener("submit", subscribePacks);
async function subscribePacks(event) {
  event.preventDefault();
  const result = await fetch("/customers/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pack: document.getElementById("pack").value,
      months: document.getElementById("months").value,
    }),
  }).then((res) => res.json());
  if (result.status === "ok") {
    document.getElementById("pack").value = "";
    document.getElementById("months").value = "";
    document.getElementById("subscribed-packs-details").innerHTML = `
        <p>You have successfully subscribed the following packs -${result.customer.packName[0].toUpperCase()}</p>
        <p>Monthly price: ₹${result.packCharge}</p>
        <p>No of months: ${result.customer.months}</p>
        <p>Subscription Amount: ₹${
          result.customer.months * result.packCharge
        }</p>
        <p>Discount applied: ₹${result.discountAmount}</p>
        <p>Final Price after discount: ₹${result.totalAmount}</p>
        <p>Account Balance: ₹${result.customer.balance}</p>
        `;
    document.getElementById("subscribed-packs-details").scrollIntoView();
  } else {
    alert(result.error);
  }
}

//Subscription Details
document
  .getElementById("view-subscription")
  .addEventListener("click", subscriptionDetails);
async function subscriptionDetails(event) {
  event.preventDefault();
  const result = await fetch("/customers/subscribe-details").then((res) =>
    res.json()
  );
  if (result.status === "ok") {
    alert(
      "Currently Subscribed packs and channels: " +
        result.customer.packName.join("+")
    );
  } else {
    alert(result.error);
  }
}

//Existing Subscription form toggle
document
  .getElementById("existing-subscription")
  .addEventListener("click", toggleSubscription);
function toggleSubscription() {
  var x = document.getElementById("subscription-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//Existing Subscription
document
  .getElementById("subscription-form")
  .addEventListener("submit", fetchExistingPack);
async function fetchExistingPack(event) {
  event.preventDefault();
  const result = await fetch("/customers/existing-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      packs: document.getElementById("packs").value,
    }),
  }).then((res) => res.json());
  if (result.status === "ok") {
    document.getElementById("packs").value = "";
    alert(
      "Channels added successfully.\n Account balance:" + result.cust.balance
    );
    document.getElementById("subscription-form").style.display = "none";
  } else {
    alert(result.error);
  }
}
