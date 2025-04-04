# Tanstack

Fundamentals of implementing TanStack in our Next.js 15 projects

![Tanstack-logo](https://tanstack.com/_build/assets/splash-light-CHqMsyq8.png)

## React Query vs Zustand

- React Query is a data-fetching library that helps manage server state in React applications. It provides features like caching, synchronization, and background updates for remote data.
- Zustand is a state management library that provides a simple and efficient way to manage client-side state in React applications. It uses a minimalistic API and allows for easy integration with React components.

When should you use React Query vs Zustand?

- React Query manages server State whereas State managers like Zustand manage App State
- Server state is everything that we fetch from a remote server whereas App state is like a global use state within your app it allow you to share data between client side components (data management)
