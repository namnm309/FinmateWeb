import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{'C\u00e0i \u0111\u1eb7t'}</h1>
        <p className="text-sm text-muted-foreground">
          {'Trang khung (UI-only). S\u1ebd b\u1ed5 sung h\u1ed3 s\u01a1 / tu\u1ef3 ch\u1ecdn / tu\u1ed5 ch\u1ee9c theo Finmate.'}
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

