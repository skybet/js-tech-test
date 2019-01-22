# Background To The Test

## Useful Terms

### Event

An event is a collection of betting opportunities typically linked to a specific real-world event such as a football match, horse race or TV show (yes, really). For the purposes of this test, an event always refers to a football match.

### Event Class

The "class" of an event typically links to the type of sport the event belongs to. While a typical betting website offers odds on more than just sports, for the purposes of this test you can assume that `classId` implicitly means `sportId`. All the events will belong to the "Football" class.

### Event Type

The "type" of an Event refers to the competition or grouping of an event. For example, in the Football class, types typically refer to competitions such as "Premier League", "FA Cup" and "Football Live".

Live Football events have an extra type hint (`linkedEventTypeName`) so it is possible to link a live game to the original competition it belonged to. The reasons behind having a "Football Live" type are long and complicated and will not help with your submission for this test!

### Price

A price represents the odds for a specific betting opportunity. Prices are typically represented as fractions (10/1) or decimals to two decimal places (11.00)

### Outcome

An outcome refers to a price and the name of a specific betting opportunity. For example, in the "Both Teams To Score" market, an outcome would include a name (i.e. "Yes") and a price (i.e. "10/1").

Outcomes can also include a `type` property which is used to help with non-standard display of markets. E.g. an outcome belonging to a `win-draw-win` style market will have a type that describes its position - either `home`, `draw` or `away`

Outcomes have various status flags, the most relevant to this test being the `suspended` property. This indicates is the price is available to bet on or not.

Confusingly, outcomes can also be known as "selections". While that terminology isn't used here, if you have some experience of betting you might have heard this phrase and it's worth noting that they are effectively the same thing.

### Market

A market represents a grouping of outcomes and sets the contexts for each of the bets you can place. For example, the "Full Time Result" market offers three outcomes "Home", "Draw" or "Away" (although the names for "Home" and "Away" can differ).

Similar to outcomes, a market can have a `type` property which can be used to decide on a different type of layout to best suit the format of the outcomes.

Markets can also be `suspended` - this affects all prices belonging to the market and any API responses and websocket messages should reflect this relationship so all data remains in sync.

> Note:
>
> All the data types mentioned above include a status flag which states whether the item can be displayed or not. This `displayable` property should be used to filter the data returned from an API so only the relevant items are shown on screen.
>
> If market is considered displayable but it contains no displayable outcomes, then it too should not be displayed. Similarly, if an event is considered displayable but has no displayable markets, it too should not be displayed.

## Visual Examples

![Events displayed on the Sky Bet homepage](./images/homepage.png)

![Events displayed on the Sky Bet in-play page](./images/live-overview.png)

![Outcome status explained](./images/outcome-status.png)

![Standard market example](./images/standard-market.png)

![Correct Score market example](./images/correct-score-market.png)

## Appendix A: Event WebSocket Response Example

```json
{
  "type": "EVENT_DATA",
  "data": {
    "event": {
      "eventId": 21249939,
      "name": "Shanghai Shenhua 0 v 0 Shandong Luneng Taishan",
      "displayOrder": -1000,
      "sort": "MTCH",
      "linkedEventId": 21228740,
      "classId": 5,
      "className": "Football",
      "typeId": 10003971,
      "typeName": "Football Live",
      "linkedEventTypeId": 10005942,
      "linkedEventTypeName": "Chinese Super League",
      "startTime": "2017-09-19T11:35:23.000Z",
      "scores": { "home": 0, "away": 0 },
      "competitors": [
        { "name": "Shanghai Shenhua", "position": "home" },
        { "name": "Shandong Luneng Taishan", "position": "away" }
      ],
      "status": {
        "active": true,
        "started": true,
        "live": true,
        "resulted": false,
        "finished": false,
        "cashoutable": true,
        "displayable": true,
        "suspended": false,
        "requestabet": false
      },
      "boostCount": 0,
      "superBoostCount": 0,
      "markets": [93649849, 93649179, 93649150, 93649398, 93649188]
    }
  }
}
```

## Appendix B: Market WebSocket Response Example

```json
{
  "type": "MARKET_DATA",
  "data": {
    "market": {
      "marketId": 93649179,
      "eventId": 21249939,
      "name": "Both Teams To Score",
      "displayOrder": -32499,
      "type": "standard",
      "status": {
        "active": true,
        "resulted": false,
        "cashoutable": true,
        "displayable": true,
        "suspended": false,
        "noExtraTime": false,
        "live": true
      },
      "liabilities": { "livePriceLimit": 2500 },
      "spAvail": false,
      "outcomes": [367528211, 367528215]
    }
  }
}
```

## Appendix C: Outcome WebSocket Response Example

```json
{
  "type": "OUTCOME_DATA",
  "data": {
    "outcome": {
      "outcomeId": 367528215,
      "marketId": 93649179,
      "eventId": 21249939,
      "name": "No",
      "displayOrder": 20,
      "result": { "place": 0, "result": "-", "favourite": false },
      "linkedOutcomeId": 366480090,
      "price": { "den": 7, "num": 1, "decimal": 1.1428571428571428 },
      "status": {
        "active": true,
        "resulted": false,
        "cashoutable": true,
        "displayable": true,
        "suspended": false,
        "result": "-"
      }
    }
  }
}
```
