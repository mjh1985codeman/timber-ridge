# Timber Ranch - Backend API

GraphQL API backend for **Timber Properties**, a rental property booking platform. Powers the [Timber Properties client](https://timber-properties.netlify.app/).

## Tech Stack

- **Runtime:** Node.js + Express
- **API:** GraphQL (Apollo Server)
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (jsonwebtoken + bcryptjs)
- **Payments:** Stripe (Payment Intents)
- **Storage:** AWS S3 (presigned URLs for property images)
- **Email:** Courier (reservation confirmations & password resets)

## Features

- User registration and authentication with role-based access (admin/customer)
- Property CRUD (admin-only creation)
- Reservation booking with date management
- Stripe down payment processing (50% of total)
- S3 presigned URL generation for property image uploads
- Email confirmations via Courier
- Password reset flow with tokenized email links

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Stripe account
- AWS S3 bucket
- Courier account

### Environment Variables

Create a `.env` file in the `server/` directory:

```
MONGO_URI=your_mongodb_connection_string
AUTH_SECRET=your_jwt_secret
STRIPE_SECRET=your_stripe_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
COURIER_TOKEN=your_courier_auth_token
```

### Installation

```bash
cd server
npm install
```

### Running

```bash
node server.js
```

The GraphQL server starts at `http://localhost:3001/graphql`.

## API Overview

### Queries

| Query | Description |
|-------|-------------|
| `getProperties` | List all properties |
| `getProperty(_id)` | Get property by ID |
| `getPropertyByName(name)` | Get property by name |
| `getUser(_id)` | Get user with reservations |
| `getUserReservations(email)` | Get user's reservations by email |
| `getReservations` | List all reservations |
| `getReservationsByPropertyId(_id)` | Reservations for a property |
| `getS3URL(propId)` | Get S3 presigned upload URL |
| `getCoverS3URL(propId)` | Get S3 presigned URL for cover image |
| `getClientSecret(resDetails)` | Get Stripe payment intent client secret |

### Mutations

| Mutation | Description |
|----------|-------------|
| `addUser` | Register a new user |
| `login` | Authenticate and receive JWT |
| `addProperty` | Create a property (admin only) |
| `addReservation` | Book a reservation (auth required) |
| `deleteReservation` | Cancel a reservation (auth required) |
| `sendReservationEmailConfirmation` | Send booking confirmation email |
| `getPwResetLink` | Send password reset email |
| `updateUserPassword` | Reset password with token |

## Deployment

Deployed on [Render](https://render.com) at `https://gql-api-timber-properties.onrender.com/graphql`.

## Related

- **Frontend:** [timber-properties-client](https://github.com/mjh1985codeman/timber-properties-client) | [Live Site](https://timber-properties.netlify.app/)
