'use client'

import { useTransition } from 'react'
import { deleteEntry } from '@/app/dashboard/actions'

export default function EntryRow({
  id,
  weight,
  unit,
  loggedOn,
  note,
}: {
  id: string
  weight: number
  unit: string
  loggedOn: string
  note: string | null
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <li className="flex items-center gap-3 rounded-xl border border-emerald-900/10 bg-white px-4 py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-emerald-950">
          {weight} {unit}
          <span className="ml-2 text-xs font-normal text-emerald-800/50">{loggedOn}</span>
        </p>
        {note && <p className="text-xs text-emerald-800/60">{note}</p>}
      </div>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => deleteEntry(id))}
        className="text-xs text-emerald-800/40 hover:text-red-500"
      >
        Delete
      </button>
    </li>
  )
}
