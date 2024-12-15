/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Flight" (
    "FlightID" SERIAL NOT NULL,
    "FlightNumber" TEXT NOT NULL,
    "DepartureDateTime" TIMESTAMP(3) NOT NULL,
    "ArrivalDateTime" TIMESTAMP(3) NOT NULL,
    "OriginAirportCode" TEXT NOT NULL,
    "DestinationAirportCode" TEXT NOT NULL,
    "AvailableSeats" INTEGER NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("FlightID")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "PassengerID" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PassportNumber" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "PhoneNumber" TEXT,
    "DateOfBirth" TIMESTAMP(3),

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("PassengerID")
);

-- CreateTable
CREATE TABLE "Airport" (
    "AirportCode" TEXT NOT NULL,
    "AirportName" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Facilities" TEXT,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("AirportCode")
);

-- CreateTable
CREATE TABLE "Airline" (
    "AirlineID" SERIAL NOT NULL,
    "AirlineName" TEXT NOT NULL,
    "ContactNumber" TEXT NOT NULL,
    "OperatingRegion" TEXT NOT NULL,

    CONSTRAINT "Airline_pkey" PRIMARY KEY ("AirlineID")
);

-- CreateTable
CREATE TABLE "Booking" (
    "BookingID" SERIAL NOT NULL,
    "FlightID" INTEGER NOT NULL,
    "PassengerID" INTEGER NOT NULL,
    "PaymentStatus" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("BookingID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flight_FlightNumber_key" ON "Flight"("FlightNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_Email_key" ON "Passenger"("Email");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_OriginAirportCode_fkey" FOREIGN KEY ("OriginAirportCode") REFERENCES "Airport"("AirportCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_DestinationAirportCode_fkey" FOREIGN KEY ("DestinationAirportCode") REFERENCES "Airport"("AirportCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_FlightID_fkey" FOREIGN KEY ("FlightID") REFERENCES "Flight"("FlightID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_PassengerID_fkey" FOREIGN KEY ("PassengerID") REFERENCES "Passenger"("PassengerID") ON DELETE RESTRICT ON UPDATE CASCADE;
