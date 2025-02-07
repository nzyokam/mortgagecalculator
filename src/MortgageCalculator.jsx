import { useState } from "react";

export default function MortgageCalculator() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState("");
  const [type, setType] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const formatNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Format number with commas
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    setAmount(formatNumber(rawValue));
  };

  const calculateRepayments = () => {
    if (!amount || !term || !interest) return;

    const principal = parseFloat(amount.replace(/,/g, ""));
    const years = parseFloat(term);
    const rate = parseFloat(interest) / 100 / 12;
    const n = years * 12;

    if (type === "repayment") {
      const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -n));
      setMonthlyPayment(monthly.toFixed(2));
      setTotalRepayment((monthly * n).toFixed(2));
    } else {
      const monthly = (principal * (parseFloat(interest) / 100)) / 12;
      setMonthlyPayment(monthly.toFixed(2));
      setTotalRepayment((monthly * n).toFixed(2));
    }
  };

  const clearAll = () => {
    setAmount("");
    setTerm("");
    setInterest("");
    setType("");
    setMonthlyPayment(null);
    setTotalRepayment(null);
  };
  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#E3F4FC]">
      <div className="flex w-[60vw] h-[50vh] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="w-[50%] p-6 bg-white">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl bold mb-10 text-[#192C38]">
              Mortgage Calculator
            </h2>
            <button
              onClick={clearAll}
              className="text-gray-500 text-sm mb-4 underline"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-4">
            <label className="text-[#707D84]">Mortgage Amount</label>
            <div className="relative w-full mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center px-4 bg-[#E1F2FB] border border-gray-300 rounded-l-md text-gray-500">
                £
              </span>
              <input
                type="text"
                className="pl-14 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
                value={amount}
                onChange={handleAmountChange}
                inputMode="numeric"
              />
            </div>

            <div className="flex space-x-4 mt-8">
              {/* Mortgage Term Input */}
              <div className="flex flex-col w-1/2">
                <label className="text-[#707D84]">Mortgage Term</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center px-3 bg-[#E1F2FB] border-l border-gray-300 rounded-r-md text-gray-500">
                    years
                  </span>
                </div>
              </div>

              {/* Interest Rate Input */}
              <div className="flex flex-col w-1/2">
                <label className="text-[#707D84]">Interest Rate</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center px-3 bg-[#E1F2FB] border-l border-gray-300 rounded-r-md text-gray-500">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="mt-4 mb-2 text-[#707D84]">Mortgage Type</div>

              <label
                className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${
                  type === "repayment"
                    ? "bg-[#FAFAE0] border-[#D7DA33]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="mortgageType"
                  value="repayment"
                  checked={type === "repayment"}
                  onChange={() => setType("repayment")}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    type === "repayment"
                      ? "border-[#D7DA33]"
                      : "border-gray-400"
                  }`}
                >
                  {type === "repayment" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D7DA33]" />
                  )}
                </div>
                <span
                  className={`bold ${
                    type === "repayment" ? "text-[#D7DA33]" : "text-black"
                  }`}
                >
                  Repayment
                </span>
              </label>

              <label
                className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${
                  type === "interest-only"
                    ? "bg-[#FAFAE0] border-[#D7DA33]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="mortgageType"
                  value="interest-only"
                  checked={type === "interest-only"}
                  onChange={() => setType("interest-only")}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    type === "interest-only"
                      ? "border-[#D7DA33]"
                      : "border-gray-400"
                  }`}
                >
                  {type === "interest-only" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D7DA33]" />
                  )}
                </div>
                <span
                  className={`bold ${
                    type === "interest-only" ? "text-[#D7DA33]" : "text-black"
                  }`}
                >
                  Interest Only
                </span>
              </label>
            </div>

            <button
              onClick={calculateRepayments}
              className="w-[50%] bg-[#D9DB30] text-black p-3 rounded-full mt-4 flex items-center justify-center"
            >
              <span className="mr-2">
                <img src="/assets/images/icon-calculator.svg" alt="calculator" className="w-5" />
              </span>{" "}
              Calculate Repayments
            </button>
          </div>
        </div>
        <div className="w-1/2 p-6 bg-[#123040] text-white flex flex-col justify-center text-center">
          {monthlyPayment === null ? (
            // 🔹 Default state (before calculating repayments)
            <>
              <div className="flex justify-center items-center">
                <img src="/assets/images/illustration-empty.svg" alt="results image" width={150} />
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Results shown here
              </h2>
              <p className="text-sm text-gray-300">
                Complete the form and click{" "}
                <span className=" text-white">{"calculate repayments"}</span> to
                see what your monthly repayments would be.
              </p>
            </>
          ) : (
            // 🔹 Updated state (after clicking "Calculate Repayments")
            <div className="p-6 text-left w-full">
              <h2 className="text-2xl mb-2">Your results</h2>
              <p className=" text-[#89A3B0] mb-4">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click{" "}
                {'"calculate repayments"'} again.
              </p>

              <div className="bg-[#0E2838] p-6 rounded-xl shadow-lg border-t-4 border-t-[#D5DC43] w-full">
                <p className="text-sm text-[#89A3B0] mb-4">
                  Your monthly repayments
                </p>
                <p className="text-4xl font-bold text-[#D9DB30] mt-1 tracking-widest">
                  £{formatCurrency(monthlyPayment)}
                </p>
                <hr className="border-gray-600 mt-8 mb-8" />
                <p className="text-sm text-[#89A3B0] mb-4">
                  Total you&apos;ll repay over the term
                </p>
                <p className="text-xl ">£{formatCurrency(totalRepayment)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
