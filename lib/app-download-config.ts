export type AppDownloadConfig = {
  iosUrl: string | null
  androidUrl: string | null
  updatedAt: string
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, "")
}

export async function fetchAppDownloadConfig(): Promise<AppDownloadConfig> {
  const res = await fetch(`${beBaseUrl()}/api/app-download-config`, { cache: "no-store" })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Failed to load app download config: ${res.status} ${text}`)
  }
  const raw = (await res.json()) as AppDownloadConfig
  const norm = (v: string | null) => {
    const s = typeof v === "string" ? v.trim() : null
    return s ? s : null
  }
  return {
    ...raw,
    iosUrl: norm(raw.iosUrl),
    androidUrl: norm(raw.androidUrl),
  }
}

export async function adminUpsertAppDownloadConfig(input: {
  token: string
  iosUrl: string
  androidUrl: string
}): Promise<AppDownloadConfig> {
  const res = await fetch(`${beBaseUrl()}/api/app-download-config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${input.token}`,
    },
    body: JSON.stringify({
      iosUrl: input.iosUrl,
      androidUrl: input.androidUrl,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Failed to update app download config: ${res.status} ${text}`)
  }

  return (await res.json()) as AppDownloadConfig
}

