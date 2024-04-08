# Gimy Clone Website

## Introduction
This is a website to imitate a [real live-streaming media website](https://gimy.ai).

The user can find different film in here, and it will insert the ad in website and film.

Furthermore, It made by Next.js and using Tailwind css and deploy by docker.

Fetch the data by [backend project](https://github.com/weiawesome/gimy_clone_api) to get the media and data.
## Main Function
### For User
1. Browse the film classify by film type
2. Filter and sort the film by category, location and release year
3. Obtain the rank of the film by film type or category
4. Search films by title, content or celebrity's name
5. Watch the film by different routes and view by http-live-streaming

### For Resource Provider
1. Create a new film with specific information
2. Upload film's episode or image
3. Let the film into search engine

### For Sponsor ( Advertisement )
1. Give different type of advertisement
   1. The ad is a film insert into the film's play
   2. The ad is a GIF manifest in the website
   3. The ad is a static image file in the website
2. Check the advertisement period

## User Interface ( RWD )
### Home Page
![home_page.png](assets/home_page.png)
### Different Type Page 
![tv-series.png](assets/tv-series.png)
![animate.png](assets/animate.png)
![movie.png](assets/movie.png)
![variety-show.png](assets/variety-show.png)
### Filter and Sort Page
![filter.png](assets/filter.png)
### Ranking Page
![rankings.png](assets/rankings.png)
### Film Information Page
![film_information.png](assets/film_information.png)
![film_information_little.png](assets/film_informaation_little.png)
### Search Page
![search_by_content.png](assets/search_by_content.png)
![search.png](assets/search.png)

### Create Film Page
![create_film.png](assets/create_film.png)
### Upload Film's resource Page
![upload_film_information.png](assets/upload_film_information.png)
### Deliver the advertisement Page
![deliver_advertisement.png](assets/deliver_ad.png)

## System Architecture
### MVC ( Model-View-Controller )
```
├── src
│   ├── app
│   │   ├── app.tsx
│   │   ├── layout.tsx
│
│   ├── pages
│   │   ├── upload
│   │   │   ├── ...tsx
│   │   ├── resource
│   │   │   ├── ...tsx
│
│   ├── components
│   │   ├── ...tsx
│
│   ├── model
│   │   ├── ...ts
│
│   ├── service
│   │   ├── ...ts
│
│   ├── svgs
```
### [Model](./src/model)
It defined the model of different request and response. 

### [View](./src/pages)
It builds the all the view in the website.

### [Controller](./src/service)
It made all the request in here.

```
Note :
    Except the MVC Architecture, it also make the components directory to correspond react design.
```