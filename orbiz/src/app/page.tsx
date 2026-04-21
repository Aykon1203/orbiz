import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "../components/ui/card";
import prisma from "@/lib/prisma";
import LeadPieChart from "@/components/manual-comps/LeadPieChart";


function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Dashboard query timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    promise
      .then((result) => {
        clearTimeout(timer)
        resolve(result)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

async function getDashboardData() {
  try {
    const [totalOpenLeads, totalContactedLeads, totalClientLeads, recentLeads] = await withTimeout(
      Promise.all([
        prisma.lead.count({ where: { status: "OPEN" } }),
        prisma.lead.count({ where: { status: "CONTACTED" } }),
        prisma.lead.count({ where: { status: "CUSTOMER" } }),
        prisma.lead.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            list: true,
          },
        }),
      ]),
      8000,
    );

    return { totalOpenLeads, totalContactedLeads, totalClientLeads, recentLeads };
  } catch (error) {
    console.error("Dashboard data load failed:", error);
    return {
      totalOpenLeads: 0,
      totalContactedLeads: 0,
      totalClientLeads: 0,
      recentLeads: [],
    };
  }
}

export default async function Home() {
  const { totalOpenLeads, totalContactedLeads, totalClientLeads, recentLeads } = await getDashboardData();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <Card>
          <CardHeader>
            <CardTitle>Open Leads</CardTitle>
            <CardDescription>Number of leads you have not contacted yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">{totalOpenLeads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contacted Leads</CardTitle>
            <CardDescription>Number of leads you have contacted.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">{totalContactedLeads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Number of leads that became customers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">{totalClientLeads}</p>
          </CardContent>
        </Card>
      </div>
      <div className="py-6 grid grid-cols-5 gap-4 items-center">
        {/* pie chart */}
        <Card className="col-span-2 h-100">
          <CardHeader>
            <CardTitle>Leads Chart</CardTitle>
            <CardDescription>A visual overview of your leads.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full flex justify-center items-center">
            <LeadPieChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 h-100">
          <CardHeader>
            <CardTitle>Recently Added Leads</CardTitle>
            <CardDescription>The most recent leads you added to a list.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500 italic">{lead.list?.name ?? "No list"}</p>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                    {lead.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="gap-4 items-center">
        <Card>
          <CardHeader>
            <CardTitle>Current Month Growth</CardTitle>
            <CardDescription>Your progress growth for the current month.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO line chart for growth */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
