-- Custom SQL migration file, put you code below! --
COPY hotel(id,name,description,location,star_rating,rate,featured_image)
FROM '/data/hotel-data.csv'
DELIMITER ','
CSV HEADER;