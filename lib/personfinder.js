var http = require('http');

var Person = function(username) {
  this.host = 'www.bath.ac.uk';
  this.userPath = '/personfinder/dataquery/api.php?uid='

  this.username = username;
  this.name = '';
  this.email = '';
  this.phoneNumber = '';
  this.job = '';
}

Person.prototype.getUser = function(callback) {
  this._getUserFromApi(() => {
    callback(this.name + ', ' + this.job + ', ' + this.phoneNumber);
  });
}

Person.prototype._getUserFromApi = function(callback) {
  var options = {
    host: this.host,
    path: this.userPath + this.username
  };

  http.get(options, (res) => {
    var body = '';

    // required to consume incoming data and trigger the 'end' event
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      var response = JSON.parse(body);
      var person = response.people[0];
      this.name = person.displayname;
      this.email = person.email;
      this.phoneNumber = person.roles[0].telephonenumber[0];
      this.job = person.roles[0].title;

      callback();
    });
  });

}

module.exports = Person;
