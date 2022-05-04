import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {

  //open jate database
  const jDb = await openDB('jate', 1);
  //open a writeable transaction
  const tx = jDb.transaction('jate', 'readwrite');
  //add the content to the unique store property of the transaction, 
  //the new await automatically closes the transaction
  const res = await tx.store.put({ id: 1, value: content });
};


export const getDb = async () => {

  //open jate database
  const jDb = await openDB('jate', 1);
  //open a read-only transaction
  const tx = jDb.transaction('jate', 'readonly');
  //get the content from the unique store property of the transaction, 
  //the new await automatically closes the transaction
  const res = await tx.store.get(1);
  //return the obtained content
  return res?.value;

};

initdb();
