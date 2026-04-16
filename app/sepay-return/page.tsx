import { redirect } from "next/navigation"

export default async function SepayReturnPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const result = typeof params?.result === "string" ? params.result : null
  const orderId = typeof params?.orderId === "string" ? params.orderId : null

  const payment =
    result === "success"
      ? "success"
      : result === "cancel"
        ? "cancel"
        : "error"

  const nextParams = new URLSearchParams({ payment })
  if (orderId) nextParams.set("orderId", orderId)

  redirect(`/?${nextParams.toString()}`)
}

