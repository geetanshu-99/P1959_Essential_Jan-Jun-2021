# P1959 Dev Essentials Jan to Jun 2021

**This is a Sat Tv D2H app using Node.js, Express, Mongoose, HTML, CSS and JavaScript.**

- SatTV offers multiple predefined channel packages (called as base packs). Base packs available to purchase are Gold and Silver that comes with certain channels.
- User has an initial balance of 100 Rs. in his/her account.
- Whenever the base pack is subscribed, the base package price will be deducted from the account balance.
- User will receive a 10% discount on the base pack amount if the duration is atleast 3 months.
- User can add the individual channel into the current subscription on which amount will be deducted from the account balance.

## Installation & Setup

1. Install Node.js and MongoDB if you haven't already.

2. Install all the dependencies.

   **npm install**

3. In a seprate shell start MongoDB.(For Linux users)

   **mongo**

4. From within the project directory start the server in seprate shell.

   **npm start**

   _Or run with nodemon_

   **npm run dev**

5. Open a browser and navigate to http://localhost:3000

## Sample Input/ Output

Welcome to SatTV

1. View current balance in the account
2. Recharge Account
3. View available packs and channels
4. Subscribe to base packs
5. Add channels to an existing subscription
6. View current subscription details

**Output :**

- _Option: 1_

  - View current balance in the account

    **Current balance is ₹100.**

- _Option: 2_

  - Enter the amount to recharge 500

    **Recharge completed successfully. Current balance is ₹600**

- _Option: 3_

  - View available packs and channels

    **Available packs for subscription -**

    **Silver pack: Zee, Sony, Star Plus: 50 Rs.**

    **Gold Pack: Zee, Sony, Star Plus, Discovery, NatGeo: ₹100**

- _Option: 4_

  - Subscribe to channel packs:

    Enter the Pack you wish to subscribe(Silver / Gold): Gold

    Enter the months: 3

    **You have successfully subscribed the following packs - Gold**

    **Monthly price: 100 Rs.**

    **No of months: 3**

    **Subscription Amount: ₹300**

    **Discount applied: ₹30**

    **Final Price after discount: ₹270**

    **Account balance: ₹330**

- _Option: 5_

  - Add channels to existing subscription.

    Enter channel names to add : Aaj Tak,Sony Six

    **Channels added successfully.**

    **Account balance: ₹300.**

- _Option: 6_

  - View current subscription details

    **Currently subscribed packs and channels: Gold + Aaj Tak + Sony Six**
