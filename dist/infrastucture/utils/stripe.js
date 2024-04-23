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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class StripePayment {
    makePayment(totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            let line_items = [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: "test"
                        },
                        unit_amount: totalPrice * 100
                    },
                    quantity: 1
                }
            ];
            const session = yield stripe.checkout.sessions.create({
                success_url: 'http://localhost:5000/bookingSuccessful',
                cancel_url: 'https://example.com/cancel',
                line_items: line_items,
                mode: 'payment',
                billing_address_collection: 'required'
            });
            return session.id;
        });
    }
    //for refund
    refundPayment(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //    const refund = await stripe.refunds.create({
            //      charge: chargeId,
            //    });
            //    console.log('Refund created:', refund.id);
            // } catch (error) {
            //    console.error('Error creating refund:', error);
            // }
            try {
                const paymentIntentResponse = yield stripe.paymentIntents.retrieve(paymentId);
                console.log('hqi', paymentIntentResponse.latest_charge);
                const chargeId = paymentIntentResponse.latest_charge;
                const refund = yield stripe.refunds.create({
                    charge: chargeId,
                });
                console.log('Refund created:', refund.id);
                return refund;
            }
            catch (error) {
                console.error('Error creating refund:', error);
            }
        });
    }
}
exports.default = StripePayment;
