KAPHEE - Hệ thống Quản lý Quán Cà Phê
Tổng quan Dự án
KAPHEE là một hệ thống quản lý quán cà phê toàn diện, xử lý việc đặt bàn của khách hàng, quản lý thực đơn và các chức năng quản trị. Hệ thống được xây dựng với một bộ công nghệ web hiện đại, có các thành phần frontend và backend riêng biệt.

Cấu trúc Dự án
Các Tệp trong Thư mục Gốc
Các Tệp HTML
index.html (7.3KB)
  - Trang đích chính của ứng dụng
  - Đóng vai trò là điểm truy cập cho người dùng
  - Chứa điều hướng đến tất cả các tính năng chính

login.html (4.5KB)
  - Trang xác thực người dùng
  - Xử lý chức năng đăng nhập của khách hàng
  - Chuyển hướng đến bảng điều khiển (dashboard) sau khi đăng nhập thành công

register.html (5.4KB)
  - Trang đăng ký người dùng mới
  - Thu thập thông tin khách hàng
  - Tạo tài khoản khách hàng mới

menu.html (3.9KB)
  - Hiển thị các món trong thực đơn quán cà phê
  - Hiển thị giá, mô tả và hình ảnh
  - Cho phép khách hàng duyệt các món có sẵn

booking.html (7.5KB)
  - Hệ thống đặt bàn
  - Cho phép khách hàng đặt bàn
  - Xử lý việc chọn ngày và giờ

admin.html (16KB)
  - Giao diện quản trị viên chính
  - Cung cấp quyền truy cập vào tất cả các chức năng quản trị
  - Chỉ dành cho người dùng quản trị viên

dashboard.html (7.3KB)
  - Bảng điều khiển của khách hàng
  - Hiển thị lịch sử đặt chỗ
  - Hiển thị điểm khách hàng thân thiết và thông tin tài khoản

admin-dashboard.html (16KB)
  - Bảng điều khiển quản trị viên
  - Hiển thị thống kê hệ thống
  - Quản lý đặt chỗ, thực đơn và người dùng

admin-login.html (2.9KB)
  - Trang xác thực quản trị viên
  - Đăng nhập bảo mật cho người dùng quản trị
  - Tách biệt với đăng nhập của khách hàng

Các Tệp Dữ liệu (JSON)
admins.json
  - Lưu trữ dữ liệu người dùng quản trị
  - Chứa thông tin xác thực
  - Quản lý vai trò và quyền của quản trị viên

customers.json
  - Lưu trữ thông tin khách hàng
  - Chứa thông tin cá nhân và sở thích
  - Theo dõi điểm khách hàng thân thiết và lịch sử truy cập

bookings.json
  - Quản lý đặt bàn
  - Lưu trữ chi tiết và trạng thái đặt chỗ
  - Liên kết khách hàng với các đặt chỗ của họ

menu.json
  - Chứa thông tin món ăn trong thực đơn
  - Bao gồm giá, mô tả và thành phần
  - Quản lý tình trạng có sẵn của món ăn

Cấu trúc Backend (/backend)
Các Tệp Chính
index.js (1.9KB)   - Tệp máy chủ chính   - Thiết lập máy chủ Express   - Cấu hình middleware và các tuyến (routes)
Các Thư mục
/routes
  - Chứa các trình xử lý tuyến API
  - Quản lý các điểm cuối HTTP (endpoints)
  - Xử lý quá trình yêu cầu

/models
  - Định nghĩa các mô hình dữ liệu
  - Chứa các lược đồ cơ sở dữ liệu (database schemas)
  - Quản lý xác thực dữ liệu

/middleware
  - Các hàm middleware tùy chỉnh
  - Kiểm tra xác thực
  - Xử lý yêu cầu

/config
  - Các tệp cấu hình
  - Biến môi trường
  - Cài đặt cơ sở dữ liệu

/utils
  - Các hàm tiện ích
  - Các phương thức hỗ trợ
  - Các thao tác phổ biến

Cấu trúc Frontend (/frontend)
Các Tệp
admin-dashboard.html (11KB)
  - Giao diện bảng điều khiển quản trị
  - Thống kê thời gian thực
  - Công cụ quản lý

menu.html (1.2KB)
  - Giao diện hiển thị thực đơn
  - Phân loại món
  - Chức năng tìm kiếm và lọc

Các Tệp JavaScript (/js)
main.js (8.5KB)
  - Logic ứng dụng cốt lõi
  - Xử lý sự kiện
  - Tương tác giao diện người dùng

auth.js (5.5KB)
  - Xử lý xác thực
  - Chức năng Đăng nhập/Đăng ký
  - Quản lý phiên

menu.js (5.3KB)
  - Logic hiển thị thực đơn
  - Lọc món ăn
  - Chức năng tìm kiếm

booking.js (1.0B)
  - Logic hệ thống đặt chỗ
  - Xử lý ngày/giờ
  - Quản lý đặt chỗ

dashboard.js (7.3KB)
  - Chức năng bảng điều khiển người dùng
  - Hiển thị dữ liệu
  - Tùy chọn người dùng

admin.js (15KB)
  - Chức năng bảng điều khiển quản trị
  - Quản lý người dùng
  - Cấu hình hệ thống

admin-dashboard.js (16KB)
  - Logic bảng điều khiển quản trị
  - Thống kê và báo cáo
  - Giám sát hệ thống

login.js (2.2KB)
  - Xử lý biểu mẫu đăng nhập
  - Yêu cầu xác thực
  - Xử lý lỗi

Các Thư mục Bổ sung
/css
  - Chứa các stylesheet
  - Quản lý kiểu dáng ứng dụng
  - Các tệp thiết kế đáp ứng (responsive design)

/assets
  - Tài nguyên tĩnh
  - Hình ảnh và biểu tượng
  - Các tệp đa phương tiện

/scripts
  - Các tệp JavaScript bổ sung
  - Các tập lệnh tiện ích
  - Tích hợp bên thứ ba

/data
  - Lưu trữ dữ liệu
  - Các tệp sao lưu
  - Dữ liệu tạm thời

Ngăn xếp Công nghệ (Technical Stack)
Frontend
HTML5
CSS3
JavaScript (ES6+)
Thiết kế đáp ứng (Responsive Design)
Backend
Node.js
Express.js
Lưu trữ Dữ liệu JSON
Công cụ Phát triển
Cấu hình VS Code
Hệ thống Kiểm soát Phiên bản Git
Trình quản lý Gói Node (npm)
Tính năng
Tính năng Khách hàng
Đăng ký và đăng nhập người dùng
Duyệt thực đơn
Đặt bàn
Theo dõi điểm khách hàng thân thiết
Bảng điều khiển cá nhân
Tính năng Quản trị viên
Quản lý người dùng
Quản lý thực đơn
Giám sát đặt chỗ
Thống kê hệ thống
Kiểm soát quản trị
Thiết lập và Cài đặt
Sao chép kho lưu trữ (Clone the repository)
Cài đặt các phụ thuộc:    bash    npm install
Khởi động máy chủ backend:    bash    cd backend    npm start
Truy cập ứng dụng qua trình duyệt
Bảo mật
Xác thực quản trị viên
Quản lý phiên người dùng
Lưu trữ dữ liệu an toàn
Xác thực đầu vào
Bảo trì
Sao lưu dữ liệu định kỳ
Cập nhật hệ thống
Giám sát hiệu suất
Các bản vá bảo mật
Các Cải tiến Tương lai
Hệ thống đặt hàng trực tuyến
Tích hợp thanh toán
Ứng dụng di động
Phân tích nâng cao
Hệ thống phản hồi khách hàng
Tài liệu Kỹ thuật Chi tiết
Kiến trúc Hệ thống
Giao tiếp Frontend-Backend
Các Điểm cuối API (API Endpoints)
   - Tất cả giao tiếp frontend-backend diễn ra thông qua các điểm cuối API RESTful
   - URL cơ sở: http://localhost:3000/api
   - Xác thực: JWT tokens trong tiêu đề yêu cầu

Luồng Dữ liệu (Data Flow)
   Frontend (HTML/JS) → Yêu cầu API → Backend (Node.js/Express) → Các Tệp JSON

Chạy Ứng dụng
Điều kiện Tiên quyết
Node.js (v14 trở lên)
npm (v6 trở lên)
Trình duyệt web hiện đại
Trình chỉnh sửa mã (VS Code được khuyến nghị)
Thiết lập Từng bước
Thiết lập ban đầu    ```bash    # Sao chép kho lưu trữ    git clone [địa-chỉ-kho-lưu-trữ]    cd kaphee
# Cài đặt các phụ thuộc gốc
   npm install

# Cài đặt các phụ thuộc backend
   cd backend
   npm install
   cd ..

# Cài đặt các phụ thuộc frontend
   cd frontend
   npm install
   cd ..
   ```

Cấu hình Môi trường
   - Tạo tệp .env trong thư mục backend:
     PORT=3000      JWT_SECRET=your_secret_key      NODE_ENV=development

Khởi động Ứng dụng
   ```bash
   # Khởi động máy chủ backend
   cd backend
   npm start

# Trong một terminal mới, chạy frontend
   cd frontend
   npm start
   ```

Truy cập Ứng dụng    - Frontend: http://localhost:8080    - API Backend: http://localhost:3000
Tương tác các Thành phần Cốt lõi
1. Luồng Xác thực
login.html → auth.js → backend/routes/auth.js → admins.json/customers.json
auth.js xử lý gửi biểu mẫu
Backend xác thực thông tin đăng nhập
JWT token được tạo cho người dùng đã xác thực
Phiên được duy trì trong localStorage
2. Luồng Hệ thống Đặt chỗ
booking.html → booking.js → backend/routes/bookings.js → bookings.json
Chọn ngày/giờ ở frontend
Xác thực trong booking.js
Backend kiểm tra tính khả dụng
Cập nhật bookings.json
3. Luồng Quản lý Thực đơn
menu.html → menu.js → backend/routes/menu.js → menu.json
Các món trong thực đơn được tải từ menu.json
Lọc frontend trong menu.js
Quản trị viên cập nhật thông qua admin-dashboard.js
Chi tiết Cấu trúc Tệp Hệ thống
Cấu trúc Backend (/backend)
backend/
├── index.js              # Điểm vào máy chủ
├── routes/               # Các điểm cuối API
│   ├── auth.js          # Tuyến xác thực
│   ├── bookings.js      # Quản lý đặt chỗ
│   ├── menu.js          # Thao tác với thực đơn
│   └── users.js         # Quản lý người dùng
├── models/              # Các mô hình dữ liệu
│   ├── Booking.js       # Lược đồ đặt chỗ
│   ├── MenuItem.js      # Lược đồ món ăn trong thực đơn
│   └── User.js          # Lược đồ người dùng
├── middleware/          # Middleware tùy chỉnh
│   ├── auth.js          # Kiểm tra xác thực
│   └── validation.js    # Xác thực đầu vào
├── config/             # Cấu hình
│   └── database.js      # Cài đặt cơ sở dữ liệu
└── utils/              # Các hàm tiện ích
    ├── logger.js        # Tiện ích ghi log
    └── helpers.js       # Các hàm hỗ trợ
Cấu trúc Frontend (/frontend)
frontend/
├── js/                 # Các tệp JavaScript
│   ├── auth.js         # Logic xác thực
│   ├── booking.js      # Hệ thống đặt chỗ
│   ├── menu.js         # Hiển thị thực đơn
│   └── admin.js        # Bảng điều khiển quản trị
├── css/               # Các stylesheet
│   ├── main.css       # Các kiểu dáng chính
│   └── admin.css      # Các kiểu dáng quản trị
└── assets/           # Tài nguyên tĩnh
    ├── images/       # Tệp hình ảnh
    └── icons/        # Tệp biểu tượng
Quản lý Dữ liệu
Cấu trúc Tệp JSON
admins.json
   json    {      "admins": [        {          "id": "ADM001",          "username": "admin1",          "password": "hashed_password",          "role": "super_admin"        }      ]    }

customers.json
   json    {      "customers": [        {          "id": "CUST001",          "fullName": "John Doe",          "email": "john@example.com",          "loyaltyPoints": 100        }      ]    }

bookings.json
   json    {      "bookings": [        {          "id": "BK001",          "customerId": "CUST001",          "date": "2024-03-20",          "time": "19:00",          "status": "confirmed"        }      ]    }

menu.json
   json    {      "menuItems": [        {          "id": "M001",          "name": "Cappuccino",          "price": 4.50,          "category": "Hot Coffee"        }      ]    }

Quy trình Phát triển
Thực hiện Thay đổi
   - Thay đổi Frontend: Chỉnh sửa các tệp trong /frontend hoặc /js
   - Thay đổi Backend: Sửa đổi các tệp trong /backend
   - Thay đổi Dữ liệu: Cập nhật trực tiếp các tệp JSON

Kiểm tra Thay đổi
   ```bash
   # Chạy kiểm thử backend
   cd backend
   npm test

# Chạy kiểm thử frontend
   cd frontend
   npm test
   ```

Gỡ lỗi (Debugging)    - Backend: Sử dụng console.log() hoặc trình gỡ lỗi    - Frontend: Công cụ dành cho nhà phát triển trình duyệt    - API: Postman hoặc công cụ tương tự
Các cân nhắc về Bảo mật
Xác thực
   - JWT tokens để quản lý phiên
   - Mã hóa mật khẩu bằng bcrypt
   - Kiểm soát truy cập dựa trên vai trò

Bảo vệ dữ liệu
   - Xác thực đầu vào ở cả hai đầu
   - Bảo vệ XSS
   - CSRF tokens

Bảo mật tệp
   - Sao lưu định kỳ các tệp JSON
   - Kiểm soát truy cập cho các chức năng quản trị
   - Tải lên tệp an toàn

Tối ưu hóa Hiệu suất
Frontend
   - Minify JavaScript và CSS
   - Tối ưu hóa hình ảnh
   - Tải chậm (Lazy loading)

Backend
   - Cache dữ liệu thường xuyên truy cập
   - Các thao tác tệp JSON hiệu quả
   - Giới hạn tốc độ yêu cầu

Khắc phục Sự cố
Các vấn đề phổ biến
   - Xung đột cổng: Thay đổi PORT trong .env
   - Lỗi CORS: Kiểm tra cài đặt CORS backend
   - Quyền tệp: Đảm bảo quyền đọc/ghi

Các bước gỡ lỗi
   - Kiểm tra bảng điều khiển trình duyệt
   - Xem lại nhật ký máy chủ
   - Xác minh tính toàn vẹn của tệp JSON

Các Tệp Quan trọng và Quản lý Token
Các Tệp Quan trọng theo Thư mục
Thư mục Gốc
package.json
   - Vị trí: /package.json
   - Mục đích: Cấu hình dự án chính
   - Chứa: Các phụ thuộc, tập lệnh, siêu dữ liệu dự án
   - Các trường chính:
     json      {        "name": "kaphee",        "version": "1.0.0",        "scripts": {          "start": "node backend/index.js",          "dev": "nodemon backend/index.js"        }      }

.env
   - Vị trí: /.env
   - Mục đích: Biến môi trường
   - Chứa: Khóa API, bí mật, cấu hình
   - Các biến bắt buộc:
     PORT=3000      JWT_SECRET=your_jwt_secret      NODE_ENV=development

Thư mục Backend (/backend)
index.js
   - Vị trí: /backend/index.js
   - Mục đích: Điểm vào máy chủ
   - Các chức năng chính:
     - Khởi tạo máy chủ
     - Thiết lập Middleware
     - Đăng ký tuyến đường (Route registration)
     - Xử lý lỗi

routes/auth.js
   - Vị trí: /backend/routes/auth.js
   - Mục đích: Các điểm cuối xác thực
   - Các điểm cuối chính:
     javascript      POST /api/auth/login      POST /api/auth/register      POST /api/auth/refresh-token

middleware/auth.js
   - Vị trí: /backend/middleware/auth.js
   - Mục đích: Xác minh token
   - Các chức năng chính:
     - Xác thực JWT
     - Kiểm tra vai trò
     - Xác thực yêu cầu

Thư mục Frontend (/frontend)
js/auth.js
   - Vị trí: /frontend/js/auth.js
   - Mục đích: Xử lý xác thực
   - Các chức năng chính:
     - Lưu trữ token
     - Đăng nhập/Đăng xuất
     - Quản lý phiên

js/admin.js
   - Vị trí: /frontend/js/admin.js
   - Mục đích: Chức năng quản trị
   - Các tính năng chính:
     - Quản lý người dùng
     - Cấu hình hệ thống
     - Kiểm soát truy cập

Quản lý Token
1. Cấu trúc Token JWT
JavaScript

{
  "header": {
    "alg": "HS256", // Thuật toán băm (Hashing algorithm)
    "typ": "JWT"   // Loại token
  },
  "payload": {
    "userId": "USER_ID",      // ID người dùng
    "role": "admin|customer", // Vai trò người dùng
    "iat": 1516239022,        // Thời gian tạo (Issued At)
    "exp": 1516242622        // Thời gian hết hạn (Expiration Time)
  },
  "signature": "HMACSHA256(...)" // Chữ ký số
}
2. Cách Nhận Token
Token Quản trị viên
Quy trình Đăng nhập    javascript    // POST /api/auth/admin/login    {      "username": "admin1",      "password": "your_password"    }    - Phản hồi:    javascript    {      "token": "eyJhbGciOiJIUzI1NiIs...",      // Token truy cập chính      "refreshToken": "eyJhbGciOiJIUzI1NiIs...", // Token làm mới      "role": "admin"                           // Vai trò người dùng    }
Token Khách hàng
Quy trình Đăng nhập    javascript    // POST /api/auth/customer/login    {      "email": "customer@example.com",      "password": "your_password"    }    - Phản hồi:    javascript    {      "token": "eyJhbGciOiJIUzI1NiIs...",      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",      "role": "customer"    }
3. Lưu trữ Token
Lưu trữ Frontend
JavaScript

// Lưu trữ token
localStorage.setItem('accessToken', token);
localStorage.setItem('refreshToken', refreshToken);

// Lấy token
const token = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
Lưu trữ Backend
JavaScript

// Xác minh token
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
4. Sử dụng Token
Yêu cầu API
JavaScript

// Thêm token vào yêu cầu
fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
    'Content-Type': 'application/json'
  }
});
Làm mới Token
JavaScript

// POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
Các Thực hành Bảo mật Tốt nhất
Lưu trữ Token
   - Lưu trữ token trong localStorage cho các ứng dụng web
   - Sử dụng cookies bảo mật, HTTP-only cho các ứng dụng nhạy cảm
   - Không bao giờ lưu trữ token trong tham số URL

Xác thực Token
   - Xác minh chữ ký token
   - Kiểm tra thời gian hết hạn của token
   - Xác thực các yêu cầu (claims) của token

Làm mới Token
   - Triển khai làm mới token tự động
   - Sử dụng refresh token cho các phiên dài hạn
   - Xoay vòng refresh token (thay đổi refresh token sau mỗi lần sử dụng)

Xử lý Lỗi
   javascript    try {      const token = localStorage.getItem('accessToken');      if (!token) {        window.location.href = '/login.html'; // Chuyển hướng đến trang đăng nhập nếu không có token      }    } catch (error) {      console.error('Lỗi token:', error);      // Xử lý các lỗi liên quan đến token    }

Kiểm soát Truy cập Tệp
Các Tệp Quản trị viên
   - /backend/routes/admin.js
   - /frontend/js/admin.js
   - /admin-dashboard.html
   - Truy cập: Yêu cầu token quản trị viên

Các Tệp Khách hàng
   - /backend/routes/customer.js
   - /frontend/js/customer.js
   - /dashboard.html
   - Truy cập: Yêu cầu token khách hàng

Các Tệp Công khai
   - /index.html
   - /menu.html
   - /login.html
   - Truy cập: Không yêu cầu token

Ví dụ Triển khai Token
JavaScript

// Tạo token Backend
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    process.env.JWT_SECRET, // Khóa bí mật JWT từ biến môi trường
    { expiresIn: '1h' }      // Token hết hạn sau 1 giờ
  );
};

// Sử dụng token Frontend
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Không có token khả dụng');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}` // Gửi token trong tiêu đề Authorization
    }
  });

  if (response.status === 401) {
    // Token hết hạn, thử làm mới
    await refreshToken(); // Hàm này sẽ được gọi để làm mới token
    return makeAuthenticatedRequest(url, options); // Thử lại yêu cầu với token mới
  }

  return response;
};
Cấu trúc Thư mục và Tệp Chi tiết
Thư mục Gốc (/)
/
├── index.html              # Trang đích chính
├── login.html             # Trang đăng nhập khách hàng
├── register.html          # Đăng ký khách hàng
├── menu.html             # Hiển thị thực đơn
├── booking.html          # Đặt bàn
├── admin.html            # Giao diện quản trị viên
├── dashboard.html        # Bảng điều khiển khách hàng
├── admin-dashboard.html  # Bảng điều khiển quản trị
├── admin-login.html      # Xác thực quản trị viên
├── package.json          # Cấu hình dự án
├── package-lock.json     # Tệp khóa phụ thuộc
├── admins.json           # Dữ liệu người dùng quản trị
├── customers.json        # Thông tin khách hàng
├── bookings.json         # Dữ liệu đặt chỗ
└── menu.json            # Dữ liệu món ăn trong thực đơn
Thư mục Backend (/backend)
/backend
├── index.js              # Điểm vào máy chủ
├── package.json          # Các phụ thuộc backend
├── package-lock.json     # Khóa phụ thuộc backend
│
├── routes/               # Các điểm cuối API
│   ├── auth.js          # Các tuyến xác thực
│   ├── bookings.js      # Quản lý đặt chỗ
│   ├── menu.js          # Thao tác với thực đơn
│   └── users.js         # Quản lý người dùng
│
├── models/              # Các mô hình dữ liệu
│   ├── Booking.js       # Lược đồ đặt chỗ
│   ├── MenuItem.js      # Lược đồ món ăn trong thực đơn
│   └── User.js          # Lược đồ người dùng
│
├── middleware/          # Middleware tùy chỉnh
│   ├── auth.js          # Kiểm tra xác thực
│   └── validation.js    # Xác thực đầu vào
│
├── config/             # Cấu hình
│   └── database.js      # Cài đặt cơ sở dữ liệu
│
└── utils/              # Các hàm tiện ích
    ├── logger.js        # Tiện ích ghi log
    └── helpers.js       # Các hàm hỗ trợ
Thư mục Frontend (/frontend)
/frontend
├── admin-dashboard.html  # Giao diện bảng điều khiển quản trị
├── menu.html            # Hiển thị thực đơn
├── package.json         # Các phụ thuộc frontend
│
├── js/                 # Các tệp JavaScript
│   ├── auth.js         # Logic xác thực
│   ├── booking.js      # Hệ thống đặt chỗ
│   ├── menu.js         # Hiển thị thực đơn
│   └── admin.js        # Bảng điều khiển quản trị
│
├── css/               # Các stylesheet
│   ├── main.css       # Các kiểu dáng chính
│   └── admin.css      # Các kiểu dáng quản trị
│
└── assets/           # Tài nguyên tĩnh
    ├── images/       # Các tệp hình ảnh
    └── icons/        # Các tệp biểu tượng
Thư mục JavaScript (/js)
/js
├── main.js            # Logic ứng dụng cốt lõi
├── auth.js            # Xử lý xác thực
├── menu.js            # Chức năng thực đơn
├── booking.js         # Hệ thống đặt chỗ
├── dashboard.js       # Bảng điều khiển người dùng
├── admin.js           # Chức năng quản trị
├── admin-dashboard.js # Bảng điều khiển quản trị
└── login.js           # Xử lý đăng nhập
Thư mục CSS (/css)
/css
├── main.css           # Stylesheet chính
├── admin.css          # Kiểu dáng bảng điều khiển quản trị
├── menu.css           # Kiểu dáng trang thực đơn
└── booking.css        # Kiểu dáng trang đặt chỗ
Thư mục Assets (/assets)
/assets
├── images/            # Các tệp hình ảnh
│   ├── logo.png       # Logo ứng dụng
│   ├── menu/          # Hình ảnh các món trong thực đơn
│   └── backgrounds/   # Hình ảnh nền
│
└── icons/            # Các tệp biểu tượng
    ├── menu/         # Biểu tượng thực đơn
    └── ui/           # Biểu tượng giao diện người dùng
Thư mục Data (/data)
/data
├── backups/          # Các bản sao lưu dữ liệu
├── temp/            # Các tệp tạm thời
└── logs/            # Các nhật ký hệ thống
Chức năng và Phụ thuộc Tệp
Các Tệp Thư mục Gốc
Các Tệp HTML
   - index.html: Điểm vào, điều hướng, các tính năng chính
   - login.html: Xác thực khách hàng
   - register.html: Đăng ký khách hàng mới
   - menu.html: Hiển thị và đặt món trên thực đơn
   - booking.html: Hệ thống đặt bàn
   - admin.html: Giao diện quản trị viên
   - dashboard.html: Bảng điều khiển khách hàng
   - admin-dashboard.html: Bảng điều khiển quản trị
   - admin-login.html: Xác thực quản trị viên

Các Tệp JSON
   - admins.json: Quản lý người dùng quản trị
   - customers.json: Lưu trữ dữ liệu khách hàng
   - bookings.json: Quản lý đặt chỗ
   - menu.json: Quản lý các món trong thực đơn

Các Tệp Backend
Các Tệp Máy chủ
   - index.js: Thiết lập máy chủ, middleware, các tuyến
   - package.json: Các phụ thuộc backend

Các Tệp Tuyến (Route Files)
   - auth.js: Các điểm cuối xác thực
   - bookings.js: Quản lý đặt chỗ
   - menu.js: Các thao tác với thực đơn
   - users.js: Quản lý người dùng

Các Tệp Mô hình (Model Files)
   - Booking.js: Cấu trúc dữ liệu đặt chỗ
   - MenuItem.js: Cấu trúc món ăn trong thực đơn
   - User.js: Cấu trúc dữ liệu người dùng

Các Tệp Frontend
Các Tệp JavaScript
   - auth.js: Logic xác thực
   - booking.js: Hệ thống đặt chỗ
   - menu.js: Hiển thị thực đơn
   - admin.js: Bảng điều khiển quản trị

Các Tệp CSS
   - main.css: Kiểu dáng chung
   - admin.css: Kiểu dáng bảng điều khiển quản trị
   - menu.css: Kiểu dáng trang thực đơn
   - booking.css: Kiểu dáng trang đặt chỗ

Các Phụ thuộc Tệp
Các Phụ thuộc Frontend
JavaScript

// auth.js dependencies
import { validateForm } from './utils/validation.js'; // Phụ thuộc vào các hàm xác thực biểu mẫu
import { api } from './utils/api.js';                  // Phụ thuộc vào module API

// menu.js dependencies
import { displayMenu } from './utils/display.js';  // Phụ thuộc vào hàm hiển thị thực đơn
import { filterItems } from './utils/filter.js';  // Phụ thuộc vào hàm lọc món ăn

// booking.js dependencies
import { datePicker } from './utils/date.js';    // Phụ thuộc vào tiện ích chọn ngày
import { timeSlots } from './utils/time.js';    // Phụ thuộc vào tiện ích khe thời gian
Các Phụ thuộc Backend
JavaScript

// index.js dependencies
const express = require('express');   // Phụ thuộc vào Express framework
const cors = require('cors');         // Phụ thuộc vào CORS middleware
const jwt = require('jsonwebtoken');  // Phụ thuộc vào thư viện JWT

// auth.js dependencies
const bcrypt = require('bcrypt');      // Phụ thuộc vào thư viện mã hóa mật khẩu
const jwt = require('jsonwebtoken');  // Phụ thuộc vào thư viện JWT

// bookings.js dependencies
const { validateBooking } = require('../utils/validation'); // Phụ thuộc vào hàm xác thực đặt chỗ
const { sendEmail } = require('../utils/email');           // Phụ thuộc vào hàm gửi email
Luồng Thực thi Tệp
Khởi động Ứng dụng
   index.html → main.js → backend/index.js

Luồng Xác thực
   login.html → auth.js → backend/routes/auth.js → JWT toke// backend/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
});

// Auto-generate slug before saving
categorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

// Index for efficient querying
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Category', categorySchema);n

Luồng Đặt chỗ
   booking.html → booking.js → backend/routes/bookings.js → bookings.json

Luồng Thực đơn
   menu.html → menu.js → backend/routes/menu.js → menu.json

Luồng Quản trị viên
   admin-login.html → auth.js → admin-dashboard.html → admin.js