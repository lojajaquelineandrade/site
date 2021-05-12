# Site
[Rothbard Institute Brazil](https://rothbardbrasil.com/) web site

# Info
This project is the beginning of port the institute site to github.
This is an initial draft, as the project evolute, contributors should change it.

The institute basically has two types of information in your web site:
 - The authors articles, images and some biography information.
 - User defined information like comments, images and some personal info.

The authors information is extremely important and the reason of the existence of the institute.
We want in this project to store this information in the folders under git versioning, keep folder for every language and static build the site with this informations. We believe that this approach can be very benefical to very fast page load speed, translators and authors contributing to project even without technical skills, [SEO](https://neilpatel.com/what-is-seo/), and templates be separate of the logic and authors information helping designers and ui contributors to help in the project. 
For a very beautiful example of this type of collaboration, check:
 - [Mozilla MDN site](https://developer.mozilla.org/en-US/)
 - [the content repository](https://github.com/mdn/content)
 - [the static builder tool](https://github.com/mdn/yari)

where the site is the final result, the content repository basically is the work of translators and content authors, and the static builder tool is the work of developers and designers, the result is a very fast site with all the content being protected under git versioning.

The [Mozilla MDN site](https://developer.mozilla.org/en-US/) does not is open for user profile or comments, this is not our case. Altough this in information is not as crucial to be protected under git versioning, it is an important part of the user experience in the site. We also want to have the option to host site in github pages. So for users information we gonna use a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) and connect with the static site with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests, and use client javascript to display the results. This approach will make that user info be outside [SEO](https://neilpatel.com/what-is-seo/), and posts pages could be cached by the browser without problems for user experience even after a comment by the user.  

# The Project
The project will be divided in three folders that in the future may be separated in different repositories:

## The Content Folder
This is the folder that will store authors information, images and posts.
This folder also will be divided by languages.
It will only store static files, and only use HTML for posts and informations.
This will be where non technical contributors will work in translations, content production and historical research.

## The Static Builder Folder
This folder will contain:
 - the HTML templates write in [Mustache](https://mustache.github.io/), and the css design of the site.
 - scripts to import the old database content to the content folder.
 - the static builder, the tool that will render the templates with the content and generate the static site.

The choice of [Mustache template engine](https://mustache.github.io/) is for better cooperation with designer without knowledge in javascript.
The scripts and the static builder will be write in javascript to be accessible for as many contributors as possible.
We will use [DENO](https://deno.land/) as the javascript runtime instead of nodejs, because it has no package manager, it has an easier setup for non technical contributors.

## The REST API
This folder will be the home of the rest api, where will work backend developers.
It will be write using javascript, with [DENO](https://deno.land/), to keep the same choices as before.
The [API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) should be handle with all user interaction:
 - Authentication
 - Image upload
 - Comments and personal information

The [API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) should be [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled, to allow site communication with the [API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) even if the site will be hosted in github pages.
We will use sqlite database to store users information, for it simplicity in setup. The site has no need for scalability in database.
