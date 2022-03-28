import { api, LightningElement } from 'lwc';

export default class PetCardList extends LightningElement {
    //List of pets provided by flow
    @api petCollection = [];
    //List of selected pets to return to flow
    @api selectedPets = [];
    
    //Adds a pet to the selectedPets list.
    //Triggered by child component. 
    selectPet(event) { 
        this.selectedPets.push(event.detail);
    }
    //Removes a pet from the selectedPets list.
    //Triggered by child component. 
    deselectPet(event) { 
        //Create new list to populate with pets that are still selected
        let newPetList = [];
        //Run loop on current pet list
        this.selectedPets.forEach(pet => { 
            //Check that pet from loop does not match pet to remove from list
            if (pet !== event.detail) { 
                //Add still selected pet into new list
                newPetList.push(pet);
            }
        });
        //Update selectedPets list with new list
        this.selectedPets = newPetList;
    }
}