// const article = document.createElement('article')
// const wrapper = document.querySelector('.wrapper')
// article.classList.add('article')
// article.textContent = 'GIT EBAT'
// wrapper.append(article)

const search = document.querySelector('input')

 function getRepo (value) { 
  let arrRepo = [];
  fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`).then(response => { 
    return response.json() 
    }).then(el => { 
        arrRepo.push(...el.items)
        promptSearch(arrRepo) 
    }).catch(err => console.log(`Ошибка получения данных - ${err}`))
}

function changeHandler(e) { 
    deletePromptList()
    getRepo(e.target.value)
}

const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args);
        }, debounceTime);
    }
};

const debaunceChangeHandler = debounce(changeHandler, 500)

search.addEventListener('keyup', debaunceChangeHandler)

const promtCard = document.querySelector('.promptCard')

let userName;
let userOwner;
let userStars

function promptSearch (arr) { 
    const fragment = new DocumentFragment(); 
    arr.forEach(dataUser =>  { 
        // console.log(obj.name);
        const promtItem = document.createElement('li')
        promtItem.classList.add('promptItem')
        userName = promtItem.textContent = dataUser.name
        userOwner = dataUser.owner.login
        userStars = dataUser.stargazers_count
        fragment.append(promtItem)
    })
 return promtCard.append(fragment)
}

const createForList = document.querySelector('.list')
 createForList.classList.add('list')

function card (name, owner, stars) { 
    name = userName
    owner = userOwner
    stars = userStars
    const createCardLi = document.createElement('li')
    createCardLi.classList.add('item')
    
    const user = document.createElement('span')
    user.classList.add('info-item')
    
    const cardName = document.createElement('p')
    cardName.classList.add('card-name')
    cardName.textContent = `Name: ${name}`
    user.append(cardName)

    const cardOwner = document.createElement('p')
    cardOwner.classList.add('card-owner')
    cardOwner.textContent = `Owner: ${owner} `
    user.append(cardOwner)

    const cardStars = document.createElement('p')
    cardStars.classList.add('card-stars')
    cardStars.textContent = `Stars: ${stars} `
    user.append(cardStars)

    const btn = document.createElement('button')
    btn.classList.add('card-close')
    btn.setAttribute('type', 'button')

    createCardLi.append(user)
    createCardLi.append(btn)
    return createForList.append(createCardLi)
}

function cardAdd() {  
        card()
        deletePromptList()
}

function deletePromptList () { 
    const childrenArr = [...promtCard.children]
    childrenArr.forEach(el => {
        el.remove()
    })
}


promtCard.addEventListener('click', cardAdd) 

createForList.addEventListener('click', clearBtn) 

function clearBtn (e) { 
  if (e.target.className === 'card-close')  e.target.closest('.item').remove()
 }

 
 


 
 