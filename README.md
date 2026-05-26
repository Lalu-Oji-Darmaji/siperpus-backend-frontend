# API Documentation

## 1. Login

### Request
- Method: POST
- URL: http://localhost:3000/api/auth/login
### Header 
- Content-Type: application/json

### Body
- Raw/json
{
  "email": "admin@siperpus.id",
  "password": "password"
}

### Response
Json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzaXBlcnB1cy5pZCIsInJvbGUiOiJwdXN0YWthd2FuIiwiaWF0IjoxNzc5NzYzMDAxLCJleHAiOjE3ODAzNjc4MDF9.1iHvV2uajdzBHvkqFqIWwSv9lQACOWYS9iWlKhGWif8",
        "user": {
            "id": 1,
            "nama": "Ahmad Pustakawan",
            "email": "admin@siperpus.id",
            "role": "pustakawan"
        }
    }
}

## 2. Data Buku

### Request
- Method: GET
- URL: http://localhost:3000/api/buku

### Response
- Json
{
    "success": true,
    "data": {
        "items": [
            {
                "id": 7,
                "judul": "The Pragmatic Programmer",
                "penulis": "David Thomas",
                "penerbit": "Addison Wesley",
                "tahun": 1999,
                "isbn": "9780201616224",
                "kategori": "Teknologi",
                "sinopsis": "Buku pemrograman modern",
                "stok": 2,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-23T12:36:15.000Z",
                "updated_at": "2026-05-23T12:36:15.000Z"
            },
            {
                "id": 1,
                "judul": "Clean Code",
                "penulis": "Robert C. Martin",
                "penerbit": "Prentice Hall",
                "tahun": 2008,
                "isbn": "9780132350884",
                "kategori": "Teknologi",
                "sinopsis": null,
                "stok": 3,
                "tersedia": 3,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 2,
                "judul": "Vue.js 3 for Beginners",
                "penulis": "Simone Cuomo",
                "penerbit": "Packt",
                "tahun": 2024,
                "isbn": "9781803239859",
                "kategori": "Teknologi",
                "sinopsis": null,
                "stok": 2,
                "tersedia": 1,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 3,
                "judul": "Learning Vue",
                "penulis": "Maya Shavin",
                "penerbit": "O'Reilly",
                "tahun": 2024,
                "isbn": "9781492098843",
                "kategori": "Teknologi",
                "sinopsis": null,
                "stok": 2,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 4,
                "judul": "Bumi",
                "penulis": "Tere Liye",
                "penerbit": "Gramedia",
                "tahun": 2014,
                "isbn": "9786020316000",
                "kategori": "Fiksi",
                "sinopsis": null,
                "stok": 4,
                "tersedia": 4,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 5,
                "judul": "Atomic Habits",
                "penulis": "James Clear",
                "penerbit": "Avery",
                "tahun": 2018,
                "isbn": "9780735211292",
                "kategori": "Bisnis",
                "sinopsis": null,
                "stok": 3,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 6,
                "judul": "Sapiens",
                "penulis": "Yuval Noah Harari",
                "penerbit": "Harper",
                "tahun": 2011,
                "isbn": "9780062316110",
                "kategori": "Sejarah",
                "sinopsis": null,
                "stok": 2,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 12,
            "total": 7,
            "totalPage": 1
        }
    }
}

## 3. Filter Buku

### Request
- Method: GET
- URL: http://localhost:3000/api/buku?search=Programmer&kategori=Teknologi

### Response
- Json
{
    "success": true,
    "data": {
        "items": [
            {
                "id": 7,
                "judul": "The Pragmatic Programmer",
                "penulis": "David Thomas",
                "penerbit": "Addison Wesley",
                "tahun": 1999,
                "isbn": "9780201616224",
                "kategori": "Teknologi",
                "sinopsis": "Buku pemrograman modern",
                "stok": 2,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-23T12:36:15.000Z",
                "updated_at": "2026-05-23T12:36:15.000Z"
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 12,
            "total": 1,
            "totalPage": 1
        }
    }
}

## 4. Detail Buku

### Request
- Method: GET
- URL:  http://localhost:3000/api/buku?search=vue&kategori=Teknologi

### Response
- Json
{
    "success": true,
    "data": {
        "items": [
            {
                "id": 2,
                "judul": "Vue.js 3 for Beginners",
                "penulis": "Simone Cuomo",
                "penerbit": "Packt",
                "tahun": 2024,
                "isbn": "9781803239859",
                "kategori": "Teknologi",
                "sinopsis": null,
                "stok": 2,
                "tersedia": 1,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            },
            {
                "id": 3,
                "judul": "Learning Vue",
                "penulis": "Maya Shavin",
                "penerbit": "O'Reilly",
                "tahun": 2024,
                "isbn": "9781492098843",
                "kategori": "Teknologi",
                "sinopsis": null,
                "stok": 2,
                "tersedia": 2,
                "cover_url": null,
                "created_at": "2026-05-19T07:49:29.000Z",
                "updated_at": "2026-05-19T07:49:29.000Z"
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 12,
            "total": 2,
            "totalPage": 1
        }
    }
}

## 5. Tambah Buku

### Request
- Method: POST
- URL: http://localhost:3000/api/buku

### Authorization
- Bearer Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzaXBlcnB1cy5pZCIsInJvbGUiOiJwdXN0YWthd2FuIiwiaWF0IjoxNzc5NzYzMDAxLCJleHAiOjE3ODAzNjc4MDF9.1iHvV2uajdzBHvkqFqIWwSv9lQACOWYS9iWlKhGWif8 (token dari response Login)

### Headers
- Content-Type: application/json

### Body
- Raw/Json
{
  "judul": "The Pragmatic Programmer",
  "penulis": "David Thomas",
  "penerbit": "Addison Wesley",
  "tahun": 1999,
  "isbn": "9780201616224",
  "kategori": "Teknologi",
  "sinopsis": "Buku pemrograman modern",
  "stok": 2
}

### Response
Json
{
    "success": true,
    "message": "Buku berhasil ditambahkan",
    "data": {
        "id": 9,
        "judul": "The Pragmatic Programmer",
        "penulis": "David Thomas",
        "penerbit": "Addison Wesley",
        "tahun": 1999,
        "isbn": "9780201616224",
        "kategori": "Teknologi",
        "sinopsis": "Buku pemrograman modern",
        "stok": 2,
        "tersedia": 2,
        "cover_url": null,
        "created_at": "2026-05-26T03:45:10.000Z",
        "updated_at": "2026-05-26T03:45:10.000Z"
    }
}

## 6. Test Validasi

### Request
- Method: POST
- URL: http://localhost:3000/api/buku

### Authorization
- Bearer Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzaXBlcnB1cy5pZCIsInJvbGUiOiJwdXN0YWthd2FuIiwiaWF0IjoxNzc5NzYzMDAxLCJleHAiOjE3ODAzNjc4MDF9.1iHvV2uajdzBHvkqFqIWwSv9lQACOWYS9iWlKhGWif8 (token dari response Login)

### Body
- Raw/Json
{}

### Response
- Json
{
    "success": false,
    "message": "Data tidak valid",
    "errors": [
        {
            "field": "judul",
            "message": "Judul harus 3-255 karakter"
        },
        {
            "field": "penulis",
            "message": "Penulis tidak boleh kosong"
        }
    ]
}

