CREATE TABLE Country (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_code_two CHAR(2),
    country_code_three CHAR(3),
    mobile_code INT,
    continent_id INT
);

CREATE TABLE City (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id INT,
    is_active BOOLEAN,
    lat DECIMAL,
    long DECIMAL,
    FOREIGN KEY (country_id) REFERENCES Country(id)
);

CREATE TABLE Airport (
    id SERIAL PRIMARY KEY,
    icao_code VARCHAR(4),
    iata_code VARCHAR(3),
    name VARCHAR(255),
    type VARCHAR(50),
    latitude_deg DECIMAL,
    longitude_deg DECIMAL,
    elevation_ft INT,
    city_id INT,
    FOREIGN KEY (city_id) REFERENCES City(id)
);
