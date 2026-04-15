# SuperDashboard Backend

Express.js + MongoDB backend API for SuperDashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and JWT secret.

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user
- `PUT /api/auth/updatepassword` - Update password

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/stats` - Get client statistics
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Comptes (Accounts)
- `GET /api/comptes` - Get all comptes
- `GET /api/comptes/stats` - Get compte statistics
- `GET /api/comptes/:id` - Get single compte
- `POST /api/comptes` - Create compte
- `PUT /api/comptes/:id` - Update compte
- `DELETE /api/comptes/:id` - Delete compte

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/stats` - Get invoice statistics
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `PUT /api/invoices/:id/pay` - Mark invoice as paid

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/stats` - Get sales statistics
- `GET /api/sales/:id` - Get single sale
- `POST /api/sales` - Create sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Company
- `GET /api/company` - Get company info
- `POST /api/company` - Create/update company info
- `PUT /api/company` - Update company info

### Plans
- `GET /api/plans` - Get all plans (public)
- `GET /api/plans/:id` - Get single plan (public)
- `POST /api/plans` - Create plan (admin)
- `PUT /api/plans/:id` - Update plan (admin)
- `DELETE /api/plans/:id` - Delete plan (admin)

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions (admin)
- `GET /api/subscriptions/me` - Get my subscription
- `GET /api/subscriptions/stats` - Get subscription stats (admin)
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription (admin)
- `PUT /api/subscriptions/:id/cancel` - Cancel subscription

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/revenue-chart` - Get revenue chart data

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/superdashboard |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 30d |
| CORS_ORIGIN | CORS allowed origin | http://localhost:5173 |
