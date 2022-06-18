# Tailwind css with dot net core
Form and function are essential elements of a successful application, each playing a role in delivering our end users’ experience. The mastery of both is challenging in an exploding web landscape. For ASP.NET Core developers, web design might not rank high at the top of our skillset. In the years since the web has become what we know it today, many of us have adopted CSS libraries and toolkits to accelerate our design productivity. The most popular for ASP.NET developers being Bootstrap, as it ships with the default application templates.

This post will see how to integrate an up-and-coming utility-first CSS library called Tailwind CSS and how to start utilizing it in our ASP.NET Core applications.

# Installation
1. Create dot net core Web app (MVC) with dot net 6.
2. Goto ```wwwroot/lib``` delete bootstrap.
3. Goto ```wwwroot/css``` create two css files ```input.css`` and ```output.css``` in css folder.
4. Right click on project click on ```open in terminal```.
5. Run command ```npm init -y```. It will create ```package.json``` and ```package-lock.json```.
6. Add required modules ```cross-env```, ```autoprefixer```, ```postcss```, ```postcss-cli```, ```tailwindcss```, ```tailwindcss-textshadow```, ```cssnano``` by running the following command.
```
npm install -D cross-env@latest autoprefixer@latest postcss@latest postcss-cli@latest tailwindcss@latest tailwindcss-textshadow@latest cssnano@latest
```
7. After successfully run above command you will see
``` json
"devDependencies": {
    "autoprefixer": "^10.4.7",
    "cross-env": "^7.0.3",
    "cssnano": "^5.1.12",
    "postcss": "^8.4.14",
    "postcss-cli": "^9.1.0",
    "tailwindcss": "^3.1.3",
    "tailwindcss-textshadow": "^2.1.3"
  }
``` 
etc. in ```package.json```

8. Create a ```tailwind.config.js``` file by running 
```npx tailwindcss init```
9. Create a file ```postcss.config.js``` by manually adding into the root of project.
10. Copy below code and paste into ```postcss.config.js``` file
``` js
 module.exports = ({ env }) => ({
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        cssnano: env === "production" ? { preset: "default" } : false
    }
});
```
11. Copy code and paste into ```tailwind.config.js```
``` js
const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    content: [
        './Views/**/*.cshtml'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cyan: colors.cyan
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-textshadow')
    ]
}
```
12. Goto ```package.json``` file replace ```scripts``` section by
``` json
"scripts": {
    "buildcss:dev": "cross-env TAILWIND_MODE=build npx tailwind build -i ./wwwroot/css/input.css -o ./wwwroot/css/output.css",
    "buildcss:release": "cross-env NODE_ENV=production npx tailwind build -i ./wwwroot/css/input.css -o ./wwwroot/css/output.css"
  }
```
13. Goto ```wwwroot/css/input.css``` file and replace all code by below code
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
14. Right click on project goto ```edit project file``` and replace all code with
``` c#
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <Target Name="CheckForNpm" BeforeTargets="NpmInstall">
    <Exec Command="npm -v" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
    <Error Condition="'$(ErrorCode)' != '0'" Text="You must install NPM to build this project" />
  </Target>

  <Target Name="NpmInstall" BeforeTargets="BuildCSS" Inputs="package.json" Outputs="$(NpmLastInstall)">
    <Exec Command="npm install" />
    <Touch Files="$(NpmLastInstall)" AlwaysCreate="true" />
  </Target>

  <Target Name="BuildCSS" BeforeTargets="Compile">
    <Exec Command="npm run buildcss:dev" Condition=" '$(Configuration)' == 'Debug' " />
    <Exec Command="npm run buildcss:release" Condition=" '$(Configuration)' == 'Release' " />
  </Target>

</Project>
```
15. Goto ```Views/Layout/Layout.cshtml``` and replace all code by
``` html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - MVC.Tailwind</title>
    <link rel="stylesheet" href="~/css/output.css" />
</head>
<body>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="relative z-10 pb-8 bg-white">
                <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="50,0 100,0 50,100 0,100" />
                </svg>

                <div>
                    <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
                        <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                            <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                <div class="flex items-center justify-between w-full md:w-auto">
                                    <a href="#">
                                        <span class="sr-only">Workflow</span>
                                        <img alt="Workflow" class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg">
                                    </a>
                                    <div class="-mr-2 flex items-center md:hidden">
                                        <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                                            <span class="sr-only">Open main menu</span>
                                            <!-- Heroicon name: outline/menu -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                <a href="#" class="font-medium text-gray-500 hover:text-gray-900">Product</a>

                                <a href="#" class="font-medium text-gray-500 hover:text-gray-900">Features</a>

                                <a href="#" class="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>

                                <a href="#" class="font-medium text-gray-500 hover:text-gray-900">Company</a>

                                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>
                            </div>
                        </nav>
                    </div>

                    <!--
                      Mobile menu, show/hide based on menu open state.

                      Entering: "duration-150 ease-out"
                        From: "opacity-0 scale-95"
                        To: "opacity-100 scale-100"
                      Leaving: "duration-100 ease-in"
                        From: "opacity-100 scale-100"
                        To: "opacity-0 scale-95"
                    -->
                    <div class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div class="px-5 pt-4 flex items-center justify-between">
                                <div>
                                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="">
                                </div>
                                <div class="-mr-2">
                                    <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span class="sr-only">Close main menu</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="px-2 pt-2 pb-3 space-y-1">
                                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Product</a>

                                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>

                                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Marketplace</a>

                                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a>
                            </div>
                            <a href="#" class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"> Log in </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
         <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    </div>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```
16. Right click on project and ```rebuild``` the project
17. In ```wwwroot/css/output.css```, you will see some css code automatically added by ```tailwindcss```
18. Run project and clear browser cache if not works(optional)

# Technology
1. C#
2. Net 6

# Author
* Facebook - [Kanhaya Tyagi](https://www.facebook.com/kanhaiyatyagi63/)
* StackOverFlow - [Kanhaya Tyagi](https://stackoverflow.com/users/14945515/kanhaya-tyagi)
* LinkedIn - [Kanhaya Tyagi](https://www.linkedin.com/in/kanhaya-tyagi-510b55141/)
* Twitter - [Kanhaya Tyagi](https://www.twitter.com/kanhaiyatyagi63/)
* Bit Bucket - [Kanhaya Tyagi](https://bitbucket.org/kanhaiyatyagi63/)


# Licence

MVC.Tailwind under the [MIT](https://github.com/kanhaiyatyagi63/MVC.Tailwind/blob/master/LICENSE.md)
