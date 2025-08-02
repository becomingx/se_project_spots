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
    }   
    
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

    removeCard(_id) {        
        return fetch(`${this._baseUrl}/cards/${_id}`,
            { 
                method: "DELETE",
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res;
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
    
    
    toggleLikeCard(_id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`,
            { 
                method: isLiked ? "DELETE" : "PUT",
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res;
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
            
}

  export default Api;