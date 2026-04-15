import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BillsPage() {
  return (
    <div className="w-full space-y-6 px-6 py-8">
      <div className="text-[22px] font-normal leading-8 text-[#878787]">
        {'H\u00f3a \u0111\u01a1n'}
      </div>
      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#191919]">
            {'S\u1eafp c\u00f3'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-[#666666]">
          {'\u0110ang ho\u00e0n thi\u1ec7n.'}
        </CardContent>
      </Card>
    </div>
  )
}

