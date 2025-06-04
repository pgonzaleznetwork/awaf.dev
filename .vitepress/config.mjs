import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "awaf",
  description: "The Apex Well-Architected Framework",
  appearance: false,
  head: [
    [
      'link',
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;500;600;700&display=swap' }
    ],
    ['link', { rel: 'icon', href: '/fav_icon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/awaf-logo.svg',
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
        text: 'The Framework',
        items: [
          { text: 'Background', link: '/AWAF/background' },
          { text: 'The challenges of FFLIB', link: '/AWAF/fflib-recap' },
          { text: 'The Apex Well-Architected Framework', link: '/AWAF/awaf' },
          {text:' Use SFDX folders', link: '/AWAF/sfdx-folders'},
          {text:'Where to place business logic', link: '/AWAF/business-logic'},
          {text:'Filtering logic in trigger handlers', link: '/AWAF/trigger-handlers'},
          {text:'Domain Classes', link: '/AWAF/domain-classes'},
          {text:'Internal Libraries', link: '/AWAF/internal-libraries'},
          {text:'Trigger Frameworks', link: '/AWAF/trigger-frameworks'},
          {text:'Logging and Observability', link: '/AWAF/logging'},
          {text:'Feature Flags', link: '/AWAF/feature-flags'},
          {text:'Selector Classes', link: '/AWAF/selector-classes'},
          {text:'General Utilities', link: '/AWAF/general-utilities'},
          {text:'Deploying Apex Code', link: '/AWAF/deploying-apex'}

        ]
      },
      {
        text: 'Supporting Principles',
        items: [
          { text: 'Other Principles', link: '/foundations/overview' },
          { text: 'Naming Techniques', link: '/foundations/naming-techniques' },
          { text: 'Doing one thing', link: '/foundations/single-responsibility' },
          { text: 'Short Methods and Deep Modules', link: '/foundations/method-size-structure' },
          { text: 'Comments Don\'t Lie', link: '/foundations/comments-truth' },
          { text: 'Nulls & Guard Clauses', link: '/foundations/nulls-guard-clauses' },
          { text: 'Cascading Failures in Trigger Boundaries', link: '/foundations/trigger-failures' },
          { text: 'Software Design Principles', link: '/foundations/design-principles' },
          { text: 'Modularity, Coupling & Cohesion', link: '/foundations/modularity-cohesion' },
          { text: 'Dependency Injection and Boundaries', link: '/foundations/dependency-injection' },
          { text: 'Mocking the database for real CI', link: '/foundations/unit-testing-apex' }
        ]
      }
    ]
  }
})
