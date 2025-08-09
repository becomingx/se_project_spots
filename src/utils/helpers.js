export function setSaveButtonText(
    btn, 
    isLoading,
    defaultText = "Save", 
    loadingText = "Saving...") 
{
    if (isLoading) {
        btn.textContent = loadingText;
    } else {
        btn.textContent = defaultText;
    }
};

/*
export function handleSubmit(request, evt, loadingText = 'Saving...') {
    // You need to prevent the default action in any submit handler
     evt.preventDefault();
   
     // the button is always available inside `event` as `submitter`
     const submitButton = evt.submitter;
     // fix the initial button text
     const initialText = submitButton.textContent;
     // change the button text before requesting
     renderLoading(true, submitButton, initialText, loadingText);
     // call the request function to be able to use the promise chain
     request()
       .then(() => {
         // any form should be reset after a successful response 
         // evt.target is the form in any submit handler		
         evt.target.reset();
       })
         // we need to catch possible errors
         // console.error is used to handle errors if you don’t have any other ways for that
       .catch(console.error)      
   
       // and in finally we need to stop loading
       .finally(() => {
         renderLoading(false, submitButton, initialText);
       });
   }*/

/*
If it’s interesting for you, here is how we can make a universal function for handling any submit. 
We can get rid of such duplicating as loading effect, resetting and catching errors

// define a function for changing the button text. It accepts 4 params (the 2 last are optional with default texts) 
// **COMPLETED, named setSaveButtonText**

// define a universal function that accepts a request function, event and a default loading text 
function handleSubmit(request, evt, loadingText = 'Saving...') {
 // You need to prevent the default action in any submit handler
  evt.preventDefault();

  // the button is always available inside `event` as `submitter`
  const submitButton = evt.submitter;
  // fix the initial button text
  const initialText = submitButton.textContent;
  // change the button text before requesting
  renderLoading(true, submitButton, initialText, loadingText);
  // call the request function to be able to use the promise chain
  request()
    .then(() => {
      // any form should be reset after a successful response 
      // evt.target is the form in any submit handler		
      evt.target.reset();
    })
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
    .catch(console.error)      

    // and in finally we need to stop loading
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
Here is an example of handling the profile form submit:

function handleProfileFormSubmit(evt) {
  // create a request function that returns a promise
  function makeRequest() {
    // `return` lets us use a promise chain `then, catch, finally`
    return editProfile(nameInput.value, jobInput.value).then((userData) => {
      userName.textContent = userData.name;
      userJob.textContent = userData.about;
    });
  }
  // here we call handleSubmit passing the request and event (if you want a different loading text then you need to pass the 3rd param)
  handleSubmit(makeRequest, evt);
}
So, this way you can remove a lot of code duplicating. You will not need to search buttons, pass initial button texts and so on.

handleSubmit and renderLoading should be placed in utils.js, because they are utility functions
*/