//Account Configuration
Accounts.config({
  //Prevents account creation from client side (Security)
  forbidClientAccountCreation: true,
  //User log in token expires after one day
  loginExpirationInDays: 1
})

//If Accounts token is received, set in session var
//Currently Disabled: Other method allows for route navigation when key is defined
/*if(Accounts._resetPasswordToken){
  Session.set('resetToken', Accounts._resetPasswordToken);
}*/

if(Meteor.isClient){
  //Offset highchart graphs by -5 hours (UTC to EST)
  Highcharts.setOptions({
    global: {
      timezoneOffset: 5 * 60
    }
  });
}


//Setup for email
Meteor.startup(function(){
  if(Meteor.isServer){
    //SMTP values
    smtp = {
      username: 'superjoyfuladmin',
      password: 'd219ff7d90dc83cd1001c09b8e8f662c',
      server: 'smtp.mailgun.org',
      port: '587'
    }
    //Mail environment variable
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //Modifies the email sent for resetPassword
    Accounts.emailTemplates.resetPassword.text = function (user, url) {
       //Replace with correct url path
       url = url.replace('#/reset-password/', 'Password_Reset/t=');
       return " To reset your password, simply click the link below:\n\n"
         + url;
    };
  }
})
