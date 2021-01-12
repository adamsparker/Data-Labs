const guideList = document.querySelector('.content__container')
const loggedOutLinks = document.querySelectorAll('#logout');
const loggedInLInks = document.querySelectorAll('#login');
const accountDetails = document.querySelector('.account-details');
const titleinfo = document.querySelector('.block__title');
const createLink = document.querySelectorAll('#block__create');

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

// setup Block
const setupGuides = (data) => {
  
    if(data.length) {
  
      let html = '';
      data.forEach(doc => {
      const blocks = doc.data();
  
      // ${blocks.color} должно быть в <div class="block big-block">
  
      const blk = `
                     <div class="block ${blocks.size} ${blocks.color}">
                      <a href="#" onclick="deleteDoc()" class="options__button">•••</a>
                     <div class="option__text">
                      <h2 class="options__title">${blocks.title}</h2>
                      <p>${blocks.content}</p>
                          <div class="options__date">${blocks.date}</div>
                      </div>
                      </div>
      `;
      html += blk
    });
  
    guideList.innerHTML = html;
  
  } else
    {
     guideList.innerHTML = '<h5 class ="blocks__status">Login to view content</h5>'
    }
  }
  

// setup User
const setupUI = (user) => {
    if (user) {
          //account info
          db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Hello!<br>${doc.data().username}</div>
            `;
            accountDetails.innerHTML = html;
        })
          //hide account info
          accountDetails.innerHTML = '';

        createLink.forEach(item => item.style.display = 'block');
        loggedInLInks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
       
    }
    else {
     
        createLink.forEach(item => item.style.display = 'none');
        loggedInLInks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        
    }
  }


  
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

