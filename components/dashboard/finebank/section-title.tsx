import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export function SectionTitle({
  title,
  href,
  className,
}: {
  title: string
  href?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="text-[22px] font-normal leading-8 text-[#878787]">
        {title}
      </div>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-2 text-xs font-medium text-[#878787] hover:underline"
        >
          View All <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </div>
  )
}

