import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  subValue?: string
}

export function StatsCard({ title, value, subValue }: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        {subValue && (
          <p className="text-sm text-gray-600">{subValue}</p>
        )}
      </CardContent>
    </Card>
  )
}

