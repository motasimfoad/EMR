import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyCYaTKjfam_qMXDnGfcdnBxScEq89VQtLk',
    authDomain: 'curious-sandbox-196209.firebaseapp.com',
    databaseURL: 'https://curious-sandbox-196209.firebaseio.com',
    projectId: 'curious-sandbox-196209',
    storageBucket: '',
    messagingSenderId: '1034032747860'
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();
export {
    auth,
    database,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider
};