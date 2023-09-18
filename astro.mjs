// astro.mjs

import julian from 'julian';
import vsop87Data from 'astronomia/data/index.js';

const getPlanetCoordinates = async (planet, date) => {
  const jd = julian.toJulianDay(date);

  try {
    if (!vsop87Data[planet]) {
      throw new Error(`Data not available for planet: ${planet}`);
    }

    const planetPosition = vsop87Data[planet].position(jd);

    const eclipticLongitude = planetPosition.lon;
    const eclipticLatitude = planetPosition.lat;

    return {
      eclipticLongitude,
      eclipticLatitude,
    };
  } catch (error) {
    console.error(`Error calculating position for ${planet}: ${error.message}`);
    return null;
  }
};

const calculateRealTimeCoordinates = async () => {
  const currentDate = new Date();
  const planetCoordinates = {};
  const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'
    // 'rahu', 'ketu'
  ];

  for (const planet of planets) {
    const planetData = await getPlanetCoordinates(planet, currentDate);
    if (planetData) {
      const coordinatesString = `${planetData.eclipticLongitude.toFixed(2)}°, ${planetData.eclipticLatitude.toFixed(2)}°`;
      planetCoordinates[planet] = coordinatesString;
    }
  }

  console.dir(planetCoordinates);
  return planetCoordinates;
};

export { calculateRealTimeCoordinates };
