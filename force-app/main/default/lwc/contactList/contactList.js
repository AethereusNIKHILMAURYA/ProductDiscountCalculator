import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactListController.getContacts';
import { NavigationMixin } from 'lightning/navigation';

export default class ContactList extends NavigationMixin(LightningElement) {
    @track contacts;
    @track pageNumber = 1;
    @track disableFirstButton = true;
    @track disablePreviousButton = true;
    @track disableNextButton = false;
    @track disableLastButton = false;
    @track searchTerm = '';

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.pageNumber = 1;
        this.getContacts();
    }

    @wire(getContacts, { pageNumber: '$pageNumber', searchTerm: '$searchTerm' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.disableFirstButton = this.pageNumber === 1;
            this.disablePreviousButton = this.pageNumber === 1;
            this.disableNextButton = data.length < 10;
            this.disableLastButton = data.length < 10;
        } else if (error) {
            console.error(error);
        }
    }


    handleFirst() {
        this.pageNumber = 1;
        this.getContacts();
    }

    handlePrevious() {
        this.pageNumber--;
        this.getContacts();
    }

    handleNext() {
        this.pageNumber++;
        this.getContacts();
    }

    handleLast() {
        this.pageNumber = Math.ceil(this.contacts.length / 10);
        this.getContacts();
    }

    handleViewDetails(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                actionName: 'view'
            }
        });
    }

    getContacts() {
        getContacts({ pageNumber: this.pageNumber, searchTerm: this.searchTerm })
            .then(result => {
                this.contacts = result;
                this.disableFirstButton = this.pageNumber === 1;
                this.disablePreviousButton = this.pageNumber === 1;
                this.disableNextButton = result.length < 10;
                this.disableLastButton = result.length < 10;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
