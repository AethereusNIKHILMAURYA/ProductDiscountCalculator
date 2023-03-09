import { LightningElement, wire } from 'lwc';
import getParentChildList from '@salesforce/apex/ParentChildController.getParentChildList';

export default class ParentChildList extends LightningElement {
    parentChildList;

    @wire(getParentChildList)
    wiredParentChildList({ error, data }) {
        if (data) {
            this.parentChildList = data;
        } else if (error) {
            console.log(error);
        }
    }
}
