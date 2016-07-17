var http = require('http');

var Person = function(username) {
  this.username = username;
  this.name = '';
  this.email = '';
  this.job = '';
  this.phoneNumber = '';
}

Person.prototype.response = function() {
  // this is failing because the get is async
  this._getUserByUsername();
  return this.name + ', ' + this.job + ', ' + this.phoneNumber;
}

Person.prototype._getUserByUsername = function() {
  var self = this;

  var options = {
    host: 'www.bath.ac.uk',
    path: '/personfinder/dataquery/api.php?uid=' + self.username
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

module.exports = Person;
