-- CreateTable
CREATE TABLE "Seat" (
    "SeatID" SERIAL NOT NULL,
    "SeatNumber" TEXT NOT NULL,
    "IsBooked" BOOLEAN NOT NULL DEFAULT false,
    "FlightID" INTEGER NOT NULL,
    "BookingID" INTEGER,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("SeatID")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_BookingID_fkey" FOREIGN KEY ("BookingID") REFERENCES "Booking"("BookingID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_FlightID_fkey" FOREIGN KEY ("FlightID") REFERENCES "Flight"("FlightID") ON DELETE RESTRICT ON UPDATE CASCADE;
