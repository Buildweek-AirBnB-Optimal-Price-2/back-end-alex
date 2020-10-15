exports.seed = async function (knex) {
  await knex("airbnb_rental").insert([
    {
      country: "United States",
      city: "Hialeah",
      home_type: "house",
      rooms: 3,
      min_nights: 5,
      user_id: 1,
    },
    {
      country: "Japan",
      city: "Edogawa",
      home_type: "apartment",
      rooms: 1,
      min_nights: 7,
      user_id: 2,
    },
    {
      country: "UK",
      city: "England",
      home_type: "house",
      rooms: 5,
      min_nights: 3,
      user_id: 3,
    },
  ]);
};
