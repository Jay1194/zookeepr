const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  // specify what type of request it is
  fetch('/api/animals', {

    //set the method to POST
    method: 'POST',

    //set the headers property to inform the request that this is going to be JSON data
    headers: {
        Accept: 'applicaion/json',
        'Content-Type': 'application/json'
    },

    //add stringified JSON data for our animalObject to the body property of the request. Without these, we would never receive req.body on the server!
    body: JSON.stringify(animalObject)
})

.then(response => {
    if (response.ok) {
        return response.json();
    }

    alert('Error: ' + response.statusText);
})

.then(postResponse => {
    console.log(postResponse);
    alert('Thank you for adding an animal')
})

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
