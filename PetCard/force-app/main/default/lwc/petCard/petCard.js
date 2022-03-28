import { api, track, LightningElement } from 'lwc';
import PET_IMAGES from '@salesforce/resourceUrl/CPASPetImages'

export default class PetCard extends LightningElement {
    //Pet set by container class
    @api pet;
    //Path to static resources
    @track imageURL;
    //Boolean to track if component is selected
    isSelected = false;
    //Style string used in mouse events to change color on card
    style = 'BGCol slds-grid slds-box slds-var-p-around_x-small';
    
    //Set the path to pet image
    connectedCallback() {
        this.imageURL = PET_IMAGES + '/images/' + this.pet.Type__c + '.png';
    }
    //Event to handle on click event
    handleSelect(event) {
        //Toogle selected bool
        this.isSelected = !this.isSelected;
        //If component is now selected
        if (this.isSelected) {
            //Update style to selected style (BGCol-selected)
            this.style = 'BGCol-selected slds-grid slds-box slds-var-p-around_x-small';
            //Trigger event in parent component to update selected pet list
            this.dispatchEvent(new CustomEvent('petselect', {detail: this.pet}));  
        } else { //else not selected
            //Set style to base style
            this.style = 'BGCol slds-grid slds-box slds-var-p-around_x-small';
            //Trigger event in parent to remove this components pet from selected list
            this.dispatchEvent(new CustomEvent('petdeselect', {detail: this.pet}));
        }     
    }
    //Event to handle mouse hover
    handleHover(event) {
        //Will have different hover style depending on selected bool
        //If component is currently selected
        if (this.isSelected) {
            //Set style to selected/hover
            this.style = 'BGCol-selected-hover slds-grid slds-box slds-var-p-around_x-small';
        } else { //else not selected
            //Set style to hover
            this.style = 'BGCol-hover slds-grid slds-box slds-var-p-around_x-small';
        }
    }
    //Event to handle mouse exiting hover
    handleExit(event) { 
        //Will revert to different style depending on selected bool
        //If component is currently selected
        if (this.isSelected) {
            //Set style to selected
            this.style = 'BGCol-selected slds-grid slds-box slds-var-p-around_x-small';
        } else { //else not selected
            //Set style to base style
            this.style = 'BGCol slds-grid slds-box slds-var-p-around_x-small';
        }  
    }
}