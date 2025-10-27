# Vite + React + TypeScript Blog

This project is a blog application built with Vite, React, and TypeScript. It features interactive tables using KendoReact Grid, allowing for sorting, filtering, pagination, and exporting data to Excel and CSV formats.

## Project Structure

```
vite-react-blog
├── index.html          # Main HTML entry point
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── .gitignore          # Git ignore file
├── README.md           # Project documentation
├── src
│   ├── main.tsx        # Entry point for the React application
│   ├── App.tsx         # Main application component with routing
│   ├── index.css       # Global styles
│   ├── pages
│   │   ├── Home.tsx    # Home page displaying blog posts
│   │   └── Post.tsx    # Individual blog post page
│   ├── components
│   │   ├── Header.tsx   # Header component with navigation
│   │   ├── PostCard.tsx  # Component displaying a summary of a blog post
│   │   ├── DataTable.tsx # KendoReact Grid for displaying data
│   │   └── ExcelTable.tsx # Component for loading and displaying Excel data
│   ├── services
│   │   ├── api.ts       # API calls for fetching data
│   │   └── export.ts    # Functions for exporting data
│   ├── hooks
│   │   └── usePagination.ts # Custom hook for pagination
│   ├── types
│   │   └── index.ts     # TypeScript types and interfaces
│   └── utils
│       ├── csv.ts       # Utility functions for CSV handling
│       └── excel.ts     # Utility functions for Excel handling
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd vite-react-blog
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Features

- Interactive tables with KendoReact Grid
- Sorting, filtering, and pagination capabilities
- Export data to Excel and CSV formats
- Responsive design for a seamless user experience

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.