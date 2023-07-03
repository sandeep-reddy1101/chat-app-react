import { updateSearch, clearSearch } from "./../store";

export const searchContacts = (searchedString, contactsArr, dispatch) => {
    console.log("IN FUNCTION >>> ", searchedString, contactsArr)
    if(contactsArr.length === 0){
        const actionPayload = {search: true, resultContacts: [], searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }else if(contactsArr.length > 0){
        let resultArr = []
        resultArr = contactsArr.filter((contactInfo) => {
            const phoneNumber = contactInfo.phoneNo.toString();
            console.log("checking >>> ", contactInfo.name.includes(searchedString))
            if(contactInfo.name.includes(searchedString) || contactInfo.nickName.includes(searchedString) || phoneNumber.includes(searchedString)){
                return true
            }else{
                return false
            }
        })
        const actionPayload = {search: true, resultContacts: resultArr, searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }
}