# GULP
What does this Gulp file do?

+ Compile SCSS (Sass)
+ Optimize images and convert them to the "webp" and "avif" formats
+ Set up a development server
+ Convert fonts to the "woff" and "woff2" formats
+ Combine SVG files into one SVG sprite
+ Generate prefixes for new styles or to support older version browsers
+ Minifying css and js files

How use:  
!!!Node.js must be installed on your computer!!!

1. Download all files from these repositories into the folder where the new project will be.
Open terminal in this folder and write comand:  
`npm i`

Gulp downloads all the necessary files required for the project to function.

2.For starting the development, in the terminal, write the command:  
`gulp`  
Afterward, Gulp starts working and automatically opens a web page in your browser.

You can write your code in files:  
scss: *your-project*/app/scss/style.scss  
js:   *your-project*/app/js/main.js  
html: *your-project*/app/index.html 
if you need create another html-pages, create it in folder *your-project*/app  
images: put your images in folder *your-project*/app/images/src  
fonts:  put your fonts in folder *your-project*/app/fonts/src  

3.After finishing development, create an SVG sprite and make the necessary changes to your HTML and SCSS files:  
`gulp sprite`
  
4.Afterward, end the project by command.  
`gulp build`  
In folder *your-project*/dist will all files of your project
