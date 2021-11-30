# Outergram Project

> ## Description of app
        -Outergram app is a clone of instagram.com. The app enables users to post images and connect with others through their posts. Users can like and comment on posts as well as follow,
        message and view other users posts.
> ## How to start development environment

                        -1. Clone this repository

                           ```bash
                           git clone https://github.com/joeypeterson15/ig-clone
                           ```

                        2. Install dependencies

                              ```bash
                              pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
                              ```

                        3. Create a **.env** file based on the example with proper settings for your
                           development environment
                        4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

                        5. Get into your pipenv, migrate your database, seed your database, and run your flask app

                           ```bash
                           pipenv shell
                           ```

                           ```bash
                           flask db upgrade
                           ```

                           ```bash
                           flask seed all
                           ```

                           ```bash
                           flask run
                           ```

                        6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


> ## Technologies used
        -React, node.js, javascript, python, flask, flask sqlalchemy, postgres


> ## Link to live site
        -https://outergram.herokuapp.com/


> ## Link to Wiki docs
        -https://github.com/joeypeterson15/ig-clone/wiki


>## Discussion of two features that show off the my technical abilities
        - Feature 1: Users can create tags for posts by using a pound symbol. Clicking on hashtag names will direct the user to a hashtag page with posts with that hashtag.
        - Feature 2: A direct message page where users can search for other users and message them.

> ## Discussion of both challenges faced and the way the team solved them
        - One of the challenges I faced and will continue to work on is getting my posts slice of state to all live under one roof in the store. I tried to limit the amount of nested
      slices of state in the app. I did this by filtering out posts in the backend so that posts for mainfeed, posts for profile feed, posts for user profiles are all different in the store.
      In hindsite, I think it would have been easier to take more advantage of reacts store and just fetch all posts and filter them out accordingly in the front end.

      - A big challenge I faced was creating hashtags along at the same time a post is created and connecting the hashtags with that post. I had a hard time thinking about how I could connect hashtags
      to a post that was not created at, or in other words, a post that did not have an identification I could connect the hashtags too. I solved this by using a dispatch for hashtags inside the thunk action
      for creating a post, so that when the post is created and returns to the createpost thunk action, a hashtag is created for each tag in the post using the id of the newly generated post.

> ## Code snippet highlighting hashtag and post creation thunk actions


      export const createOnePost = (payload, hashArray) => async dispatch => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })

    if (response.ok) {
        const post = await response.json()

        if(!!hashArray) {

            for (let i = 0; i < hashArray.length; i++) {
                await fetch(`/api/hashtags/${hashArray[i]}/${post.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                },
                // body: JSON.stringify({...name})
              })
            }
        }
        dispatch(createPost(post))
    }
}

> ## Code snippet highlighting useEffect for searching for users

      **results is a list of users that match the state variable, term, which is tracked
      and saved upon any change in search input bar.

     useEffect(()=> {
    if(term.length > 0) {

      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== sessionUser?.username )); console.log(json)}).catch(e => console.log(e));

    } else (setResults(""));

  }, [term])




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```
# Instagram-clone
# ig-clone
