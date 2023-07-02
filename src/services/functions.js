import { updateSearch, clearSearch } from "./../store";

export const searchContacts = (searchedString, contactsArr, dispatch) => {
    console.log("IN FUNCTION >>> ", searchedString, contactsArr)
    if(contactsArr.length === 0){
        const actionPayload = {search: true, resultContacts: [], searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }else if(contactsArr.length > 0){
        const searchTerm = /searchedString/i;
        const resultArr = contactsArr.map((contactInfo) => {
            const phoneNumber = contactInfo.phoneNo.toString();
            if(contactInfo.name.match(searchTerm) || contactInfo.nickName.match(searchTerm) || phoneNumber.match(searchTerm)){
                return contactInfo
            }
        })
        const actionPayload = {search: true, resultContacts: resultArr, searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }
}