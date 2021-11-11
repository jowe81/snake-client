# Snake Client
A client for the Lighthouse Labs [snek-multiplayer](https://github.com/lighthouse-labs/snek-multiplayer) Snake server.

_To take advantage of all the features of this client, you can use [my fork of the LHL repo](https://github.com/jowe81/snek-multiplayer), which supports broadcast messages._
## Features:

### Navigation
* Navigate your snake with the `w`, `a`, `s`, `d` keys, _or_
* configure your own key bindings

### Messages
* Send a canned message to other players by hitting any digit (`0` - `9`)
* Hit `m` to compose a free-text message (characters won't show while you type)
  * When done typing, hit `m` again to send and then discard the free-text message, _or_
  * Hit any digit (`0` - `9`) to send and store the free-text message in the respective slot.

### Console Feedback
* The client will log all activity to the console
* If supported by the server, the client will display the following broadcast messages:
  * A new player logging on
  * A player setting/changing their name
  * Crashes and collisions with player names
  * A player otherwise leaving the game

## Instructions
### Install it:
```bash
git clone https://github.com/jowe81/snake-client
```
### Configure it:
* Visit the configuration file, ```constants.js```, to edit your name, connection information, key bindings, and canned messages.
* Note that command line arguments take precedence over settings in ```constants.js```.

### Run it:
```bash
cd snake-client
node play [-name yourName] [-ip serverAddress] [-port portNumber]
```
