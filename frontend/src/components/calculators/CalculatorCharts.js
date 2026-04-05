import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#1A4D2E', '#4E5A54', '#D4DAD6', '#F2F5F3'];

export const TaxPieChart = ({ data }) => {
  // data: [{ name: 'Base Tax', value: 1000 }, { name: 'Cess', value: 40 }]
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RegimeComparisonChart = ({ newTax, oldTax }) => {
  const data = [
    { name: 'New Regime', tax: newTax },
    { name: 'Old Regime', tax: oldTax },
  ];

  return (
    <div className="h-[240px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EDE9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4E5A54', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4E5A54', fontSize: 10 }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            cursor={{ fill: '#F2F5F3' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />
          <Bar 
            dataKey="tax" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#1A4D2E' : '#9baba2'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GSTBreakdownChart = ({ base, gst }) => {
  const data = [
    { name: 'Base Price', value: base },
    { name: 'Total GST', value: gst },
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            dataKey="value"
          >
            <Cell fill="#1A4D2E" />
            <Cell fill="#F2A900" /> {/* Amber for GST alert/significance */}
          </Pie>
          <Tooltip 
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
