# AWAF Documentation 📚

The **Apex Well-Architected Framework (AWAF)** is a modern approach to structuring Salesforce Apex codebases. It provides opinionated recommendations and guiding principles that help senior Salesforce developers scale their code with modern design patterns.

AWAF serves as a modern alternative to FFLIB (Apex Enterprise Patterns), moving beyond outdated "enterprise" patterns with a Salesforce-first approach that prioritizes practical principles over arbitrary layers.

## Table of Contents

- [About This Repository](#about-this-repository)
- [Understanding VitePress](#understanding-vitepress)
- [Contributing](#contributing)
  - [1. Fork the Repository](#1-fork-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Run Locally](#3-run-locally)
  - [4. Make Changes](#4-make-changes)
  - [5. Build and Test](#5-build-and-test)
  - [6. Submit a Pull Request](#6-submit-a-pull-request)
- [Project Structure](#project-structure)
- [License](#license)

## About This Repository 🏠

This repository contains the VitePress project that powers [awaf.dev](https://awaf.dev) - the official documentation website for the Apex Well-Architected Framework.

The documentation covers:
- **Foundations**: Core principles like dependency injection, design patterns, and unit testing
- **AWAF Framework**: Detailed guidance on domain classes, trigger handlers, business logic, and architectural patterns
- **Practical Examples**: Real-world implementation patterns and best practices

## Understanding VitePress ⚡

**What is VitePress?** VitePress is a static site generator that turns Markdown files into a beautiful, fast documentation website. Think of it as a tool that reads your `.md` files and creates web pages automatically.

### How It Works
- **Markdown → Web Pages**: Each `.md` file becomes a page on the website
- **Folder Structure = Site Structure**: The folder organization directly maps to the website URLs
  - `foundations/unit-testing-apex.md` → `awaf.dev/foundations/unit-testing-apex`
  - `AWAF/trigger-handlers.md` → `awaf.dev/AWAF/trigger-handlers`
- **Automatic Navigation**: VitePress builds the sidebar and navigation based on your file structure
- **Hot Reload**: When you run `npm run dev`, changes to `.md` files instantly appear in your browser

### Adding New Content
- **New page**: Create a new `.md` file in the appropriate folder
- **New section**: Create a new folder with `.md` files inside
- **Edit existing**: Just modify the existing `.md` files using standard Markdown syntax

No HTML knowledge required! If you can write Markdown (like README files), you can contribute to AWAF documentation.

## Contributing 🤝

We welcome contributions to improve the AWAF documentation! Here's how to get started:

### 1. Fork the Repository 🍴

**What is forking?** Forking creates your own personal copy of this repository on GitHub. This copy is completely yours - you can make changes without affecting the original project.

1. **Fork on GitHub**: Go to the main repository page on GitHub and click the "Fork" button in the top-right corner
2. **This creates**: `https://github.com/YOUR_USERNAME/awaf.dev` (your personal copy)
3. **Clone your fork locally**:
   ```bash
   # Clone YOUR fork (not the original)
   git clone https://github.com/YOUR_USERNAME/awaf.dev.git
   cd awaf.dev
   ```

**Important**: You're now working on your personal copy. When you later create a Pull Request, GitHub will offer to merge your changes back into the original repository.

### 2. Install Dependencies 📦

```bash
npm install
```

### 3. Run Locally 🚀

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### 4. Make Changes ✏️

- **Add new sections**: Create new `.md` files in the appropriate directory (`foundations/` or `AWAF/`)
- **Edit existing content**: Modify the existing markdown files
- **Update structure**: Edit the VitePress configuration if needed

### 5. Build and Test 🔧

```bash
# Build the site to verify everything works
npm run build

# Preview the built site
npm run preview
```

### 6. Submit a Pull Request 📝

**What's a Pull Request?** A Pull Request (PR) is how you propose your changes from your fork back to the original repository. It's like saying "Hey, I made some improvements, would you like to include them?"

1. **Create a branch** for your changes:
   ```bash
   git checkout -b my-improvement-branch
   ```
2. **Make and commit** your changes with clear messages:
   ```bash
   git add .
   git commit -m "Add section about trigger best practices"
   ```
3. **Push to YOUR fork** (not the original):
   ```bash
   git push origin my-improvement-branch
   ```
4. **Create the PR**: Go to YOUR fork on GitHub (`https://github.com/YOUR_USERNAME/awaf.dev`) and click "Compare & pull request"
5. **GitHub will automatically propose** merging your changes into the original repository
6. **Describe your changes** and why they improve the documentation

The maintainers will review your PR and either merge it, request changes, or provide feedback.

## Project Structure 📁

```
awaf.dev/
├── foundations/          # Core development principles
├── AWAF/                # Framework-specific guidance  
├── public/              # Static assets
├── index.md             # Homepage content
├── introduction.md      # Getting started guide
└── package.json         # VitePress configuration
```

## License 📄

This documentation is open source and available under the MIT License.
