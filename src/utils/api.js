class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res, parseJson = true) {
        if (res.ok) {
          return parseJson ? res.json() : res;
        }
        return Promise.reject(`Error: ${res.status}`);
    };

    getAppInfo() {
        return Promise.all([this.getUserCards(), this.getUserInfo()]);
    };
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            { 
                headers: this._headers
            })
           .then(res => this._checkResponse(res))
 
    };

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
           .then(res => this._checkResponse(res))
  
    };  
    
    editUserAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`,
            { 
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            })
           .then(res => this._checkResponse(res))
  

    };

    getUserCards() {
        return fetch(`${this._baseUrl}/cards`,
            { 
                headers: this._headers
            })
           .then(res => this._checkResponse(res))
  
    };
    
    createCard({name, link}) {        
        return fetch(`${this._baseUrl}/cards`,
            {
                method: "POST", 
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    link
                })
            })
           .then(res => this._checkResponse(res))
     
    };

    removeCard(_id) {        
        return fetch(`${this._baseUrl}/cards/${_id}`,
            { 
                method: "DELETE",
                headers: this._headers,
            })
           .then(res => this._checkResponse(res))
  
    };
    
    toggleLikeCard(_id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`,
            { 
                method: isLiked ? "DELETE" : "PUT",
                headers: this._headers
            })
           .then(res => this._checkResponse(res))

    };

}

  export default Api;

