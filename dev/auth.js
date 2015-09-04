// HQAuth = function() {
// 	return {
// 		createUser: function(email, password) {
// 			firebase.createUser({
// 				email: email,
// 				password: password
// 			}, function(error, userData) {
// 				if(error) {
// 					console.log("Error creating user:", error);
// 				} else {
// 					console.log("Successfully created user account with uid:", userData.uid);
// 				}
// 			});
// 		},
// 		login: function(email, password) {
// 			firebase.authWithPassword({
// 				email: email,
// 				password: password
// 			}, function(error, authData) {
// 				if (error) {
// 					console.log("Login Failed!", error);
// 				} else {
// 					console.log("Authenticated successfully with payload:", authData);
// 				}
// 			});
// 		},
// 		logout: function() {
// 			firebase.unauth();
// 		}
// 	};
// }