import prisma from "@/lib/prisma"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FolderOpen, Users, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import { NewListDiaglog } from "@/components/manual-comps/NewListDialog"

export default async function ListsPage() {
  const lists = await prisma.list.findMany({
    include: {
      _count: {
        select: { leads: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Lists</h1>
        </div>
        <NewListDiaglog />
      </div>

      {lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-slate-50/50">
          <FolderOpen className="size-12 text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900">No lists yet</h2>
          <p className="text-slate-500 mb-6 text-center max-w-sm">
            Start by creating a list, for example "Bakeries in Ghent".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 py-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <div key={list.id} className="group relative">
              <Link href={`/lists/${list.id}`} className="block">
                <Card className="h-full border-slate-200 transition-all group-hover:border-blue-500 group-hover:shadow-md cursor-pointer overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <FolderOpen size={22} />
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                        <Users size={14} />
                        {list._count.leads}
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-blue-600 transition-colors">
                      {list.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {list.description || "No additional information."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      <Calendar size={12} />
                      {new Date(list.createdAt).toLocaleDateString('nl-BE')}
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>

              {/* <form
                action={async () => {
                  await deleteList(list.id)
                }}
                className="absolute right-3 top-3 z-10"
              >
                <button
                  type="submit"
                  aria-label="Delete list"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </form> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}