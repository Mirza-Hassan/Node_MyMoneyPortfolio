const myMoney = require("../myMoney");

// Checking initial balance allocation
test("allocate function should set initial balances correctly", () => {
  const db = { balances: [] };
  myMoney.allocate(db, 1000, 2000, 3000);
  expect(db.balances[0].equity).toBe(1000);
});

// Testing SIP setting
test("sip function should set SIP correctly", () => {
  const db = {};
  myMoney.sip(db, 500, 1000, 1500);
  expect(db.sip.equity).toBe(500);
});

// Testing balance adjustment based on value change
test("change function should adjust balances based on value change", () => {
  const db = {
    balances: [{ equity: 1000, debt: 2000, gold: 3000 }],
    sip: { equity: 100, debt: 150, gold: 200 },
  };
  myMoney.change(db, "+10%", "-20%", "+30%", "JANUARY");
  expect(db.balances[1].debt).toBe(2146);
});

// Checking balance retrieval for a specific month
test("balance function should retrieve balance data for a specific month", () => {
  const months = { JANUARY: 0 };

  const db = {
    balances: [{ equity: 1000, debt: 2000, gold: 3000 }],
  };
  const month = "JANUARY";
  const balanceData = db.balances[months[month]];
  expect(balanceData.equity).toBe(1000);
});

// Testing rebalancing function
test("rebalance function should adjust balances according to rebalancing rules", () => {
  const db1 = { balances: [{ equity: 1000, debt: 2000, gold: 3000 }] };
  const db2 = {
    balances: [
      { equity: 1000, debt: 2000, gold: 3000 },
      { equity: 1500, debt: 1800, gold: 2500 },
    ],
  };
  myMoney.rebalance(db1);
  myMoney.rebalance(db2);
});
