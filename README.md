# potato-flickr-feed

To-Do:
* ~~Responsive re-structure of photo-listing meta data.~~
* ~~app.js: Make the routerProvider catchers safer and less explicit.~~
* ~~Create directive for photo-listing.~~
* ~~Cross-browser test.~~
    * ~~Firefox~~
    * ~~Chrome~~
    * ~~IE~~
    * ~~Safari~~
* ~~Tidy Angular file structure.~~
* ~Add explanatory comments.~
* ~Remove unnecessary commenting.~
* ~Go through CSS and remove what isn't a necessity - keep things simple for examination.~

## Build
The project was built in an environment using Bower, NPM, Grunt, LESS and Node JS.

With these installed, run:

```
npm install

grunt build

node node-app.js
```
This should build and run all the necessary dependencies. Happy to give an explanation as to what's going on in the grunt tasks if you wish. I frequently re-use tasks *wiredep* and *concat*, both save me a lot of time messing about with imports and / or concatenating files.

Branch "*prod_build*" contains all the files required to execute the application if you don't wish to go through the build processes.

## Implementing Load More Functionality

## Comments
### Using CSS Over JS For Listing Page Photo Information

### RemoveHTMLElementsByIndex Filter

### State Changes And Not URL Routing

### FlickrService Caching