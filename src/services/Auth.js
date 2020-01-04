import firebase from 'firebase';

const Auth = (() => {
    const { auth } = firebase;

    const doCreateUserWithEmailAndPassword = async (email, password) => 
        auth().createUserWithEmailAndPassword(email, password);

    const doSignInWithEmailAndPassword = async (email, password) =>
        auth().signInWithEmailAndPassword(email, password);

    const doSignOut = async () => auth().signOut();

    const doPasswordReset = async email => auth().sendPasswordResetEmail(email);
  
    const doPasswordUpdate = async password =>
        auth().currentUser.updatePassword(password);

    return {
        doCreateUserWithEmailAndPassword,
        doSignInWithEmailAndPassword,
        doSignOut,
        doPasswordReset,
        doPasswordUpdate
    }
})();

export default Auth;
