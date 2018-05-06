const rp = require('request-promise');

var options = {
  uri: 'https://nl-co-s-16.herokuapp.com/',
  method: 'GET'
};

rp(options).then((response) => {
  alert(`response: ${JSON.stringify(response)}`);
}).catch((e) => {
  alert(`e: ${JSON.stringify(e)}`);
});
