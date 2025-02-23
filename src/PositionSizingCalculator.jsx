import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";

export default function PositionSizingCalculator() {
  const [initialCapital, setInitialCapital] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [allocation, setAllocation] = useState("");
  const [riskFactor, setRiskFactor] = useState("");
  
  const riskPercentage =
    (1 - ((stopLoss / (1 + brokerage / 100)) / (entryPrice * (1 + brokerage / 100)))) * 100;
  const numShares = Math.ceil(
    (initialCapital * riskFactor * allocation / 100) / (entryPrice + entryPrice * brokerage / 100)
  );
  const investmentPerTrade = numShares * entryPrice;
  const riskOnPortfolio = Math.ceil((numShares * (entryPrice - stopLoss) / initialCapital) * 100 * 100) / 100;

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400">
      <Card className="w-full max-w-lg p-8 shadow-xl bg-white rounded-3xl border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📌 Position Sizing Calculator
        </h2>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Initial Capital (₹)</label>
            <Input
              type="number"
              placeholder="Enter Initial Capital"
              value={initialCapital}
              onChange={(e) => setInitialCapital(parseFloat(e.target.value) || "")}
              className="border-orange-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Entry Price (₹)</label>
            <Input
              type="number"
              placeholder="Enter Entry Price"
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || "")}
              className="border-orange-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Stop Loss (₹)</label>
            <Input
              type="number"
              placeholder="Enter Stop Loss"
              value={stopLoss}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || "")}
              className="border-orange-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Brokerage (%)</label>
            <Input
              type="number"
              step="0.001"
              placeholder="Enter Brokerage %"
              value={brokerage}
              onChange={(e) => setBrokerage(parseFloat(e.target.value) || "")}
              className="border-orange-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Allocation %</label>
            <div className="flex items-center space-x-2">
              <Select value={String(allocation)} onValueChange={(value) => setAllocation(parseFloat(value) || "")}>
                <SelectTrigger className="border-orange-400 shadow-sm w-32">{allocation || "Select %"}</SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((percent) => (
                    <SelectItem key={percent} value={String(percent)}>{percent}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Custom %"
                value={allocation}
                onChange={(e) => setAllocation(parseFloat(e.target.value) || "")}
                className="border-orange-400 w-24"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Risk Factor: {riskFactor || "Select"}</label>
            <div className="flex items-center space-x-2">
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={[riskFactor]}
                onValueChange={(value) => setRiskFactor(value[0])}
                className="text-orange-600"
              />
              <Input
                type="number"
                step="0.05"
                min="0"
                max="1"
                placeholder="Custom Risk"
                value={riskFactor}
                onChange={(e) => setRiskFactor(parseFloat(e.target.value) || "")}
                className="border-orange-400 w-24"
              />
            </div>
          </div>
          <div className="bg-orange-100 p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Calculated Values</h3>
            <p className="text-gray-700">Risk Percentage: <span className="font-semibold">{riskPercentage.toFixed(2)}%</span></p>
            <p className="text-gray-700">No. of Shares: <span className="font-semibold">{numShares}</span></p>
            <p className="text-gray-700">Investment per Trade: <span className="font-semibold">₹{investmentPerTrade.toFixed(2)}</span></p>
            <p className="text-gray-700">Risk on Portfolio: <span className="font-semibold">{riskOnPortfolio.toFixed(2)}%</span></p>
          </div>
        </div>
      </Card>
    </div>
  );
}
