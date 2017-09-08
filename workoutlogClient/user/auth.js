$(function () {
	$.extend(WorkoutLog {
		//signup method
		signup: function() {
			//username & password varibles
			var username = $("#su_username").val()
			var password = $("#su_password").val()
			//user
			var user = {
				user: {
					username:username,
					password: password
				}
			}

			//signup post
			var signup = $.ajax({
				type: 'POST',
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			})
			//signup done/fail
			signup.done(function(data) {
				if(data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken)
				}

				$("#signup-modal").modal("hide")
				$(".disable").removeClasss("disabled")
				$("#logout").text("Logout")
				}).fail(function() {
					$("#su_error").text("There was an issue with the sign up").show()
				})
			})
		}

		//login method

		//logout method
	})

	//bind events
	$("#signup").on(click, WorkoutLog.signup)
})		