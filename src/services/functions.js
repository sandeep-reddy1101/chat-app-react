import { updateSearch } from "./../store";

// Function to search the active and inactive contacts 
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

// Function to search the contacts based on searched text/string
export const searchContacts = (searchedString, contactsArr, dispatch) => {
    if(contactsArr.length === 0){
        const actionPayload = {search: true, resultContacts: [], searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }else if(contactsArr.length > 0){
        let resultArr = [[], []]
        resultArr[0] = filterContactsUsingSerachedString(contactsArr, searchedString, true);
        resultArr[1] = filterContactsUsingSerachedString(contactsArr, searchedString, false);
        const actionPayload = {search: true, resultContacts: resultArr, searchedString: searchedString};
        dispatch(updateSearch(actionPayload))
    }
}

// Function to filter and return the active chats.
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

// Function to format the time
// EX: 10:30 am (if its today)
// EX: yesterday
// Ex: monday (if it is in this week before yesterday)
// Ex: mm/dd/yy (if it is before this week)
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

// Function to sort the array based on time.
// It will sort it in decending order i.e., latest time will be at the start
export const sortArrayUsingTime = (arr) => {
    arr.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    console.log(arr)
    return arr
}