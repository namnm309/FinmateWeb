import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Trang khung (UI-only). Sẽ bổ sung sections/profile/org/preferences theo Finmate.
        </p>
      </div>
      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Placeholder.
        </CardContent>
      </Card>
    </div>
  )
}

