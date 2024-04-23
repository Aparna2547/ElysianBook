import schedule from "node-schedule"

class scheduleBooking{
    constructor(){

    }

     SchedulingTask():void{
        const date = new Date()
        console.log(date);
        console.log(`0 25 16 ${date.getDate()} ${date.getMonth()+1} `);
        
        
        schedule.scheduleJob(`0 26 16 ${date.getDate()} ${date.getMonth()+1} *`, async () =>{
            console.log('node schedular testing');
            
            
        })
    }

}

export default scheduleBooking