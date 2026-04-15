import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CardsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{'Th\u1ebb'}</h1>
        <p className="text-sm text-muted-foreground">
          Trang khung (UI-only). Sẽ bổ sung list thẻ + card details theo Finmate.
        </p>
      </div>
      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{'S\u1eafp c\u00f3'}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {'\u0110ang ho\u00e0n thi\u1ec7n.'}
        </CardContent>
      </Card>
    </div>
  )
}

