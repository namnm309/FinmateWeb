import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-[#F4F5F7] px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="text-[40px] leading-8 tracking-[3.2px] font-extrabold text-[#299D91]">
            <span className="font-extrabold">FIN</span>
            <span className="font-medium">mate.</span>
          </div>
        </div>

        <SignIn
          routing="path"
          appearance={{
            variables: {
              colorPrimary: '#299D91',
              colorBackground: '#F4F5F7',
              colorText: '#191D23',
              colorTextSecondary: '#999DA3',
              colorInputText: '#4B5768',
              colorInputBackground: '#FFFFFF',
              borderRadius: '8px',
            },
            elements: {
              rootBox: 'w-full',
              cardBox: 'shadow-none bg-transparent p-0 w-full',
              card: 'shadow-none bg-transparent p-0 w-full',
              header: 'hidden',
              footer: 'hidden',
              socialButtonsBlockButton:
                'bg-[#E4E7EB] hover:bg-[#E4E7EB]/90 text-[#4B5768] h-12 rounded-[4px] font-normal',
              socialButtonsBlockButtonText: 'text-[#4B5768] text-[16px] font-normal',
              formButtonPrimary:
                'bg-[#299D91] hover:bg-[#299D91]/90 h-12 rounded-[4px] text-white font-semibold text-[16px]',
              dividerLine: 'bg-[#D0D5DD]',
              dividerText: 'text-[#999DA3] text-[14px]',
              formFieldLabel: 'text-[#191D23] text-[16px] font-medium',
              formFieldInput:
                'h-12 rounded-[8px] border border-[#D0D5DD] text-[#4B5768] placeholder:text-[#999DA3] focus:border-[#4B5768] focus:ring-0',
              formFieldAction: 'text-[#299D91] text-[12px] font-medium',
              formFieldSuccessText: 'text-[#299D91]',
              formFieldErrorText: 'text-[#E73D1C]',
              identityPreviewText: 'text-[#4B5768]',
              formResendCodeLink: 'text-[#299D91]',
              form: 'gap-6',
              formFieldRow: 'gap-2',
              formField: 'gap-2',
            },
          }}
        />
      </div>
    </div>
  )
}

