"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SlotChecking {
    constructor() {
        //converting time to number for checking
        this.timeToNumber = (time) => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours) * 100 + parseInt(minutes);
        };
    }
    slotAvailabilty(startingTime, endingTime, seat, bookings) {
        return __awaiter(this, void 0, void 0, function* () {
            // const startingTime = '13:15';
            // const endingTime = '15:00'
            //the bookings on the same date
            // times = [
            //     {startingTime : '15:00',
            //         endingTime : '18:00'
            //     },
            //     {startingTime : '15:00',
            //         endingTime : '18:00'
            //     },
            //     {startingTime : '15:00',
            //         endingTime : '18:00'
            //     },
            // ]
            //toatal seats in the parlour
            let totalSeats = seat;
            let count = 0;
            for (let booking of bookings) {
                if (this.timeColideCheck(booking.startingTime, booking.endingTime, startingTime, endingTime)) {
                    count++;
                }
            }
            console.log('bookings', count);
            //checking seat is available
            function checkSeatAvailable(totalSeats, count) {
                if (count >= totalSeats) {
                    // console.log('No seat available')
                    return false;
                }
                else {
                    // console.log('seat No',count+1)
                    return count + 1;
                }
            }
            return checkSeatAvailable(totalSeats, count);
        });
    }
    //time intersection checking
    timeColideCheck(timeToCheck1, timeToCheck2, startingTime, endingTime) {
        return ((this.timeToNumber(timeToCheck1) <= this.timeToNumber(endingTime) &&
            this.timeToNumber(timeToCheck1) >= this.timeToNumber(startingTime)) ||
            (this.timeToNumber(timeToCheck2) <= this.timeToNumber(endingTime) &&
                this.timeToNumber(timeToCheck2) >= this.timeToNumber(startingTime)));
    }
}
exports.default = SlotChecking;
