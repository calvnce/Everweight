type Entry = { weight: number; logged_on: string }

export default function WeightChart({ entries }: { entries: Entry[] }) {
  const width = 400
  const height = 100
  const padding = 12

  const weights = entries.map((e) => e.weight)
  const min = Math.min(...weights)
  const max = Math.max(...weights)
  const range = max - min || 1

  const points = entries.map((entry, i) => {
    const x = padding + (i / (entries.length - 1)) * (width - padding * 2)
    const y = height - padding - ((entry.weight - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-label="Weight trend">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="#065f46"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {entries.map((entry, i) => {
        const [x, y] = points[i].split(',').map(Number)
        return <circle key={entry.logged_on + i} cx={x} cy={y} r="2.5" fill="#065f46" />
      })}
    </svg>
  )
}
