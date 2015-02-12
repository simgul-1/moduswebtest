function authenticate(token, callback) {
    // Launches a popup showing the provider's website
    // for the user to login and to accept permissions
    .popup('google', {
        state: token
    })
        .done(function(r) {
            // Sends the code to the authentication endpoint
            // we created earlier
            $.ajax({
                url: '/oauth/signin',
                method: 'POST',
                data: {
                    code: r.code
                },
                success: function(data, status) {
                    // Here the user is authenticated.
                    // We can call a request endpoint to retrieve information
                    // in the callback.
                    callback(null, data);
                },
                error: function(data) {
                    callback(data);
                }
            });
        })
        .fail(function(e) {
            console.log(e);
        });
}