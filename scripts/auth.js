// listen for auth status changes
auth.onAuthStateChanged(user => {
   if (user) {

    db.collection('blocks').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
    })
    console.log('user logged in: ', user);
    setupUI(user);
    
    }
   else {
       setupUI();
       setupGuides([]);
       console.log('user logged out');
   }
});




// create new block
const createBlock = document.querySelector('#create__block__form');
createBlock.addEventListener('submit', (e) => {
    e.preventDefault();
    
    db.collection('blocks').add({
        title: createBlock['create__block__title'].value,
        content: createBlock['create__block__content'].value,
        color: createBlock['colors'].value,
        size: createBlock['size'].value,
        date: createBlock['block__date'].value
       })
    }) 
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    // sign up the user 
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            username: signupForm['signup-username'].value
        });
        
    }).then(() => {
        console.log(cred.user);
        const modal = document.querySelector('#signup');
       
      
    });
    //signupForm.reset();
    /*FirebaseUse=FirebaseAuth.getInstance().getCurrentUser();//DEFEND HER  [used to track userstate but it working without it lol how  ]  */
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
        auth.signOut();
});
// login
const loginForm = document.querySelector('#signin-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['signin-email'].value;
    const password = loginForm['signin-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
  //  console.log(cred.user)
    });
    loginForm.reset();
})

