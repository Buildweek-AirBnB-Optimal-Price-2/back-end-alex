# back-end-alex

# Registration/Login pages

# GET REQUEST

# https://airbnb-listing.herokuapp.com/api/users/

# Provides a list of the users (Need to be logged in to receive the list)

# https://airbnb-listing.herokuapp.com/api/users/:id

# Provides a specific user by their ID

# https://airbnb-listing.herokuapp.com/api/users/:id/housing

# grabs a single home by the housing id

# POST REQUEST

# https://airbnb-listing.herokuapp.com/api/users/register - requires a unique username, and a password

# https://airbnb-listing.herokuapp.com/api/users/login - you'll be able to login with the username and password and then receive the token

# https://airbnb-listing.herokuapp.com/api/users/:id/housing - adds a house to the users with that specific ID

# REQUIRES: country, city, home_type, rooms (int), min_nights (int)

# Airbnb hostpage

# GET REQUEST

# https://airbnb-listing.herokuapp.com/api/airbnb/

# Gets a list of the airbnb lines

# https://airbnb-listing.herokuapp.com/api/airbnb/:id

# Gets a specific home by it's id

# PUT REQUEST

# https://airbnb-listing.herokuapp.com/api/airbnb/:id

# Gets the home by it's id and then lets you edit its features

# DELETE REQUEST

# https://airbnb-listing.herokuapp.com/api/airbnb/:id

# Deletes the listing by it's id
