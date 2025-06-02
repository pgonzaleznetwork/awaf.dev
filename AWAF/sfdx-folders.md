## Use SFDX Folders

You should use Salesforce DX folders to organise your code into features, use cases and business units. At the time of this writing, Salesforce DX has been in place for years and there’s no excuse anymore not to make the most out of it. Gone are the days of ANT and the Force.com IDE, with outdated Metadata API format.

Teams should be using the Salesforce DX source format, as seen below

![Custom SFDX Folders](/public/custom-dx-folders.png)



The source format allows for the creation of custom folders. Your team should make an effort to organise metadata in folders that make the architecture of your org very clear. Here’s an example of what such project could look like

![SFDX Folders](/public/dx-folders.png)

Notice how under `force-app/main`, we have a `customer_support` folder. Here, we can see different use cases for that business unit, such as logic and custom fields related to case closure or calculating SLAs.

This is an example of what’s known as a [screaming architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html). The architecture is "screaming" at you, telling you exactly what it does. This term originates from Robert C. Martin’s Clean Architecture, and it reflects an architecture where structure and intent are immediately obvious to anyone looking at the codebase.

Before Salesforce DX, it made sense to encapsulate all these use cases in a single class like `CasesService`, as FFLIB would dictate. This was necessary because there was no other way to organize units of logic while keeping them close to each other (cohesion). But with the advent of Salesforce DX folders, this is no longer needed, and we now consider it an anti-pattern.

**A codebase using AWAF uses Salesforce DX source folders to represent the architecture of the org.**

---

If you are still using outdated patterns to prefix Apex classes such as `Oppty_Recalculation` or `Lead_Service`, you can use the [dxfolders CLI plugin](https://github.com/pgonzaleznetwork/dxfolders?tab=readme-ov-file#dxfoldersarrange-your-apex-classes-based-on-their-prefix) to automatically create SFDX folders based on those prefixes. 
