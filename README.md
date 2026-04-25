# HoyLink - Real Estate Rental Platform

HoyLink is a modern, premium real-estate rental platform designed for simplicity and power. It allows users to browse high-quality listings and provides administrators with a robust dashboard for property management.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with a high-contrast aesthetic and smooth animations.
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) operations for property listings.
- **Persistent Data**: Uses **IndexedDB** for local data persistence, ensuring changes are saved across sessions.
- **Multi-language Support**: Seamlessly switch between English and Somali.
- **Interest Tracking**: Users can express interest in properties, which administrators can track in real-time.
- **Rich Media**: Multi-image support for property listings.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Persistence**: IndexedDB (Native Browser API)

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abuudixo/holink.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## 🏗️ Project Structure

- `src/components`: UI components, including specialized admin components.
- `src/pages`: Main application pages (Home, Rentals, Login, etc.).
- `src/context`: React Context for state management (Listings, Interests, Language).
- `src/layouts`: Layout wrappers for public and admin pages.
- `src/utils`: Utility functions, including database operations.

## 📝 License

This project is licensed under the ISC License.
