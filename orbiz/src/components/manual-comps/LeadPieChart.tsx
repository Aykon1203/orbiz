"use client";
import { useEffect, useState } from "react";
import { Pie, PieChart, PieLabelRenderProps, Cell, Legend, ResponsiveContainer } from "recharts";
import { getLeadCounts } from "@/app/actions/leadActions";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

type LeadData = { name: string; value: number };

export default function LeadPieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [data, setData] = useState<LeadData[]>([]);

  useEffect(() => {
    getLeadCounts().then(setData);
  }, []);
  
  return (
    <div className="w-full h-75 min-h-75"> 
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
            verticalAlign="top" 
            align="left"
            iconType="circle"
            layout="vertical"
            wrapperStyle={{ paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}