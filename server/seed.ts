import prisma from './src/utils/prisma';

async function seedAirports() {
  const airports = [
    {
      AirportCode: 'SGN',
      AirportName: 'Tan Son Nhat International Airport',
      Location: 'Ho Chi Minh City, Vietnam',
      Facilities: 'Duty-free shops, Lounges, Restaurants, Free WiFi',
    },
    {
      AirportCode: 'DAD',
      AirportName: 'Da Nang International Airport',
      Location: 'Da Nang, Vietnam',
      Facilities: 'Free WiFi, Lounges, Car Rental Services',
    },
    {
      AirportCode: 'CXR',
      AirportName: 'Cam Ranh International Airport',
      Location: 'Nha Trang, Vietnam',
      Facilities: 'Restaurants, Shopping, Free WiFi',
    },
    {
      AirportCode: 'UIH',
      AirportName: 'Phu Cat Airport',
      Location: 'Quy Nhon, Vietnam',
      Facilities: 'Basic amenities, Restaurants',
    },
    {
      AirportCode: 'VCA',
      AirportName: 'Can Tho International Airport',
      Location: 'Can Tho, Vietnam',
      Facilities: 'Free WiFi, Restaurants, Lounges',
    },
    {
      AirportCode: 'HUI',
      AirportName: 'Phu Bai International Airport',
      Location: 'Hue, Vietnam',
      Facilities: 'Restaurants, Car Parking',
    },
    {
      AirportCode: 'DIN',
      AirportName: 'Dien Bien Phu Airport',
      Location: 'Dien Bien Phu, Vietnam',
      Facilities: 'Basic amenities',
    },
    {
      AirportCode: 'PQC',
      AirportName: 'Phu Quoc International Airport',
      Location: 'Phu Quoc, Vietnam',
      Facilities: 'Duty-free shops, Restaurants, Lounges',
    },
  ];

  for (const airport of airports) {
    await prisma.airport.create({
      data: airport,
    });
  }

  console.log('Seeding completed!');
}

seedAirports()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
