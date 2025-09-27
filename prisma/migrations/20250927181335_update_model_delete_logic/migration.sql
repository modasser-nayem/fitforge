-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_userId_fkey";

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
