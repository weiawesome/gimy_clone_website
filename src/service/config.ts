const BASE_URL = process.env.API_URL || "http://localhost";
const BASE_SERVICE_URL = process.env.SERVICE_URL || "http://localhost";
export const config={
    "SERVICE_URL": BASE_URL+"/api/v1",
    "API_SERVICE_URL": BASE_SERVICE_URL+"/api/v1",
    "ROUTE_POPULAR_TYPE":"/affair/popular/type/",
    "ROUTE_POPULAR_CATEGORY":"/affair/popular/category/",
    "ROUTE_INFORMATION":"/affair/film_information/",
    "ROUTE_ROUTES_INFORMATION":"/affair/film_information/routes/",
    "ROUTE_MEDIA_LIST":"/resource/media_list/",
    "ROUTE_RANKED":"/affair/ranked/",
    "ROUTE_CELEBRITY_SEARCH":"/affair/search/celebrity",
    "ROUTE_CONTENT_SEARCH":"/affair/search/content",
    "PAGE_SIZE":30,
    "ROUTE_FILTER":"/affair/filter/",
    "ROUTE_AD":"/affair/ad/",
    "ROUTE_BASIC":"/affair",
    "ROUTE_UPLOAD_AD":"/upload/ad",
    "ROUTE_CREATE_FILM":"/upload/media",
    "ROUTE_UPLOAD_FILM_IMAGE":"/upload/media/image/",
    "ROUTE_UPLOAD_FILM_RESOURCE":"/upload/media/resource/",
    "ROUTE_UPLOAD_SEARCH_ENGINE":"/upload/media/search_engine/",
}
