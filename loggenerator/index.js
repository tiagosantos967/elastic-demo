const faker = require('faker');
const fs = require('fs');

class FakeRegistrationLog {
  constructor() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const createdAt = new Date().toISOString()

    this.fakeLog = {
      createdAt,
      firstName,
      lastName,
      userName: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      avatar: faker.internet.avatar(),
      country: faker.address.countryCode()
    }
  }

  toString(){
    return JSON.stringify(this.fakeLog)+'\n';
  }
}

function createFile(filename) {
  fs.open(filename,'r',function(err, fd){
    if (err) {
      fs.writeFile(filename, '', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
      });
    } else {
      console.log("The file exists!");
    }
  });
}

const logsFileName = process.env.LOG_NAME;

if (!logsFileName) {
  console.error('LOG_NAME environment variable must be set!')
  return 1;
}

console.log('Generating logs as', logsFileName)

const logsFileLocation = `./logs/${logsFileName}`;
createFile(logsFileLocation)

setInterval(() => {
  const fakeLog = new FakeRegistrationLog();
  fs.appendFileSync(logsFileLocation, fakeLog.toString());
  console.log(fakeLog.toString())
}, 5000 * (0.5 + Math.random()) );