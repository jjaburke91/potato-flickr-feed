# potato-flickr-feed

This repo contains my solution to the flickr-feed task. I hope this displays my skill in Angular, HTML, CSS and general ability to construct and understand web applications.

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

## Comments
### Using CSS Over JS For Listing Page Photo Information
I generally prefer to use CSS for any stylistic changes when possible and so chose to duplicate DOM and use media queries to display the Author, Date and View link on the listing page. I like having all style and structural-behaviour code to be in one place.

Duplicating DOM is the disadvantage to this method, however given the duplicate DOM is only containing text, I find the disadvantage to be acceptable. If, however, the duplicate DOM was required to have an image of some sort, I would have used Javascript to restructure the DOM and so as not to duplicate an image request.


### RemoveHTMLElementsByIndex Filter

I created this filter to strip the first two `<p>` tags from every image description as each contained the image and a "*somebody* posted a photo" message.

I made it more re-usable than it needed to be but that isn't to say it's full-proof, it's still quite constrained. For instance, it'll only work given a DOM element without any attributes, but it tailors to my need.

### State Changes And Not URL Routing

I initially planned to routing include photo-information when a photo-page load was made, however I found the Flickr API doesn't have functionality to load an image by a unique identifier. As a result, the application works on states and shares the photo-to-view information through a service.

An alternative to my solution could be to pass photo information through a URL parameter and have the photo-page search through the Flickr feed until it's found, however I find that workflow to be inefficient and error-prone. For instance, if I were to bookmark a photo page's URL, then visit that URL a week later, the photo would be so old that the Flickr feed would likely no longer contain that image and hence not be found.

The current implementation has it's obvious problem that a photo-page can't be loaded at all without it being linked from the photo-listing page. Despite this, I prefer this error-free method as opposed to the previously mentioned alternative of which is not.

### FlickrService Caching

It's a slightly unnecessary function to have the Flickr feed cached however I liked the idea of it and chose to keep it. Caching the flickr feed means that whenever a user goes "back" from a photo-page, a new request will not be sent to Flickr for it's feed.

I hope implementing this caching displays a natural consideration for website performance.