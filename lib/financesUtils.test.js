import { getFinanceStrings } from "./financesUtils";

describe("finances", () => {
  it("returns a valid finances string", () => {
    const finances = getFinanceStrings({
      ytd_total: "$500,000.00",
      yearly_goal: "$3,200,000.00",
      weekly: {
        week_of: "June 20",
        amount: "$1,234.50",
      },
    });
    expect(typeof finances.ytd_total).toBe("string");
    expect(typeof finances.yearly_goal).toBe("string");
    expect(typeof finances.weekly_donation).toBe("string");
    expect(typeof finances.ytd_percent).toBe("string");
    expect(typeof finances.week_of).toBe("string");
  });
  it("works with numbers", () => {
    const finances = getFinanceStrings({
      ytd_total: 320000.0,
      yearly_goal: 3200000,
      weekly: {
        week_of: "June 20",
        amount: 1234.23,
      },
    });
    expect(finances.ytd_percent).toBe("10.00%");
  });
});
