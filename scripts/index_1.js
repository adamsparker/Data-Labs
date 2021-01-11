const guideList = document.querySelector('.content__container')
const loggedOutLinks = document.querySelectorAll('#logout');
const loggedInLInks = document.querySelectorAll('#login');
const accountDetails = document.querySelector('.account-details');
const titleinfo = document.querySelector('.block__title');

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


        loggedInLInks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
       
    }
    else {
    
        loggedInLInks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        
    }
  }
