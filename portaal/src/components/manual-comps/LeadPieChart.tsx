"use client"

import { Pie, PieChart, PieLabelRenderProps, Cell, Legend, ResponsiveContainer } from 'recharts';
// Importeer Cell voor de kleurenkoppeling

 const data = [
    // dit is de echte code maar gebruik nu vaste waarden voor development
    // { name: 'Open', value: prisma?.lead.count({where: {status:'NEW'}}) },
    // { name: 'Gecontacteerd', value: prisma?.lead.count({where: {status:'CONTACTED'}}) },
    // { name: 'Client', value: prisma?.lead.count({where: {status:'CLIENT'}}) },
    { name: 'Open', value: 31 },
    { name: 'Gecontacteerd', value: 15 },
    { name: 'Client', value: 5 },
]; 

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Match je data lengte

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const ncy = Number(cy);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function LeadPieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    /* ResponsiveContainer is beter voor dashboards dan vaste width/height op de PieChart zelf */
    <div className="w-full h-75"> 
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={isAnimationActive}
          >
            {/* dit zorgt voor de kleur van de items in de legende */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            layout="horizontal"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}