"use client"

import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-center">
          <Image 
            src="/finmate-logo.png" 
            alt="Logo FinMate" 
            width={40} 
            height={40}
            className="w-10 h-10"
          />
          <div className="text-foreground text-xl font-semibold">FinMate</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Quản lý tài chính thông minh cùng AI</p>
        <div className="flex justify-start items-start gap-3">
          <a href="#" aria-label="Twitter" className="w-4 h-4 flex items-center justify-center">
            <Twitter className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="GitHub" className="w-4 h-4 flex items-center justify-center">
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-4 h-4 flex items-center justify-center">
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Sản phẩm</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Tính năng
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Gói cước
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Đồng bộ dữ liệu
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Báo cáo chi tiêu
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Mục tiêu tiết kiệm
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Công ty</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Về FinMate
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Đội ngũ
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Tuyển dụng
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Đối tác
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Liên hệ
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Tài nguyên</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Hướng dẫn sử dụng
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Câu hỏi thường gặp
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
