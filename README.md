# FinmateWeb

## Cấu hình connect BE (deploy)

FE dùng biến môi trường `NEXT_PUBLIC_BE_BASE_URL` để gọi backend.

- **Production**: set trên platform host (ví dụ Vercel/CI) rồi redeploy.
- **Local**: copy `.env.example` → `.env.local` và điền giá trị.

Ví dụ (BE Azure App Service):

```bash
NEXT_PUBLIC_BE_BASE_URL=https://finmatecontroller20260116165929-dvckfkfvgqendpbk.eastasia-01.azurewebsites.net
```

## Dev

```bash
npm install
npm run dev
```

