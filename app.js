window.addEventListener('load', function() {
  const CLIENT_ID =
    'fb493d88a959b9739c138854efc3c678b90ba1b324c249aa5db7e80bad45dd4b';
  const REDIRECT_URI = 'https://pco-demo.herokuapp.com';

  const PCO_AUTH_URL = `https://api.planningcenteronline.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=people`;

  const CODE = new URL(window.location).searchParams.get('code');

  document.getElementById('login').addEventListener('click', function() {
    window.location = PCO_AUTH_URL;
  });

  document.getElementById('get-people').addEventListener('click', function() {
    axios
      .get('/people')
      .then(function(result) {
        document.getElementById('people').innerHTML = JSON.stringify(
          result.data,
          null,
          2
        );
      })
      .catch(function(error) {
        console.log('error ', error);
      });
  });

  if (CODE) {
    window.location.search = '';
    axios
      .post('/auth/exchange', { CODE })
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
