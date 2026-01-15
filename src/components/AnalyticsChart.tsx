import { pendingBillsData, totalStats } from "@/data/pendingBills";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const AnalyticsChart = () => {
  const chartData = pendingBillsData.slice(0, 6).map((item) => ({
    range: item.range,
    bills: item.numberOfBills,
    amount: item.amountBillion,
  }));

  const pieData = [
    { name: 'Eligible (≤2M)', value: totalStats.eligibleAmountBillion, color: 'hsl(142, 76%, 36%)' },
    { name: 'Above 2M', value: totalStats.totalAmountBillion - totalStats.eligibleAmountBillion, color: 'hsl(217, 33%, 30%)' },
  ];

  const COLORS = ['hsl(142, 76%, 36%)', 'hsl(217, 33%, 30%)'];

  return (
    <section id="analytics" className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Bills Distribution by Range
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Number of bills and amount (KES Billion) per range
          </p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                <XAxis 
                  dataKey="range" 
                  stroke="hsl(215, 20%, 55%)"
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(215, 20%, 55%)"
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 11%)',
                    border: '1px solid hsl(217, 33%, 20%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 40%, 96%)',
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'bills' ? value.toLocaleString() : `KES ${value}B`,
                    name === 'bills' ? 'No. of Bills' : 'Amount'
                  ]}
                />
                <Bar dataKey="bills" fill="hsl(217, 91%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Eligible vs Total Value
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Bills ≤KES 2M eligible for fast-track settlement
          </p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: KES ${value}B`}
                  labelLine={{ stroke: 'hsl(215, 20%, 55%)' }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 11%)',
                    border: '1px solid hsl(217, 33%, 20%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 40%, 96%)',
                  }}
                  formatter={(value: number) => [`KES ${value}B`, 'Amount']}
                />
                <Legend 
                  wrapperStyle={{ color: 'hsl(215, 20%, 55%)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg">
            <p className="text-sm text-success font-medium">
              ✓ {totalStats.eligibleBills.toLocaleString()} bills (KES {totalStats.eligibleAmountBillion}B) eligible for Phase 1 settlement
            </p>
          </div>
        </div>
      </div>

      {/* Full Data Table */}
      <div className="glass-card p-6 mt-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-4">
          Complete Range Breakdown
        </h3>
        
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Range (KES '000)</th>
                <th className="text-right">No. of Bills</th>
                <th className="text-right">Amount (KES Billion)</th>
                <th className="text-right">Cumulative Bills</th>
                <th className="text-right">Cumulative Value</th>
                <th className="text-right">% by Number</th>
                <th className="text-right">% by Value</th>
              </tr>
            </thead>
            <tbody>
              {pendingBillsData.map((row, index) => (
                <tr 
                  key={row.range}
                  className={index < 3 ? 'bg-success/5' : ''}
                >
                  <td className="font-medium">
                    {row.range}
                    {index < 3 && (
                      <span className="ml-2 text-xs text-success">★ Eligible</span>
                    )}
                  </td>
                  <td className="text-right font-mono">{row.numberOfBills.toLocaleString()}</td>
                  <td className="text-right font-mono text-accent">{row.amountBillion.toFixed(2)}</td>
                  <td className="text-right font-mono text-muted-foreground">{row.cumulativeByNumber.toLocaleString()}</td>
                  <td className="text-right font-mono text-muted-foreground">{row.cumulativeByValue.toFixed(2)}</td>
                  <td className="text-right font-mono">{row.percentByNumber}%</td>
                  <td className="text-right font-mono">{row.percentByValue}%</td>
                </tr>
              ))}
              <tr className="bg-muted/30 font-bold">
                <td>GRAND TOTAL</td>
                <td className="text-right font-mono">{totalStats.totalBills.toLocaleString()}</td>
                <td className="text-right font-mono text-accent">{totalStats.totalAmountBillion.toFixed(1)}</td>
                <td colSpan={4}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsChart;
