import Bookings from "../../domain_entites/booking";

class SlotChecking{


     //converting time to number for checking
      timeToNumber = (time:string) => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours) * 100 + parseInt(minutes);
  };

    async slotAvailabilty(startingTime:string,endingTime:string,seat:number,bookings:Bookings[]) {
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
        let totalSeats = seat
        
        let count = 0

        for(let booking of bookings){
            if(this.timeColideCheck(booking.startingTime,booking.endingTime,startingTime,endingTime)){
                count++
            }
        }
        console.log('bookings',count)
        
        //checking seat is available
        function checkSeatAvailable(totalSeats:number,count:number){
            if(count >= totalSeats){
                // console.log('No seat available')
                return false
            }
            else{
                // console.log('seat No',count+1)
                return count+1
            }
        }
        
       return checkSeatAvailable(totalSeats,count)
        
        
        
       
    }


     //time intersection checking
      timeColideCheck(timeToCheck1:string,timeToCheck2:string,startingTime:string,endingTime:string){
        return ((this.timeToNumber(timeToCheck1) <= this.timeToNumber(endingTime) &&
                this.timeToNumber(timeToCheck1) >= this.timeToNumber(startingTime)) ||
                (this.timeToNumber(timeToCheck2) <= this.timeToNumber(endingTime) &&
                this.timeToNumber(timeToCheck2) >= this.timeToNumber(startingTime))
        )
    }
}
export default SlotChecking