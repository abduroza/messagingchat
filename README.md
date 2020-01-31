### Requirements

- You need to install Node js and MongoDB

### How to use

1. Clone the project app from gitlab.
   `git clone git@gitlab.com:abduroza/contribution.git` or `git clone https://gitlab.com/abduroza/contribution.git`

2. Go to project app directory. Open the app!.
   `cd contribution`

3. Install dependency.
   `npm install`

4. Create a `.env` file. Can see at the `sample.env` file

5. Run app to start development server.
   `npm run dev`

6. Getting started with register user.
   Open postman!. Fill URL with `localhost:7000/api/v1/user/register` and select `x-www-form-urlencoded` on the `request body` tab and enter the field name `fullname`, `username`, `email`, `password`, `role`.

For frontend developer can access documentation at `https://documenter.getpostman.com/view/8276664/SWTD6w1J`
