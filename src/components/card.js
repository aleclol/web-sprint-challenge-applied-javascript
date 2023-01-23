import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card = document.createElement('div')
  const headline = document.createElement('div')
  const author = document.createElement('div')
  const imgContainer = document.createElement('div')
  const img = document.createElement('img')
  const authorName = document.createElement('span')

  card.classList.add('card')
  headline.classList.add('headline')
  author.classList.add('author')
  imgContainer.classList.add('img-container')

  img.setAttribute('src', article.authorPhoto)

  headline.textContent = `${article.headline}`
  authorName.textContent = `By ${article.authorName}`

  card.appendChild(headline)
  card.appendChild(author)
  author.appendChild(imgContainer)
  imgContainer.appendChild(img)
  author.appendChild(authorName)

  //console.log(card)

  return card
}

//console.log(Card({authorPhoto:'http://www.google.com',headline:"HI",authorName:"John"}))

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get('http://localhost:5001/api/articles')
    .then(response => {
      console.log(response.data.articles)
      const bootstrapArticle = response.data.articles.bootstrap
      const javascriptArticle = response.data.articles.javascript
      const jqueryArticle = response.data.articles.jquery
      const nodeArticle = response.data.articles.node
      const technologyArticle = response.data.articles.technology
      
      const articleArray = [bootstrapArticle, javascriptArticle, jqueryArticle, nodeArticle, technologyArticle]

      const selectThis = document.querySelector(selector)
      
      console.log(selectThis)

      for(let category of articleArray){
        for(let theArticle of category){
        const createCard = Card(theArticle)
        selectThis.appendChild(createCard)
        }
      }
      return selectThis
    })
    .catch(err => {
      console.log(err)
    })  

}

console.log(cardAppender('.cards-container'))

export { Card, cardAppender }
