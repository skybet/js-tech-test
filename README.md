# Sky Betting & Gaming Tech Test

This test comes with a mock API and WebSocket server that represents a snapshot of some live football events we offer betting on at Sky Bet.

The challenge is to build a lightweight application to display the events returned by the API and enable users to browse for more details and betting opportunities.

Full details of the API are available [on the docker hub page](https://hub.docker.com/r/sbgtechtest/api/) and further information about terms used, example API responses and the betting domain in general are available in [the background docs](./Background.md)

## The Test

We realise everyone has different levels of skill and experience when it comes to development so we have listed different levels of tasks below for you to choose from. If you do not have the time or the knowledge to complete them all then that's ok, we just want to see how you approach the problem and get a feel for how you code.

The API uses a snapshot of Sky Bet's catalogue as the underlying data source. The start times for the events are accurate as of the snapshot so can be used for displaying as an absolute value only. They should not be used to calculate the amount of time elapsed in a game as they will be hugely inaccurate!

It is possible to explore the catalogue using the HTTP endpoints provided, however, we ask that you try and use the WebSocket connection to handle all data fetching as part of this test.

> We have structured the test below with what we consider to be a sensible way of building up the application iteratively and sequentially. You are free to work on as many or as few of the subtasks (and in any order) that you feel showcases your capabilities best

### Task One

Using the provided WebSocket API:
1. Build an application which displays the currently live Football events. An example of making this request is shown below.
2. Add an option to show the primary market for each of the events
   1. The primary market should also result in the odds showing for any outcomes linked to the market
3. Add a feature to toggle the odds display between fractional and decimal (this should apply globally to any place in the app where odds are shown)

```javascript
// The WebSocket API responds to several different actions: getEvent, getMarket, getOutcome and getLiveEvents
// To fetch all the currently live events (without primary markets) you can do something similar to the below
// NB. All payloads to the WebSocket API should be stringified
websocket.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: false}));
```

### Task Two

1. Add a feature to allow users to browse for full details for one of the events (this may be a new page or some other mechanic)
    1. Use as much of the detail in the Event response as possible to inform the user of meta data such as event type, start time and scores
2. Event responses sent via the WebSocket only include an array of IDs for the markets it includes. Use the Event payload to build further queries to the API so you can show a list of all the markets available for the event.
3. Markets similarly contain an array of IDs for outcomes. Use this data to initially show the outcomes for the first ten markets only.
   1. Markets should be sorted by displayOrder (ascending) and then name.
4. Add the ability to load the outcomes for a market on demand (on skybet.com this happens when the market's accordion is clicked)
5. Use the `displayable` status to filter events, markets and outcomes which should not be shown to the user

### Task Three

1. Use the ability to subscribe to updates for events, outcomes and markets of interest. Handle these updates so that the UI correctly reflects any changes to data currently being displayed on the page.
   1. Use the included images to help understand what `status.suspended` implies for the User.
   2. Consider how the different levels of subscription affect the data received via the WebSocket.
2. On the overview page, instead of showing all events in one list, group them by their `linkedEventTypeName` property. A missing value should cause the grouping to fall back to the `typeName` property.
    1. Additionally, anywhere you are displaying full details of an event, where possible use the `linkedEventTypeName` to highlight the competition the event belongs to.
3. Add support for displaying markets with different types (i.e. `win-draw-win` and `correct-score`) with more appropriate layouts. (See the [live website](https://m.skybet.com) for inspiration.)
4. Allow the user to click on outcomes to add them to a bet slip. The bet slip should display enough information about the selected outcome for the user to be able to see the event name, market name, outcome name and odds.
5. Manage WebSocket subscriptions to allow the bet slip to listen for updates to selected outcomes and markets as and when they change, and invalidate selections as appropriate.

## Languages

This is a "client side" focused test so the end deliverable should be viewable as a standard website. How you get there is up to you, though it's worth noting that we typically support a stack that uses technology such as PHP, node.js and React. We don't require you to write any form of server component but ask that you consider how you can ensure your submission will run effectively on any potential reviewers computer. 

## Review Criteria

All tech test submissions (for any of our tech tests) are anonymised and reviewed using a standard template.

At a high level we will be looking for:
* Clear instructions for how to run the application on a reviewer's machine
* Good understanding of the tasks undertaken and content presented in a clear, understandable format
* Well structured code
* High quality code that uses relevant design patterns
* Appropriate unit tests
* Security best practices applied
* Good understanding of errors and how to handle them

There's flexibility in the review process to take into account candidates who have strengths in different areas. Submissions that are very strong on visual design, UX and css are equally as valid as those which focus on the underlying code.

As mentioned previously, we aren't prescribing any specific languages, libraries or frameworks for the test but obviously the reviewer will need to take into account choices made in this area. For example, a submission using a technology like [create react app](https://github.com/facebookincubator/create-react-app) or [ember.js](https://www.emberjs.com/) will potentially offer a more complete set of tasks than one attempting to build everything from scratch. It is up to you to decide how pragmatic you wish to be. Make sure you choose an approach which you feel will show off your talents most effectively.

## Getting Started

### System Requirements

* Docker

### Running the API and Websocket Server

Full details of the API are available [on the docker hub page](https://hub.docker.com/r/sbgtechtest/api/). We would recommend running with `docker-compose up` so any logs from the API are visible in the terminal.

```bash
# running the basic image
docker run -it --rm --name sbg-tech-test-api -p 8888-8890:8888-8890 sbgtechtest/api:2.0.0

# running using docker compose
docker-compose up

# running using docker compose in the background
docker-compose up -d
```

The API will now be available on `http://localhost:8888/` and you should be able to view the available routes by hitting the API root. 

If you are developing on Windows it's likely that docker won't have mapped the ports to `localhost`. Run `docker-machine ip default` to find the correct IP, the ports and endpoints will be the same.

The WebSocket Server will be available on `ws://localhost:8889` and you can test this is working by subscribing to all outcome updates:

```javascript
// In your browser's console add the following one line at a time
const w = new WebSocket("ws://localhost:8889");
w.addEventListener("message", m => console.log(JSON.parse(m.data)));
w.send(JSON.stringify({type: "subscribe", keys: ["o.*"]}));
w.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: false }));
```

See the documentation [on the docker hub page](https://hub.docker.com/r/sbgtechtest/api/) for full details of the WebSocket interface.

## The Deliverable

Replace the contents of this README.md with:

  1. A covering note explaining the technology choices you have made.
  1. Any instructions required to run your solution and tests in a Linux environment.

Email as an attachment or a link the git bundled repository showing your commit history with all your commits on the master branch:

        git bundle create <anything>.bundle --all

## Equality & Diversity 

We consider all candidates equally, fairly and without bias.  To that end, we ask that you do not leave any personally identifying information in your submission (such as your name within an author field or file, or in use as test data).  We run all VCS-based submissions through an anonymiser before assessment, so that there is no identifying information in the commit history, but this will only remove references in the committing author and email address, not deep in the code submitted.
