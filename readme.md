# UserHub

UserHub dùng React/Vite cho giao diện và Express/Prisma/MySQL cho API.

## Kiến trúc

```text
frontend/ (React + Vite + React Router + TanStack Query)
    -> /api/v1/*
backend/ (Express + Prisma)
    -> MySQL
```

Trong development, Vite chạy ở cổng `5173` và proxy `/api`, `/health` sang Express ở cổng `3000`. Trong production, Express phục vụ bản build trong `frontend/dist`, vì vậy ứng dụng dùng chung một origin và không cần CORS.

## Chạy development

Tạo và cấu hình `backend/.env` cho kết nối MySQL, sau đó mở hai terminal.

Terminal backend:

```powershell
cd backend
npm install
npm run dev
```

Terminal frontend:

```powershell
cd frontend
npm install
npm run dev
```

Mở `http://localhost:5173`.

## Build production

```powershell
cd frontend
npm run build

cd ../backend
npm run build
npm start
```

Sau khi frontend được build, mở `http://localhost:3000`. Express sẽ phục vụ React SPA và trả `index.html` cho các client-side route.

Hoặc build toàn bộ bằng Docker:

```powershell
docker build -t userhub .
docker run --env-file backend/.env -p 3000:3000 userhub
```

## Routes giao diện

- `/`: trang giới thiệu
- `/auth/login`, `/auth/register`: đăng nhập và đăng ký
- `/dashboard`: tổng quan quản trị
- `/users`: CRUD user
- `/roles`: CRUD role
- `/products`: danh sách sản phẩm

## API chính

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET|POST /api/v1/users`
- `GET|PATCH|DELETE /api/v1/users/:id`
- `GET|POST /api/v1/roles`
- `PATCH|DELETE /api/v1/roles/:id`
- `GET /api/v1/products`

## Kiểm tra chất lượng

```powershell
cd frontend
npm run lint
npm run build

cd ../backend
npm run build
```

> Lưu ý: API login hiện chỉ xác minh username/password như phiên bản EJS trước đây. Chưa có session/JWT và route guard thực sự; cần bổ sung trước khi dùng dashboard cho dữ liệu nhạy cảm.
