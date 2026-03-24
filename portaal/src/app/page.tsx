import {Card, CardTitle, CardDescription, CardContent, CardHeader} from "../components/ui/card";
import { Inter } from "next/font/google";
import prisma from "@/lib/prisma";
import LeadPieChart from "@/components/manual-comps/LeadPieChart";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const totalLeads = await prisma.lead.count();

const totalOpenLeads = await prisma.lead.count({where:{status:'NEW'}})

const totalContactedLeads= await prisma.lead.count({where:{status:'CONTACTED'}})

const totalClientLeads= await prisma.lead.count({where:{status:'CLIENT'}})


export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-3 gap-4 items-center">
        <Card >
          <CardHeader>
            <CardTitle>Aantal open leads</CardTitle>
            <CardDescription>Het aantal leads dat u nog niet hebt gecontacteerd.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">
              {totalOpenLeads}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aantal gecontacteerde leads</CardTitle>
            <CardDescription>Het aantal leads dat u heeft gecontacteerd.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">
              {totalContactedLeads}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aantal clienten</CardTitle>
            <CardDescription>Het aantal leads dat klant zijn geworden.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-inter">
              {totalClientLeads}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="py-6 grid grid-cols-5 gap-4 items-center">
        {/* pie chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Diagram leads</CardTitle>
            <CardDescription>Een visueel overzicht van uw leads.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <LeadPieChart/>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
