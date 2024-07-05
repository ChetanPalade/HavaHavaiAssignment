import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from "body-parser"
import { Airport } from './entity/Airport';

const app = express();  
const port = 5432 ;

createConnection().then(async connection => {
    app.get('/airport', async (req, res) => {
        const iataCode = req.query.iata_code as string;

        if (!iataCode) {
            return res.status(400).send({ error: 'iata_code is required' });
        }

        try {
            const airportRepository = connection.getRepository(Airport);
            const airport = await airportRepository.findOne({
                where: { iata_code: iataCode },
                relations: ['city', 'city.country']
            });

            if (!airport) {
                return res.status(404).send({ error: 'Airport not found' });
            }

            const response = {
                airport: {
                    id: airport.id,
                    icao_code: airport.icao_code,
                    iata_code: airport.iata_code,
                    name: airport.name,
                    type: airport.type,
                    latitude_deg: airport.latitude_deg,
                    longitude_deg: airport.longitude_deg,
                    elevation_ft: airport.elevation_ft,
                    address: {
                        city: {
                            id: airport.city.id,
                            name: airport.city.name,
                            country_id: airport.city.country.id,
                            is_active: airport.city.is_active,
                            lat: airport.city.lat,
                            long: airport.city.long,
                        },
                        country: {
                            id: airport.city.country.id,
                            name: airport.city.country.name,
                            country_code_two: airport.city.country.country_code_two,
                            country_code_three: airport.city.country.country_code_three,
                            mobile_code: airport.city.country.mobile_code,
                            continent_id: airport.city.country.continent_id
                        }
                    }
                }
            };

            res.json(response);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => console.log(error));
