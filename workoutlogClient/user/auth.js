$(function() {
   $.extend( WorkoutLog, {
      signup: function() {
            var username = $("#su_username").val();
            var password = $("#su_password").val();
            var user = {user: {username: username, password: password }};
            var signup = $.ajax({
               type: "POST", 
               url: WorkoutLog.API_BASE + "user", 
               data: JSON.stringify(user), 
               contentType: "application/json"
            });


             
            signup
            //.done() Promise
            //Runs asynchronously
            .done(function(data) {
               if (data.sessionToken) {
                  WorkoutLog.setAuthHeader(data.sessionToken);
                  console.log("You made it!");
                  console.log(data.sessionToken);
               }

               $("#signup-modal").modal("hide");
               $(".disabled").removeClass("disabled");
             $("#loginout").text("Logout");
               //go to define tab
             $('.nav-tabs a[href="#define"]').tab('show');
            })

            //.fail() Promise
            .fail(function() {
               $("#su_error").text("There was an issue with your username").show();
            });
      },

      //login

      login: function() {
   		var username = $("#li_username").val();
   		var password = $("#li_password").val();
   		var user = {user:  {username: username, password: password }}

   		//Login post
   		var login = $.ajax({
   			type: "POST", 
   			url: WorkoutLog.API_BASE + "login", 
   			data: JSON.stringify(user), 
   			contentType: "application/json"
   		})

   		//Login done/fail
   		login.done(function(data) {
   			if (data.sessionToken) {
               WorkoutLog.setAuthHeader(data.sessionToken);
               
   			}
   			// TODO: add logic to set user and auth token	
   			$("#login-modal").modal("hide");
   			$(".disabled").removeClass("disabled");
   			$("#loginout").text("Logout");
   		})
   		.fail(function() {
   			$("#li_error").text("There was an issue with your username or password").show();
      		});
      },

      //logout
      loginout: function() {
         if (window.localStorage.getItem("sessionToken")) {
            window.localStorage.removeItem("sessionToken");
            $("#loginout").text("Login");
         }

         //TODO: on logout make sure stuff is disabled
      }
   });

   // bind events
  $("#login").on("click", WorkoutLog.login);
   $("#signup").on("click", WorkoutLog.signup);
  $("#loginout").on("click", WorkoutLog.loginout);

   if (window.localStorage.getItem("sessionToken")) {
      $("#loginout").text("Logout");
   }

});