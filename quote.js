/**
 * Gets a quote from https://theysaidso.com/api/
 *
 * Written By: Jay Harris
 * Date Written: 22/07/2015
 */

const wikiquote = require("./wikiquote.js");

//Gets a quote from the specified author and passes it into the callback
const quote = (author, callback) => {
    if (!author || author.length == 0) {
        callback("Um.. what do you expect me to do?");
        return;
    }

    wikiquote.getRandomQuote(author, (quote) => {
        callback('"' + quote.quote + '" - ' + quote.titles);
    }, (message) => {
        callback("Couldn't find any quotes :'(");
    });
}

// Make the quoter do its thing
exports.run = (api, event) => {
    // Strip the command and obtain the author
    const author = event.arguments_body;

    // get the quote
    quote(author, (result) => {
        //Send the quote to Facebook
        api.sendMessage(result, event.thread_id);
    });
};
