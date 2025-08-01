class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getAppInfo() {
        return Promise.all([this.getUserCards(), this.getUserInfo()]);
    }
    
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

    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`,
            { 
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about
                })
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
    
    editUserAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`,
            { 
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                avatar
                })
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
    
    POST /cards – Create a card: createCard() 
    PUT /cards/:cardId/likes – Like a card: toggleLikeCard()
    DELETE /cards/:cardId/likes – Dislike a card: toggleLikeCard()
    */

    getUserCards() {
        return fetch(`${this._baseUrl}/cards`,
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
<<<<<<< HEAD
    }   

    /*
    createCard(name, link) {        
    return fetch(`${this._baseUrl}/cards`,
        {
            method: "POST", 
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
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
    }*/

    removeCard(_id) {        
        return fetch(`${this._baseUrl}v1/cards/${_id}`,
            { 
                method: "DELETE",
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                return res;
            }
            console.log("Base URL:", this._baseUrl);

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
    toggleLikeCard() {

    }
   */
=======
    }
    
    /*
    createCard() {

    }

    deleteCard() {

    }

    toggleLikeCard() {

    }
    */
>>>>>>> parent of e1b9864 (se_project_se_project_spots-final delete modal complete)

  }

  export default Api;