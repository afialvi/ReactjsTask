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

  return new Promise((resolve, reject) => {
  	axios.post(url, body)
  .then(function (response) {
    console.log(response);
    resolve(response);
  })
  .catch(function (error) {
    console.log(error);
    reject(error);
  });

});

	}

}
export default NetworkUtils;