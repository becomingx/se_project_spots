class Api {
    // Constructor method
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }
        
    getInitialCards() { 
        return fetch(
            `${this._baseUrl}/cards`, 
            { 
                headers: this._headers
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
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            { 
                headers: this._headers
            })
            .then((res) => {
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

    //uses GET
    fetchUserCards() {
        return fetch(`${this._baseUrl}/v1/cards`,
            { 
                headers: this._headers
            })
            .then((res) => {
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
    createCard() {

    }

    deleteCard() {

    }

    toggleLikeCard() {

    }
    */

  }

  export default Api;