# Timber Ranch - Backend API

The GraphQL backend for **Timber Properties**, a rental property booking platform. Handles authentication, property management, reservation booking, payment processing, image storage, and email notifications.

**Frontend:** [timber-properties-client](https://github.com/mjh1985codeman/timber-properties-client) | [Live Site](https://timber-properties.netlify.app/)
**API Endpoint:** [gql-api-timber-properties.onrender.com/graphql](https://gql-api-timber-properties.onrender.com/graphql)

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Runtime** | Node.js, Express |
| **API** | GraphQL, Apollo Server |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JWT, bcryptjs |
| **Payments** | Stripe (Payment Intents) |
| **Storage** | AWS S3 (presigned URLs for image uploads) |
| **Email** | Courier (confirmations and password resets) |
| **Deployment** | Render |

## Features

- User registration and login with role-based access (admin / customer)
- Property CRUD operations (admin-only creation)
- Reservation booking with date management
- Stripe down payment processing (50% of total)
- S3 presigned URL generation for property image uploads
- Email confirmations via Courier
- Password reset flow with tokenized email links

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Stripe, AWS S3, and Courier accounts

### Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the `server/` directory:

   ```
   MONGO_URI=your_mongodb_connection_string
   AUTH_SECRET=your_jwt_secret
   STRIPE_SECRET=your_stripe_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   COURIER_TOKEN=your_courier_auth_token
   ```

3. Start the server:

   ```bash
   node server.js
   ```

   The GraphQL endpoint will be available at `http://localhost:3001/graphql`.

## API Overview

### Queries

| Query | Description |
|-------|-------------|
| `getProperties` | List all properties |
| `getProperty(_id)` | Get a property by ID |
| `getPropertyByName(name)` | Get a property by name |
| `getUser(_id)` | Get a user with their reservations |
| `getUserReservations(email)` | Get reservations by user email |
| `getReservations` | List all reservations |
| `getReservationsByPropertyId(_id)` | Get reservations for a property |
| `getS3URL(propId)` | Get a presigned S3 upload URL |
| `getCoverS3URL(propId)` | Get a presigned S3 URL for cover images |
| `getClientSecret(resDetails)` | Get a Stripe payment intent client secret |

### Mutations

| Mutation | Description |
|----------|-------------|
| `addUser` | Register a new user |
| `login` | Authenticate and receive a JWT |
| `addProperty` | Create a property (admin only) |
| `addReservation` | Book a reservation (auth required) |
| `deleteReservation` | Cancel a reservation (auth required) |
| `sendReservationEmailConfirmation` | Send a booking confirmation email |
| `getPwResetLink` | Send a password reset email |
| `updateUserPassword` | Reset password with a token |

## Project Structure

```
timber-ranch/
├── server/
│   ├── server.js           # Express + Apollo Server entry point
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── models/
│   │   ├── Property.js
│   │   ├── Reservation.js
│   │   └── User.js
│   ├── schemas/
│   │   ├── typeDefs.js     # GraphQL schema
│   │   └── resolvers.js    # GraphQL resolvers
│   └── utils/
│       ├── auth.js         # JWT middleware
│       ├── stripe.js       # Stripe payment logic
│       ├── s3.js           # AWS S3 presigned URL generation
│       └── courier.js      # Email service
└── package.json
```

## Related

- **Frontend:** [timber-properties-client](https://github.com/mjh1985codeman/timber-properties-client) | [Live Site](https://timber-properties.netlify.app/)
