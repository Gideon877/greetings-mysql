# Greetings
    - mysql

### Task list

- [x] create a server for the app
- [x] create a database and table (mysql)
- [x] create routes, views, and public folder
- [x] create css folder (style.css file)
- [x] create a github repository and deploy

### About the App
- List all shoes in stock
- List all shoes for a given brand
- List all shoes for a given size
- List all shoes for a given brand and size
- Update the stock levels when a shoe is sold
- Add a new new shoe to his stock.

### Getting Started

- Backend (Server side).

Clone or download this [respository](https://github.com/Gideon877/greetings-mysql.git) to your machine from GitHub.

#### Cloning

- Go to the terminal and and copy and paste the following code;

  ```
     $ git clone https://github.com/Gideon877/greetings-mysql.git greetings-mysql
  ```

### Prerequisites

What things you need to install the software and how to install them?

- NodeJS
- Mysql
- Package.json dependencies


### Installing;

#### NodeJS

Before you try to install NodeJS open a terminal window and try to run it by typing, node -v. If NodeJS is installed it should tell you which version you have. Alternatively the command will fail and you will need to install it.

To install it on Ubuntu you can use the [apt-get package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions.md).

Alternatively you can use nvm, the [Node Version Manager](https://github.com/creationix/nvm#install-script.md) to manage the version of NodeJS on your PC.

#### Mysql
  
How to [Install Mysql](https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial).

#### Package.json dependencies

```json
"dependencies": {
  "body-parser": "^1.17.1",
  "express": "^4.15.2",
  "express-flash": "0.0.2",
  "express-handlebars": "^3.0.0",
  "express-myconnection": "^1.0.4",
  "mysql": "^2.5.3",
  "prompt": "^0.2.14"
},
"devDependencies": {
  "nodemon": "^1.11.0",
  "typedoc": "^0.8.0"
},
"engine": {
  "node": "v4.2.6"
}
```

To install all dependencies required for the app to run, on the terminal navigate to the shoes_api folder, and type `npm install` .


## Running the app locally

- In the command line, navigate to the shoes_api directory. Once you are in the appropriate directory input this command

`$ nodemon` or `$ node index.js`

- The following message should be displayed `App started on port: 3000`

- Then open a new tab on your browser and type this `http://localhost:3000` and the app will open.

## Deployment

The app is not deployed yet.

## Built With

- [MySQL](https://www.mysql.com/) - Cloud MongoDB server
- [NPM](https://www.npmjs.com) - Dependency Management
- [Bootstrap](https://bootswatch.com/cerulean/) - The web framework used

## Versioning

`"version": "1.0.0",`

## Author

- **Thabang Gideon Magaola** - _Initial work_ - [Thabang Gideon](https://github.com/Gideon877)

## License

This project is licensed under the ISC License - see the [ISC-LICENSE.md](https://github.com/nevir/readable-licenses/blob/master/markdown/ISC-LICENSE.md) file for details `"license": "ISC"`
