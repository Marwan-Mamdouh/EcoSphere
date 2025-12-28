# EcoSphere 🌱

**EcoSphere** is a comprehensive, eco-friendly e-commerce and sustainability platform designed to help users discover and purchase sustainable products, participate in environmental events, find eco-friendly restaurants, learn about recycling, explore green recipes, and engage with eco-conscious content through gamification.

## 🌟 Features

### 🛍️ E-Commerce & Shopping

- **Eco-Friendly Store**: Browse and purchase sustainable products from curated shops
- **Multi-Shop Support**: Multiple eco-friendly shops with their own product catalogs
- **Shopping Cart**: Add products to cart and manage purchases
- **Favorites**: Save favorite products for later
- **Discount Coupons**: Apply discount codes during checkout
- **Order Management**: Track and manage orders with full order history

### 💳 Payments & Subscriptions

- **Stripe Integration**: Secure payment processing with Stripe
- **Subscription Plans**: Premium subscription tiers with recurring billing
- **Webhook Events**: Real-time payment event handling via Stripe webhooks

### ♻️ Recycling Platform

- **Recycle Request System**: Submit recycling requests with materials and location
- **Recycle Agent Dashboard**: Dedicated dashboard for recycling agents to manage requests
- **Status Tracking**: Track recycling request status from submission to completion
- **Material Classification**: Categorize recyclable materials

### 📅 Events & Community

- **Environmental Events**: Discover and participate in local and global eco-events
- **Event Organizer Dashboard**: Tools for organizers to create and manage events
- **Event Registration**: Sign up for events and get updates

### 🍽️ Restaurants & Recipes

- **Eco-Friendly Restaurants**: Discover sustainable restaurants near you
- **Green Recipes**: Browse environmentally-conscious recipes
- **Restaurant Menu Integration**: View menus from partner restaurants

### 🤖 AI Features

- **AI-Powered Recommendations**: Get personalized eco-friendly suggestions
- **Smart Search**: Intelligent search across products and content

### 👥 User Roles & Dashboards

- **End Users**: Shop, browse, and participate in the eco-community
- **Shop Owners**: Manage products, orders, and shop settings
- **Event Organizers**: Create and manage environmental events
- **Recycle Agents**: Process and manage recycling requests
- **Administrators**: Full platform management and oversight

### 🌐 Internationalization

- **Multi-Language Support**: i18n with locale-based routing
- **Localized Content**: Language-specific content and messaging

### 🎮 Gamification & Engagement

- **Interactive Games**: Engage with eco-friendly activities
- **Environmental News**: Stay updated with sustainability tips
- **🌓 Dark/Light Mode**: Beautiful theme support

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Redux Toolkit** - State management
- **Next Themes** - Theme switching
- **next-intl** - Internationalization

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication solution
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing
- **TSyringe** - Dependency injection container
- **Stripe SDK** - Payment processing

### Database

- **MongoDB** - NoSQL database with native driver

## 📁 Project Structure

```
EcoSphere/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Locale-based routing (i18n)
│   │   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   │   ├── admin/            # Admin dashboard
│   │   │   │   │   ├── event/        # Event management
│   │   │   │   │   ├── recycleAgent/ # Recycle agent management
│   │   │   │   │   └── shop/         # Shop management
│   │   │   │   ├── organizer/        # Event organizer dashboard
│   │   │   │   └── recycleDash/      # Recycle agent dashboard
│   │   │   ├── about/                # About page
│   │   │   ├── auth/                 # Authentication page
│   │   │   ├── cart/                 # Shopping cart
│   │   │   ├── checkout/             # Checkout flow
│   │   │   ├── events/               # Environmental events
│   │   │   ├── fav/                  # Favorites page
│   │   │   ├── game/                 # Gamification
│   │   │   ├── news/                 # Environmental news
│   │   │   ├── payment/              # Payment pages
│   │   │   ├── profile/              # User profile
│   │   │   ├── recipes/              # Green recipes
│   │   │   ├── recycle/              # Recycling hub
│   │   │   ├── restaurant/           # Eco restaurants
│   │   │   ├── shop/                 # Shop pages
│   │   │   ├── store/                # Product store
│   │   │   └── subscription/         # Subscription plans
│   │   └── api/                      # API Routes
│   │       ├── ai/                   # AI endpoints
│   │       ├── auth/                 # Authentication (NextAuth)
│   │       ├── cart/                 # Cart management
│   │       ├── discount/             # Discount coupons
│   │       ├── events/               # Events CRUD
│   │       ├── orders/               # Order management
│   │       ├── payment/              # Payment processing
│   │       ├── products/             # Product catalog
│   │       ├── recipes/              # Recipes API
│   │       ├── recycle/              # Recycling requests
│   │       ├── restaurants/          # Restaurant listings
│   │       ├── shops/                # Shop management
│   │       ├── stripe/               # Stripe webhooks
│   │       ├── subscriptions/        # Subscription management
│   │       ├── upload/               # File uploads
│   │       └── users/                # User management
│   │
│   ├── backend/                      # Backend Business Logic
│   │   ├── config/                   # Database & app configuration
│   │   ├── features/                 # Feature modules
│   │   │   ├── ai/                   # AI service
│   │   │   ├── auth/                 # Authentication
│   │   │   │   ├── login/            # Login strategy
│   │   │   │   ├── registration/     # Registration strategies
│   │   │   │   │   ├── endUser.registration.ts
│   │   │   │   │   ├── organizer.registration.ts
│   │   │   │   │   ├── recycleAgent.registration.ts
│   │   │   │   │   └── shop.registration.ts
│   │   │   │   └── middleware/       # Auth middleware
│   │   │   ├── discountCoupon/       # Coupon management
│   │   │   ├── event/                # Event management
│   │   │   ├── orders/               # Order processing
│   │   │   ├── product/              # Product catalog
│   │   │   ├── recipe/               # Recipe management
│   │   │   ├── recycle/              # Recycling system
│   │   │   ├── restaurant/           # Restaurant listings
│   │   │   ├── subscription/         # Subscription billing
│   │   │   ├── upload/               # File upload service
│   │   │   ├── user/                 # User management
│   │   │   └── webhookEvent/         # Stripe webhook handler
│   │   └── utils/                    # Backend utilities
│   │
│   ├── components/                   # React Components
│   │   ├── layout/                   # Layout components (154+ components)
│   │   └── ui/                       # UI primitives (25+ components)
│   │
│   ├── frontend/                     # Frontend Utilities
│   │   ├── actions/                  # Server actions
│   │   ├── api/                      # API client functions
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── providers/                # Context providers
│   │   ├── redux/                    # Redux store & slices
│   │   ├── schema/                   # Validation schemas (Zod)
│   │   └── utils/                    # Frontend utilities
│   │
│   ├── hooks/                        # Shared hooks
│   ├── i18n/                         # Internationalization config
│   ├── messages/                     # Translation files
│   ├── types/                        # TypeScript definitions
│   ├── lib/                          # Library configurations
│   └── auth.ts                       # NextAuth configuration
│
├── docs/                             # Documentation
└── public/                           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)
- Stripe account (for payment features)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EcoSphere
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/ecosphere"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Stripe
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                  | Description                                 |
| ------ | ------------------------- | ------------------------------------------- |
| POST   | `/api/signup`             | User registration (supports multiple roles) |
| POST   | `/api/auth/[...nextauth]` | NextAuth.js authentication                  |

### User Endpoints

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/api/users`      | Get all users  |
| GET    | `/api/users/[id]` | Get user by ID |
| PUT    | `/api/users/[id]` | Update user    |
| DELETE | `/api/users/[id]` | Delete user    |

### Product & Shop Endpoints

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | `/api/products`      | Get all products (with filtering) |
| GET    | `/api/products/[id]` | Get product by ID                 |
| GET    | `/api/shops`         | Get all shops                     |
| GET    | `/api/shops/[id]`    | Get shop by ID                    |

### Order Endpoints

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/orders`      | Create new order |
| GET    | `/api/orders`      | Get user orders  |
| GET    | `/api/orders/[id]` | Get order by ID  |

### Recycle Endpoints

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/recycle`      | Submit recycle request |
| GET    | `/api/recycle`      | Get recycle requests   |
| PATCH  | `/api/recycle/[id]` | Update request status  |

### Event Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/events`      | Get all events           |
| POST   | `/api/events`      | Create event (organizer) |
| GET    | `/api/events/[id]` | Get event by ID          |

### Subscription & Payment Endpoints

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/subscriptions`   | Get subscription plans         |
| POST   | `/api/stripe/checkout` | Create Stripe checkout session |
| POST   | `/api/stripe/webhook`  | Stripe webhook handler         |

### API Response Format

```typescript
// Success response
{
  success: true,
  data: T,
  message?: string,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// Error response
{
  success: false,
  error: string,
  message?: string,
  statusCode?: number
}
```

## 🏗️ Architecture

### Backend Architecture

The backend follows a **layered architecture** with dependency injection using the **Strategy Pattern** for extensibility:

```
┌─────────────────────────────────────────────────────────────┐
│                      API Routes Layer                        │
│              (Next.js API Route Handlers)                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Controllers Layer                         │
│           (Request/Response handling, validation)            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     Services Layer                           │
│              (Business logic, orchestration)                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Repositories Layer                         │
│               (Data access, MongoDB queries)                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Models Layer                            │
│              (Data models, type definitions)                 │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Strategy Pattern

Registration supports multiple user types through the Strategy Pattern:

```
┌─────────────────────────────────────────┐
│        Registration Strategy Factory     │
└─────────────────────┬───────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│  EndUser  │ │ Organizer │ │   Shop    │
│ Strategy  │ │ Strategy  │ │ Strategy  │
└───────────┘ └───────────┘ └───────────┘
                      │
              ┌───────▼───────┐
              │ RecycleAgent  │
              │   Strategy    │
              └───────────────┘
```

### Key Design Patterns

- **Dependency Injection**: TSyringe for IoC container
- **Strategy Pattern**: Flexible registration and authentication
- **Repository Pattern**: Abstracted data access layer
- **Factory Pattern**: Dynamic strategy selection
- **Service Layer**: Encapsulated business logic

### Type Safety

The project uses TypeScript throughout with:

- Typed API responses with generics
- Type-safe MongoDB queries
- Type guards for runtime type checking
- Zod schemas for validation
- Comprehensive type definitions

## 🎨 Styling

The project uses **Tailwind CSS** with a custom eco-themed color palette:

- Primary green: `#527b50`
- Medium green: `#D6DE75`
- Light green: `#e3e8e2`
- Dark mode support with `next-themes`

## 📝 Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🔒 Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **NextAuth.js**: OAuth providers and session management
- **Role-Based Access**: Protected routes per user role
- **Stripe Webhooks**: Signature verification for payment events
- **Type-Safe APIs**: Runtime validation with Zod

## 🌐 Internationalization

EcoSphere supports multiple languages with:

- Locale-based routing (`/en/`, `/ar/`, etc.)
- `next-intl` for translations
- Language-specific message files in `/src/messages/`

## 📄 License

This project is private and proprietary.

## 🌍 Environmental Impact

EcoSphere is committed to promoting sustainable living and environmental awareness. By providing a platform for eco-friendly products, recycling services, sustainable restaurants, and educational content, we aim to make a positive impact on our planet.

---

Built with ❤️ for a sustainable future 🌱
