# twitter-scraper
A node script used to scrape a twitter profile.

Pass in the schema and the file to process as the second and third
arguments of the node commmand...

`node Process.js twitter-schema.js BillGates.html`

You should get a json object containing all the tweets from the given
twitter profile.

This will work with any twitter profile and, if you make another schema,
can work with any webpage.

There's also a curl script here to automatically retrieve the page
from a url rather than a local .html file.