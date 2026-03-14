import Image from "next/image"

export function DashboardPreview() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[400px] flex justify-center">
      <div className="bg-primary-light/50 rounded-[3rem] p-2 shadow-2xl">
        <Image
          src="/images/finmate-preview.png"
          alt="FinMate - Ứng dụng quản lý tài chính"
          width={400}
          height={800}
          className="w-full h-full object-contain rounded-[2.5rem] shadow-lg"
        />
      </div>
    </div>
  )
}
