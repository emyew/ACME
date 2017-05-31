# Milestone 14
## Features
### Explore
Users can discover other lists of trips near them on the "Explore" page, allowing them to easily see what other users are creating and find trips that interest them. Users can search and filter through the lists. They can also favorite these lists and easily refer back to them later in their profile pages.

### Create
Users can easily create new lists and add/remove destinations to/from their lists. Users can drag and reorder the destinations and the autocomplete feature in the add search bar allows users to easily find what the place they are looking for. They can see where each location is placed on the map and see a path connecting those destinations, as well as directions from one place to the next. There is also a feature where they can see the total trip duration and distance.

### Profile (My Lists + Favorites)
Users have their own profiles where they can see all the lists they have created and the lists they have favorited. It allows them to easily refer back to the ones they found interesting and would like to check out.

When viewing a specific list, users can choose to start from their current location (ie. if they were going to travel there that day from their apartment) or to start from the first location on the list. If it is their own created list, they can easily edit that list and add or remove destinations from that trip and save those changes if they choose to do so.

<hr>

### Emily
I worked on designing the UI for the Explore page and making sure the whole app was responsive on mobile. I also implemented the pagination and filtering/search functionality on the Explore page. I helped implement the Edit page and also fixed numerous UI bugs that came up when we added other functionality to the app. For the Profile page, I worked on conditionally showing the forms for each user. I also redesigned the navbar, so that more user-related features were on one side and general features were on the other.

### Christy
I worked on calculating and displaying the total duration and distance for each trip. I added validity checks for create and edit when adding new waypoints, so it can't add more than 22 waypoints (max limit with the API is 23 but for us, one was for the current location if users chose to select that option) and for invalid addresses. I also helped implement the edit list functionality and styling (displaying the path on the map and adding new waypoints).

### Mohsin
I designed and implemented the landing page. I also worked on fixing various UI bugs with responsiveness and content styling.

### Arlen
