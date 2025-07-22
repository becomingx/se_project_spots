class Api {
    // Constructor method
    constructor(options) {
      this.options = options;
    }


    /*
    calling api.getInitialCards in index.js
    On line 211 of index.js, you're trying to use .forEach() directly on api.getInitialCards. 
    What do you think api.getInitialCards is at this point? (Hint: is it the data 
    you want, or something else?)

    Since fetch() is asynchronous, how do you think you should handle the response? 
    What method could you chain after calling api.getInitialCards() to work with 
    the actual card data?

    So when you write:
    javascript
    api.getInitialCards().forEach(...)
    You're trying to call .forEach() on a Promise, not on the actual array of cards.
    
    How do you think you can "unwrap" that Promise to get to the actual card data 
    inside? What method can you use with Promises to access the data once it arrives?
    */
  
    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", 
        { headers: {
            authorization: "30487a64-5f71-41bb-bbbd-2f7240ebc0c2"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err) => {
            if (err) {
                console.error(err);
                return Promise.reject(err);
            }
        })
    }

    /*
    API endpoints: User routes
    GET /users/me – Get the current user’s info: fetchUserInfo()
    PATCH /users/me – Update your profile information: updateProfile()
    PATCH /users/me/avatar – Update avatar: updateAvatar()
    */

    fetchUserInfo() {

    }

    updateProfile() {

    }   
    
    updateAvatar() {

    }

    /*
    API endpoints: Card routes
    GET /cards – Get all cards: fetchUserCards()
    POST /cards – Create a card: createCard() 
    DELETE /cards/:cardId – Delete a card: deleteCard() 
    PUT /cards/:cardId/likes – Like a card: toggleLikeCard()
    DELETE /cards/:cardId/likes – Dislike a card: toggleLikeCard()
    */

    fetchUserCards() {

    }
    
    createCard() {

    }

    deleteCard() {

    }

    toggleLikeCard() {

    }

  }

  export default Api;