# Reddit Discussion Network Visualization
This is a network visualization of Reddit discussions.  You can choose a post
from the front page, or add a link from a reddit discussion, for example:
"http://www.reddit.com/r/IAmA/comments/1jd005/we_are_engineers_and_scientists_on_the_mars/"

The data is obtained from the Reddit API, the network is built with
[D3js](http://d3js.org/), and
the content previews are generated with
[Embedly](https://github.com/embedly/embedly-jquery).

OP is colored orange, all other nodes are black. If they post more than once, I
give them a random color.  The URL updates to reflect the conversation you are
viewing, so you can share that URL to share the network.

### Some dependencies
This uses Foundation, an icon library from Foundation, jQuery, D3, and Embedly jQuery
