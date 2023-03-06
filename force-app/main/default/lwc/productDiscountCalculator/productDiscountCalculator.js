import { LightningElement, track } from 'lwc';
import calculateDiscount from '@salesforce/apex/DiscountCalculator.calDiscount';

    export default class ProductDiscountCalculator extends LightningElement {
        @track price;
        @track discount;
        @track discountedPrice;

        handlePriceChange(event) {
            this.price = event.target.value;
        }

        handleDiscountChange(event) {
            this.discount = event.target.value;
        }

        calculateDiscount() {
            calculateDiscount({ price: this.price, discount: this.discount })
                .then(result => {
                    this.discountedPrice = result;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }