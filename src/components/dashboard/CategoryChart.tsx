import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { categoryBreakdown } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '@/contexts/FilterContext';

const colors = [
  'hsl(222, 47%, 20%)',
  'hsl(142, 76%, 36%)',
  'hsl(43, 96%, 56%)',
  'hsl(173, 58%, 39%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 72%, 51%)',
  'hsl(215, 16%, 47%)',
];

const CategoryChart = () => {
  const navigate = useNavigate();
  const { toggleArrayFilter } = useFilters();

  const handleClick = (category: string) => {
    toggleArrayFilter('categories', category);
    navigate('/bills');
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Bills by Category
          </h3>
          <p className="text-sm text-muted-foreground">Click bars to filter</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={categoryBreakdown} 
            layout="vertical"
            margin={{ left: 100, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis 
              type="number"
              stroke="hsl(215, 16%, 47%)"
              tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
              tickFormatter={(value) => `${value}B`}
            />
            <YAxis 
              type="category"
              dataKey="category"
              stroke="hsl(215, 16%, 47%)"
              tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 13%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`KES ${value}B`, 'Amount']}
            />
            <Bar 
              dataKey="amount" 
              radius={[0, 4, 4, 0]}
              className="cursor-pointer"
              onClick={(data) => handleClick(data.category)}
            >
              {categoryBreakdown.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
