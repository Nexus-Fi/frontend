import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | React.ReactNode
  subValue?: string
  isLoading?: boolean
}

export function StatsCard({
  title,
  value,
  subValue,
  isLoading = false
}: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-blue-600">
              {typeof value === 'string' ? value : value}
            </div>
            {subValue && (
              <p className="text-sm text-gray-600">{subValue}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

