import { updateSearch, clearSearch } from "./../store";

const filterContactsUsingSerachedString = (contactsArr, searchedString, active) => {
    let resultArr = []
    resultArr = contactsArr.filter((contactInfo) => {
        const phoneNumber = contactInfo.contactPhoneNo.toString();
        if(contactInfo.nickName.includes(searchedString) || phoneNumber.includes(searchedString)){
            if(contactInfo.active === active){
                return true
            }else {
                return false
            }
        }else{
            return false
        }
    })
    return resultArr
}

export const searchContacts = (searchedString, contactsArr, dispatch) => {
    if(contactsArr.length === 0){
        const actionPayload = {search: true, resultContacts: [], searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }else if(contactsArr.length > 0){
        let resultArr = [[], []]
        resultArr[0] = filterContactsUsingSerachedString(contactsArr, searchedString, true);
        resultArr[1] = filterContactsUsingSerachedString(contactsArr, searchedString, false);
        console.log("result array >>>> ",resultArr)
        const actionPayload = {search: true, resultContacts: resultArr, searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }
}

export const filterActiveChats = (contactsArr) => {
    if(contactsArr.length > 0){
        let resultArr = contactsArr.filter((contact) => {
            if(contact.active){
                return true
            }else{
                return false
            }
        })
        return resultArr
    }else{
        return []
    }
}

export const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();
    const isThisWeek = date > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
    if (isToday) {
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return formattedTime;
    } else if (isYesterday) {
      return 'Yesterday';
    } else if (isThisWeek) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = daysOfWeek[date.getDay()];
      return dayName;
    } else {
      const formattedDate = date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: '2-digit' });
      return formattedDate;
    }
}