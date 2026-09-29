# LocalLift

> AI-powered sales content creation for modern businesses.

LocalLift is a mobile-first AI sales content platform designed to help businesses create, organize, and manage marketing content from a single workspace.

The application provides a structured workflow for business onboarding, brand configuration, AI content creation, content previews and results, content history, analytics, payments, and subscription management.

Built with **React Native and Expo**, LocalLift is designed with a modular feature architecture that separates application routes, reusable components, business logic, state management, API communication, and shared types.

---

## Overview

Creating consistent marketing content can be time-consuming for small businesses and growing teams.

LocalLift is built around a simple workflow:

```text
Business Setup
      ↓
Brand Configuration
      ↓
Content Creation
      ↓
AI Generation
      ↓
Preview & Result
      ↓
Content History
      ↓
Analytics & Growth
```

The application brings these workflows together in a mobile-first experience while providing a foundation for subscription-based access to AI-powered content generation.

---

## Core Features

### Business Onboarding

A guided onboarding experience allows businesses to establish the information LocalLift needs to personalize their workspace and generated content.

- Business setup
- Business category selection
- Branding configuration
- Business-specific settings

### AI Content Creation

LocalLift provides a dedicated content creation workflow for generating sales and marketing assets.

- Content creation interface
- Content preview
- Generated content results
- Brand-aware content workflows
- Image-based content workflows

### Content History

Generated content can be accessed through a dedicated history experience.

- Browse previous content
- View generated results
- Revisit content creation outputs
- Organized content workflow

### Dashboard

The main dashboard provides a centralized view of the business workspace.

- Business overview
- Content activity
- Usage information
- Analytics entry points
- Quick access to content creation

### Analytics

LocalLift includes an analytics area for monitoring business and content activity.

### Subscriptions & Payments

The application includes dedicated subscription and payment flows for managing access to paid platform capabilities.

- Subscription plans
- Plan selection
- Payment flow
- Subscription status
- Payment-related screens

### Account & Business Settings

Users can manage their account and business configuration through dedicated settings areas.

---

## Tech Stack

### Application

| Technology                                                | Purpose                           |
| --------------------------------------------------------- | --------------------------------- |
| [React Native](https://reactnative.dev/)                  | Cross-platform mobile application |
| [Expo](https://expo.dev/)                                 | React Native development platform |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based application routing    |
| TypeScript                                                | Type-safe application development |
| React 19                                                  | UI layer                          |
| React Native Web                                          | Web support                       |

### State & Data

| Technology                                   | Purpose                                       |
| -------------------------------------------- | --------------------------------------------- |
| [TanStack Query](https://tanstack.com/query) | Server state and asynchronous data management |
| [Zustand](https://zustand.docs.pmnd.rs/)     | Client-side state management                  |
| AsyncStorage                                 | Persistent local application state            |
| Expo SecureStore                             | Secure storage for sensitive local data       |

### UI & Experience

| Technology                      | Purpose                     |
| ------------------------------- | --------------------------- |
| Lucide React Native             | Interface icons             |
| Expo Vector Icons               | Iconography                 |
| Expo Linear Gradient            | Gradient-based UI           |
| Expo Image                      | Optimized image rendering   |
| Lottie React Native             | Animations                  |
| React Native Reanimated         | High-performance animations |
| React Native Gesture Handler    | Gesture interactions        |
| React Native SVG                | SVG rendering               |
| React Native Wheel Color Picker | Brand color selection       |

### Platform APIs

LocalLift also uses Expo modules for platform capabilities including:

- Authentication sessions
- Device information
- Image selection
- Deep linking
- Secure storage
- Splash screen management
- Web browser integration
- System UI integration

---

## Architecture

LocalLift follows a feature-oriented React Native architecture.

```text
src/
│
├── api/              # API communication
├── app/              # Expo Router routes
├── components/       # Reusable UI components
├── constants/        # Application constants and static data
├── hooks/            # Reusable feature hooks
├── providers/        # Application providers
├── services/         # Business/application services
├── store/            # Client-side state
├── styles/           # Shared styling
└── types/            # TypeScript definitions
```

The goal is to keep UI, state, API communication, and business logic separated enough that individual features can evolve without creating unnecessary coupling throughout the application.

---

## Project Structure

```text
src/
├── api/
│
├── app/
│   ├── (auth)/
│   │   └── content/
│   │       ├── preview/
│   │       └── result/
│   │
│   ├── (onboarding)/
│   │
│   ├── (screen)/
│   │   ├── analytics/
│   │   ├── payments/
│   │   ├── settings/
│   │   └── subscription/
│   │
│   └── (tabs)/
│       ├── create/
│       ├── dashboard/
│       ├── history/
│       ├── settings/
│       └── subscription/
│
├── components/
│   ├── business-settings/
│   ├── dashboard/
│   ├── history/
│   ├── onboarding/
│   └── ui/
│
├── constants/
│   ├── icons/
│   └── mockData/
│
├── hooks/
│   ├── business/
│   ├── contents/
│   ├── Dashboard/
│   ├── payment/
│   ├── subscription/
│   └── user/
│
├── providers/
├── services/
├── store/
├── styles/
└── types/
```

---

## Navigation

LocalLift uses **Expo Router** with typed routes enabled.

The application separates navigation into logical route groups:

### Authentication & Content

```text
(auth)/
└── content/
    ├── preview/
    └── result/
```

### Onboarding

```text
(onboarding)/
```

Handles the initial business setup experience.

### Application Screens

```text
(screen)/
├── analytics/
├── payments/
├── settings/
└── subscription/
```

Provides dedicated screens outside the primary tab navigation.

### Main Application

```text
(tabs)/
├── create/
├── dashboard/
├── history/
├── settings/
└── subscription/
```

This represents the primary authenticated application experience.

---

## State Management

LocalLift uses a combination of **TanStack Query** and **Zustand**.

### TanStack Query

Used for server-driven state and asynchronous API operations.

This provides:

- Query caching
- Request lifecycle management
- Mutation handling
- Loading and error states
- Automatic cache updates
- Reduced unnecessary network requests

### Zustand

Used for client-side application state where a centralized store is appropriate.

This separation allows server state and local UI/application state to remain conceptually distinct.

---

## Configuration

The application is currently configured through Expo's `app.json`.

### Application Identity

```text
Name:              locallift
Slug:              locallift
Version:           1.0.0
Scheme:            locallift
```

### Native Identifiers

```text
iOS Bundle ID:     com.locallift.app
Android Package:   com.locallift.app
```

### Expo Configuration

The project currently uses:

- Expo SDK 54
- Expo Router
- Typed routes
- React Compiler
- Automatic light/dark system interface configuration
- Static web output

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- Expo development environment
- Android Studio for Android development
- Xcode for iOS development on macOS

You can verify your Node and npm installations with:

```bash
node --version
npm --version
```

---

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd locallift
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the Expo development server:

```bash
npm start
```

The project runs on port `8083`.

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

> iOS development requires macOS and Xcode.

### Web

```bash
npm run web
```

---

## Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo development server |
| `npm run android` | Start the application on Android  |
| `npm run ios`     | Start the application on iOS      |
| `npm run web`     | Start the web application         |

---

## Deep Linking

LocalLift uses the following application scheme:

```text
locallift://
```

The scheme is configured through Expo and allows the application to respond to supported deep links.

---

## Development Principles

The project is being developed around several architectural principles:

### Feature-oriented organization

Related functionality is grouped by feature rather than placing every component or hook into a single global directory.

### Reusable components

Shared UI primitives live under:

```text
src/components/ui
```

while feature-specific components remain within their respective feature directories.

### Separation of concerns

The application separates:

```text
UI
↓
Hooks
↓
Services / API
↓
State & Server Data
```

This makes individual features easier to test, maintain, and extend.

### Type safety

TypeScript is used throughout the application to reduce runtime errors and provide stronger contracts between screens, hooks, services, and API responses.

---

## Roadmap

Planned areas of development include:

- [ ] Complete AI content generation workflows
- [ ] Expand business branding capabilities
- [ ] Production API integration
- [ ] Subscription enforcement
- [ ] Payment integration
- [ ] Content usage tracking
- [ ] Advanced analytics
- [ ] Content management improvements
- [ ] Production monitoring and observability
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Production mobile builds

---

## Project Status

**Development**

LocalLift is currently under active development.

The application architecture, navigation structure, reusable components, state management, and core product workflows are being developed toward a production-ready SaaS platform.

---

## License

This project is currently proprietary software.

All rights reserved.

The source code, design, branding, and product concepts may not be reproduced, distributed, or used commercially without permission from the project owner.

---

## Author

**Priestly**

Frontend / Full-Stack Developer

Portfolio: https://thisispriestly.vercel.app/
