import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";
import firebaseConfig from '../const/settings';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function saveValueInFirebase(value = '') {
  const id = Date.now()
    const item = {
    id,
    value,
    checked: false,
    };
    try{ set(ref(db, 'items/' + id), item);
    }
    catch(error) {console.log(error)}
}

function getValueFromFirebase(url) {
   return get(ref(db,url)).then((snapshot) => {
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
}); 
}

function removeIten(url) {
    try {
        remove(ref(db, url))
    }
    catch(error) {console.log(error)}
}

function updateItem(id, payload){
    const updates = {};
    updates['/items/' + id + '/' + "checked"] = payload;
    try {
        update(ref(db), updates)
    }
    catch(error) {console.log(error)}
}


export {saveValueInFirebase, getValueFromFirebase, removeIten, updateItem } 