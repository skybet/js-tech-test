# SkyBet/Stars Tech Test

### App Scaffold

I used create-react-app as I didn't want setting up babel/webpack to eat into the time of the test.

### State management

I tried to use React's built in features including hooks and context to manage the state and data within the application, as the app is built out, a third party library may be required but this sufficed for the purposes of the exercise.

### Tests

I used Jest for the tests because its the tool I'm most familiar with and has a much better developer experience than the others I've tried.

### Run app

Run server as described in the original task:

```
> docker run -it --rm --name sbg-tech-test-api -p 8888-8890:8888-8890 sbgtechtest/api:2.0.0
```

Pre-requisite: yarn

Build:

```
> yarn
```

Start:

```
> yarn start
```

### Run Tests

Interactive mode:

```
> yarn test
```

Full run:

```
> yarn test --watchAll=false
```
