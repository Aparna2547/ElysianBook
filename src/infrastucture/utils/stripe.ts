import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)


class StripePayment{

    async makePayment(totalPrice:number){

        let line_items = [
            {
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:"test"
                    },
                    unit_amount : totalPrice*100
                },
                quantity:1
            }
        ]
        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:5000/bookingSuccessful',
            cancel_url : 'https://example.com/cancel',
            line_items:line_items,  
            mode: 'payment',
          billing_address_collection:'required'
          });

          return session.id;
    }

    //for refund
   async  refundPayment(paymentId:string) {
    // try {
    //    const refund = await stripe.refunds.create({
    //      charge: chargeId,
    //    });
   
    //    console.log('Refund created:', refund.id);
    // } catch (error) {
    //    console.error('Error creating refund:', error);
    // }
    try {
        const paymentIntentResponse = await stripe.paymentIntents.retrieve(paymentId);
        console.log('hqi',paymentIntentResponse.latest_charge)
        const chargeId = paymentIntentResponse.latest_charge
               const refund = await stripe.refunds.create({
                 charge: chargeId as string,
               });
           
               console.log('Refund created:', refund.id);
               return refund
            } catch (error) {
               console.error('Error creating refund:', error);
        }
        
   }
   
    
}

export default StripePayment