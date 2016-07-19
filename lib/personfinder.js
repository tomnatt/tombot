var http = require('http');

var PersonFinder = function() {
  this.host = 'www.bath.ac.uk';
  this.userPath = '/personfinder/dataquery/api.php?uid='
}

// Person.prototype.response = function() {
//   // this is failing because the get is async
//   this._getUserByUsername(function() {
//     console.log("thing");
//     return this.name + ', ' + this.job + ', ' + this.phoneNumber;
//   });
// }

PersonFinder.prototype.getUserByUsername = function() {

  var options = {
    host: this.host,
    path: this.userPath + self.username
  };

  http.get(options, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var response = JSON.parse(body);
      var person = response.people[0];
      self.name = person.displayname;
      self.email = person.email;
      self.phoneNumber = person.roles[0].telephonenumber[0];
      self.job = person.roles[0].title;
    });
  });

}

module.exports = PersonFinder;
