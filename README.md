# Tripzy Frontend Test

This project is a frontend application built with Next.js, TypeScript, and Tailwind CSS. It provides a user interface for searching and booking bus trips.

## Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router) was chosen for its powerful features like server-side rendering, static site generation, and a great developer experience.
- **Language**: [TypeScript](https://www.typescriptlang.org/) is used for static typing, which helps in catching errors early and improving code quality and maintainability.
- **UI**: The UI is built using [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, and [shadcn/ui](https://ui.shadcn.com/) for a set of accessible and customizable React components based on Radix UI.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) is used for managing form state and validation, integrated with [Zod](https://zod.dev/) for schema validation.

## Getting Started

### Prerequisites

Make sure you have [pnpm](https://pnpm.io/installation) installed.

### Installation and Running the App

1.  Clone the repository:
    ```bash
    git clone https://github.com/varia418/tripzy-frontend-test-nhan.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd tripzy-frontend-test-nhan
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```
4.  Run the development server:
    ```bash
    pnpm dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Building the Project

To create a production build, run:

```bash
pnpm build
```

## Demo

A live demo of the application is available here: [https://tripzy-frontend-test-nhan.vercel.app/](https://tripzy-frontend-test-nhan.vercel.app/)
