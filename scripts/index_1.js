const guideList = document.querySelector('.content__container')
const loggedOutLinks = document.querySelectorAll('#logout');
const loggedInLInks = document.querySelectorAll('#login');
const accountDetails = document.querySelector('.account-details');
const titleinfo = document.querySelector('.block__title');

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

  

} else
  {
    guideList.innerHTML = '<h5 class ="blocks__status">Login to view content</h5>'
  }
}

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
