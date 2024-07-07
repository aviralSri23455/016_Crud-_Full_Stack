# MERN Stack CRUD Operations Project Setup with Jest Testing Framework


# Chapter 1: Backend Setup

## 1.1 Initialize Node.js Project

```bash
mkdir mern-crud
cd mern-crud
npm init -y
```

 ##  1.2 Install Dependencies


>- **npm install express mongoose body-parser cors**

## 1.3 Create Server File (server.js)

```bash
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mern-crud', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema and Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String
});

const User = mongoose.model('User', UserSchema);

// CRUD Routes
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
## 1.4 Start the Server

>- node server.js

# Chapter 2: Frontend Setup

## 2.1 Initialize React Project

```bash
npx create-react-app client
cd client

```
## 2.2 Install Axios

>- npm install axios


## 2.3 Create UserList Component (UserList.js)

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', age: '', address: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios.put(`http://localhost:5000/users/${editing}`, form)
        .then(response => {
          setUsers(users.map(user => user._id === editing ? response.data : user));
          setEditing(null);
          setForm({ name: '', email: '', age: '', address: '' });
        });
    } else {
      axios.post('http://localhost:5000/users', form)
        .then(response => {
          setUsers([...users, response.data]);
          setForm({ name: '', email: '', age: '', address: '' });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)));
  };

  const handleEdit = (user) => {
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, age: user.age, address: user.address });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
      </form>
      <table>
        {/* Table structure */}
      </table>
    </div>
  );
};

export default UserList;

```

>- rest of the folder structure and code as follow

## 2.4 Project Structure Example

```
src/
  components/
    AddUser.jsx
    UpdateUser.jsx
    UserTable.jsx
  __tests__/
    AddUser.test.js
    UpdateUser.test.js
    UserTable.test.js
    App.test.js
  App.jsx
  setupTests.js
```

## 2.5 Integrate UserList in App Component (App.js)


```javascript

import React from 'react';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <h1>Users Data</h1>
      <UserList />
    </div>
  );
}

export default App;

```

## 2.6 Start the React App

>- npm start



# Chapter 3: Important Notes

>- Replace mongodb://localhost:27017/mern-crud with your actual MongoDB connection string in server.js.
>- Adjust ports (5000 for backend, 3000 for React frontend) as needed.
>- Implement proper error handling and validations on both frontend and backend.
>- Use environment variables for sensitive information in production.
>- Regularly test CRUD operations to ensure functionality.


# Chapter 4: Testing with Jest 

## Step 1: Install Jest and React Testing Library

**npm install --save-dev jest @testing-library/react @testing-library/jest-dom**

## Step 2:  Update package.json

```json
"scripts": {
  "test": "jest"
}

```

## Step 3. Create jest.config.js

>- Create a Jest configuration file (jest.config.js) in the project root:

```json
module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest" // Transform JS/JSX files with babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$" // Ignore node_modules except axios
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/mockStyles.js" // Mock CSS/SCSS modules
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'] // Setup file for environment
};

```

## Step 4. Create src/setupTests.js

>- Create setupTests.js in the src directory and import @testing-library/jest-dom to extend Jest's expect with DOM testing:


>- **import '@testing-library/jest-dom';**

## Step 5. Create src/mockStyles.js (if needed)

>- If your project uses stylesheets, create mockStyles.js in the src directory to mock CSS imports during tests:

```javascript
module.exports = {};

```
## Step 6. Running Tests

- You can now run your Jest tests using:


## Step 7. Write tests in files with .Adduser.test.js or .UpdateUser.test.js extensions, e.g.

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## Step 8. Folder Structure 
```
src/
  components/
    AddUser.jsx
    UpdateUser.jsx
    UserTable.jsx
  __tests__/
    AddUser.test.js
    UpdateUser.test.js
    UserTable.test.js
    App.test.js
  App.jsx
  setupTests.js

```

## Step 9. Run tests

>- **npm test**




