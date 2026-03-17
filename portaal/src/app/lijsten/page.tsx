import { Button } from "@/components/ui/button";



export default function LijstPage(){


  return(
    <div className="flex flex-col">
      {/* dit zijn de elementen bovenaan de pagina */}
      <div className="flex items-center justify-between w-full">
        <span className="text-3xl font-mono">Mijn lijsten</span>
        <Button className="bg-blue-900 hover:bg-blue-800">Nieuwe lijst toevoegen</Button>
      </div>
      {/* lijsten */}
      <div>
        
      </div>
    </div>
  )
}