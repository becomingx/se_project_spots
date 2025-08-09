class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    };

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
        return this._request(`${this._baseUrl}/users/me`, 
            {
                headers: this._headers
            }
        );      
    };

    editUserInfo({name, about}) {
        return this._request(`${this._baseUrl}/users/me`,
            { 
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about
                })
            }
        );
    };  
    
    editUserAvatar({avatar}) {
        return this._request(`${this._baseUrl}/users/me/avatar`,
            { 
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            }
        );
    };

    getUserCards() {
        return this._request(`${this._baseUrl}/cards`,
            { 
                headers: this._headers
            }
        );
    };
    
    createCard({name, link}) {
        return this._request(`${this._baseUrl}/cards`,
            {
                method: "POST", 
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    link
                })
            }
        );    
    };

    removeCard(_id) {        
        return this._request(`${this._baseUrl}/cards/${_id}`,
            { 
                method: "DELETE",
                headers: this._headers,
            }
        );    
    };
    
    toggleLikeCard(_id, isLiked) {
        return this._request(`${this._baseUrl}/cards/${_id}/likes`,
            { 
                method: isLiked ? "DELETE" : "PUT",
                headers: this._headers
            }
        ); 
    };

};

  export default Api;

