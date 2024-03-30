const months = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
};

// Initialize portfolio balances
const allocate = (db, equity, debt, gold) => {
  const total = Number(equity) + Number(debt) + Number(gold);
  db.balances = [
    { equity: Number(equity), debt: Number(debt), gold: Number(gold) },
  ];
  db.mix = {
    equity: Number(equity) / total,
    debt: Number(debt) / total,
    gold: Number(gold) / total,
  };
};

// Set SIP (Systematic Investment Plan)
const sip = (db, equity, debt, gold) => {
  db.sip = { equity: Number(equity), debt: Number(debt), gold: Number(gold) };
};

// Adjust portfolio based on value change
const change = (db, equity, debt, gold, month) => {
  const data = db;
  const changeValues = { equity, debt, gold };
  Object.keys(changeValues).forEach((asset) => {
    changeValues[asset] =
      parseInt(changeValues[asset].replace("%", "").replace(".", ""), 10) +
      10000;
  });
  const amounts = data.balances[months[month]];
  Object.keys(amounts).forEach((asset) => {
    amounts[asset] = Math.floor((amounts[asset] * changeValues[asset]) / 10000);
  });
  if (month === "JUNE" || month === "DECEMBER") {
    data.balances.push("");
    updatePortfolioBalances(db);
    return;
  }
  const updatedMonth = {};
  Object.keys(amounts).forEach((asset) => {
    updatedMonth[asset] = amounts[asset] + data.sip[asset];
  });
  data.balances.push(updatedMonth);
};

// Update portfolio balances based on mix and SIP
const updatePortfolioBalances = (db) => {
  const data = db;
  data.balances.pop();
  const balanceData = data.balances.pop();
  const total = balanceData.equity + balanceData.debt + balanceData.gold;
  Object.keys(balanceData).forEach((asset) => {
    balanceData[asset] = Math.floor(data.mix[asset] * total);
  });
  data.balances.push(balanceData);
  const updatedMonth = {};
  Object.keys(balanceData).forEach((asset) => {
    updatedMonth[asset] = balanceData[asset] + data.sip[asset];
  });
  data.balances.push(updatedMonth);
};

// Display portfolio balance for a specific month
const balance = (db, month) => {
  const balanceData = db.balances[months[month]];
  process.stdout.write(
    `${balanceData.equity} ${balanceData.debt} ${balanceData.gold} \n`
  );
};

// Rebalance portfolio
const rebalance = (db) => {
  const len = db.balances.length;
  if (len > 12) {
    const { equity, debt, gold } = db.balances[11];
    process.stdout.write(`${equity} ${debt} ${gold}\n`);
  } else if (len > 6) {
    const { equity, debt, gold } = db.balances[5];
    process.stdout.write(`${equity} ${debt} ${gold}\n`);
  } else {
    process.stdout.write("CANNOT_REBALANCE\n");
  }
};

module.exports = {
  allocate,
  sip,
  change,
  balance,
  rebalance,
};
