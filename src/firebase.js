import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDwHShIP5qcU9DEulwGtJec3IXoNFkHPOo",
  authDomain: "oauthmealplanner.firebaseapp.com",
  databaseURL: "https://oauthmealplanner.firebaseio.com",
  projectId: "oauthmealplanner",
  storageBucket: "oauthmealplanner.appspot.com",
  messagingSenderId: "632597021517",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const providerWithScope = provider.addScope('https://www.googleapis.com/auth/calendar');
export const auth = firebase.auth();

export default firebase;
