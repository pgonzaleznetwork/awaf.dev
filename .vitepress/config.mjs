import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "awaf",
  description: "The Apex Well-Architected Framework",
  head: [
    [
      'link',
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;500;600;700&display=swap' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'About', link: '/about' }
        ]
      },
      {
        text: 'Foundations',
        items: [
          { text: 'Overview', link: '/foundations/overview' },
          { text: 'Naming Techniques', link: '/foundations/naming-techniques' },
          { text: 'Single Responsibility', link: '/foundations/single-responsibility' },
          { text: 'Method Size & Structure', link: '/foundations/method-size-structure' },
          { text: 'Comments & Truth', link: '/foundations/comments-truth' },
          { text: 'Nulls & Guard Clauses', link: '/foundations/nulls-guard-clauses' },
          { text: 'Trigger Failures', link: '/foundations/trigger-failures' },
          { text: 'OOP in Apex', link: '/foundations/oop-in-apex' },
          { text: 'Design Principles', link: '/foundations/design-principles' },
          { text: 'Modularity & Cohesion', link: '/foundations/modularity-cohesion' },
          { text: 'Dependency Injection', link: '/foundations/dependency-injection' },
          { text: 'Unit Testing in Apex', link: '/foundations/unit-testing-apex' }
        ]
      },
      {
        text: 'The Framework',
        items: [
          { text: 'Background', link: '/AWAF/background' },
          { text: 'FFLIB Recap', link: '/AWAF/fflib-recap' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
