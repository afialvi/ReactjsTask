import axios from 'axios';
class NetworkUtils{

	static postRequest(url, body, caller){
		// fetch(url, {
		// 	  method: 'POST',
		// 	  headers: {
		// 	    'Accept': 'application/json',
		// 	    'Content-Type': 'application/json',

		// 	  },
		// 	  body: JSON.stringify(body)
		// 			}).then(response => {
  //           console.log(response)
  //       })
  //       .catch(error =>{
  //           console.log(error)
  //       })
 	console.log("Body: "+JSON.stringify(body));
  	axios.post(url, body)
  .then(function (response) {
    console.log(response);
    caller(response);
  })
  .catch(function (error) {
    console.log(error);
    caller(error);
  });



	}

}
export default NetworkUtils;