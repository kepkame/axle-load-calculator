<div align="center">
<h1>🚛 Axle Load Calculator</h1>

<p align="center">🌐 Available languages: English&nbsp;&nbsp;| &nbsp;<a href="https://github.com/kepkame/axle-load-calculator/blob/main/README.ru.md">Русский</a></p>

[Live Demo](https://axle-load-calculator.vercel.app/)

</div>

## 📖 Project Description

The web application helps quickly plan the placement of pallets on the platform and assess the load distribution on the tractor and semi-trailer axles. The purpose of the application is convenient planning and prevention of overloads.

https://github.com/user-attachments/assets/ee6046f2-404b-4abf-8150-f0f3aa8c17d2

&nbsp;

---

&nbsp;

## ✨ Features

- A clear scenario of three simple steps.
- Accounting for lift axles and basic vehicle parameters (weights, axles, lengths, wheelbase distances).
- Adding groups of standard-size pallets (1200×1000, 1050×1050, 1200×800 mm) with specified weight and quantity.
- Rearranging pallet groups using drag-and-drop.
- Axle load table and visual scheme of tractor with semi-trailer.
- Color-coded status indication: **green – safe**, **orange – close to the limit**, **red – overload**.

&nbsp;

---

&nbsp;

## 📋 Workflow Scenario (Step 1 → Step 2 → Step 3)

The application works as a three-step wizard.

### Step 1. Vehicle Data

Enter the basic parameters of the tractor and semi-trailer:

- curb weight of tractor and semi-trailer (kg),
- number of axles for tractor and semi-trailer (pcs),
- indication of lift axles (if any),
- axle distances of tractor and semi-trailer (m),
- length of the coupling device (m),
- length of the semi-trailer platform (m),
- axle load without cargo and maximum permissible load (t).

---

### Step 2. Adding Cargo

Add one or several groups of pallets:

- pallet size (choose from standard: 1200×1000, 1050×1050, 1200×800 mm),
- weight of one pallet (kg),
- number of pallets in the group (pcs).

Pallet groups can be rearranged via drag-and-drop to simulate loading order on the platform.  
To do this, hold the dotted area to the left of the group name and move the group.

The application automatically checks that the total pallet length does not exceed the platform length.

---

### Step 3. Cargo Placement

At the final step, the resulting load distribution is displayed:

- a diagram of the tractor and semi-trailer with axles showing current load per axle,
- an axle table with actual and permissible load,
- top-down pallet plan with placement, dimensions, weight, and color-coded load indication.

If there is a risk of overload, adjust the number or order of groups in Step 2.

&nbsp;

---

&nbsp;

## 🛠 Technology Stack

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white&style=flat)](https://www.npmjs.com/package/react)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.5-764ABC?logo=redux&logoColor=white&style=flat)](https://www.npmjs.com/package/@reduxjs/toolkit)
[![React Redux](https://img.shields.io/badge/React%20Redux-9.2-764ABC?logo=redux&logoColor=white&style=flat)](https://www.npmjs.com/package/react-redux)
[![Zod](https://img.shields.io/badge/Zod-3.24-informational?style=flat)](https://www.npmjs.com/package/zod)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white&style=flat)](https://www.npmjs.com/package/typescript)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white&style=flat)](https://www.npmjs.com/package/vite)
[![Sass](https://img.shields.io/badge/Sass-1.83-CC6699?logo=sass&logoColor=white&style=flat)](https://www.npmjs.com/package/sass)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520-339933?logo=node.js&logoColor=white&style=flat)](https://nodejs.org/)

- **React 18**, **TypeScript**, **Vite** – fast start and build.
- **React Router** – step navigation.
- **Redux Toolkit** – step and form state management.
- **react-hook-form** + **Zod** – forms and validation.
- **React Select** – dropdowns.
- **Motion** – smooth animations when dragging pallet groups.
- **SASS/SCSS** for styling.

&nbsp;

---

&nbsp;

## 🚀 Installation

Requires **Node.js** >=20 and **npm** >=10.

1. Clone the repository:

```bash
git clone https://github.com/kepkame/axle-load-calculator.git
cd stopwatch
```

2. Install dependencies:

```bash
npm install
```

3. Specify the backend server address for load calculations. Create a `.env` file and add:

```env
VITE_API_BASE_URL=http://localhost:4000
```

4. Start in development mode:

```bash
npm run dev
```

After starting, the app will be available at [http://localhost:5173](http://localhost:5173).

&nbsp;

---

&nbsp;

## 🏗 How to Build

1. To generate an optimized production build, run:

```bash
npm run build
```

2. Before building, specify the working backend API address in `.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-server.com
```

The frontend uses backend endpoints for load calculations (for example, `POST /calc/axle-loads` accepts vehicle and pallet parameters and returns axle distribution).  
The calculation logic is implemented on the backend and is not publicly available.

3. Built files will be located in the `dist/` folder. This folder can be deployed to any static hosting or web server (e.g., Nginx).

To test locally:

```bash
npm run preview
```

By default, the application will be available at [http://localhost:4173](http://localhost:4173).

&nbsp;

---

&nbsp;

## 📂 Project Structure

```shell
axle-load-calculator/
├── public/                 # Static files (icons, manifest)
├── src/                    # Application source code
│   ├── assets/             # Fonts, icons, images
│   ├── components/         # Reusable UI components (tables, forms, tooltips)
│   ├── entities/           # Data schemas/types for steps and related utils
│   ├── hooks/              # Common React hooks
│   ├── layouts/            # Page layouts (Header, Footer, wrappers)
│   ├── pages/              # Pages: Step1/Step2/Step3 and static ones
│   ├── shared/             # Shared constants and types
│   ├── store/              # State management (RTK), API layer, slices
│   ├── styles/             # SCSS styles, variables, mixins
│   ├── utils/              # Helper functions and calculations
│   ├── App.tsx             # Root application component
│   └── main.tsx            # React/Vite entry point
├── index.html              # HTML template
├── .env*                   # Environment variables (dev/prod)
├── package.json            # Scripts and dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig*.json          # TypeScript configurations
├── eslint.config.js        # ESLint settings
├── .gitignore, .hintrc     # Service files
└── README.md               # Project description
```

&nbsp;

---

&nbsp;

## 📦 Import Aliases

| Aliase                | Path                     |
| --------------------- | ------------------------ |
| `@api/*`              | `src/api/*`              |
| `@assets/*`           | `src/assets/*`           |
| `@components/*`       | `src/components/*`       |
| `@entities/*`         | `src/entities/*`         |
| `@features/*`         | `src/features/*`         |
| `@hooks/*`            | `src/hooks/*`            |
| `@layouts/*`          | `src/layouts/*`          |
| `@pages/*`            | `src/pages/*`            |
| `@store/*`            | `src/store/*`            |
| `@styles/*`           | `src/styles/*`           |
| `@shared-constants/*` | `src/shared/constants/*` |
| `@shared-types/*`     | `src/shared/types/*`     |
| `@utils/*`            | `src/utils/*`            |

&nbsp;

---

&nbsp;

## 📌 Important to Know

- The application provides **approximate** results – it is a planning tool, not an official weighing system. Always check actual axle loads on certified scales before departure.
- Dynamic factors are not considered: road irregularities, acceleration/braking, coupling angle, weather conditions, and fuel reserve.
- Lift axles are included in the calculations – if the vehicle has a lift axle, it is displayed and taken into account.
- Responsibility for compliance with transport regulations lies with the driver/operator – use the results as guidance, not as a final instruction.

&nbsp;

---

&nbsp;
Safe trips without overloads! 🚛
