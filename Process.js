const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Pass in the schema and the file to process as the second and third
// arguments of the node commmand...
const linkedin = require(process.argv[2]);

console.log('converting...');

fs.readFile(process.argv[3], 'utf8', (err, file) => {

  let getElementFromHtml = function(selector, html) {
    html = new JSDOM(html);
    try {
      if(selector.slice(0,1) === '.') {
        element = html.window.document.getElementsByClassName(selector.slice(1));
      } else if (selector.slice(0,1) === '#') {
        element = html.window.document.getElementById(selector.slice(1));
      } else if (selector.slice(0,1) === ':') {
        element = html.window.document.getElementsByTagName(selector.slice(1));
      } else {
        return 'Error: input selector didn\'t match the class (.), id (#) or tag (:) format: ' + selector;
      }
    } catch (err) {
      console.log(err);
      console.log('No ' + selector + ' found.');
    }
    return element;
  }

  // getText always just returns the first item in the given array.
  // Have this do some text processing, like removing trailing 
  // whitespace and checking the "type" attr to return numbers or
  // booleans.
  let getText = function(htmlEl, type, regex) {
    let result;
    try {
      result = htmlEl[0].textContent;
    } catch(err) {
      console.log('getText() was unable to extract text from ' + htmlEl + ', returning undefined.')
      return undefined;
    }
    if(type === 'number') {
      // Remove non-numerical chars and convert to a number.
      result = Number(result.replace(/\D/g, ''));
    }
    if(type === 'string' || type === undefined) {

      if(regex) result = result.replace(new RegExp(regex), '');

      result = result.replace(/  +/g, ' ');
      result = result.replace(/\n/g, '');
      result = result.replace(/^ +/g, '');
      result = result.replace(/ +$/g, '');
    }
    if(type === 'strictString') {

      if(regex) result = result.replace(new RegExp(regex), '');

      result = result.replace(/\n/g, '');
      result = result.replace(/\d/g, '');
      result = result.replace(/  +/g, ' ');
      result = result.replace(/\)/g, '');
      result = result.replace(/\(/g, '');
      result = result.replace(/,/g, '');
      result = result.replace(/^ +/g, '');
      result = result.replace(/ +$/g, '');
      result = result.replace(/ '/g, '\'');
    }
    return result;
  }


  // Loops over the linkedin object attributes array and 
  // creates a 'key: value' item for each one. 
  // This has changed slightly so that we must pass object[j].innerHTML 
  // into the last argument rather than having a seperate index.
  let keysVals = function(inputArr, outputObj, element, index) {
    index = index ? index : 0;
    for(let k = 0; k < inputArr.length; k++) {
      let childElement = getElementFromHtml(inputArr[k].selector, element[index].innerHTML);
      outputObj[inputArr[k].name] = getText(childElement, inputArr[k].type, inputArr[k].remove);
    }
  }

  let profile = {};

  // For every item in linkedin
  for(let i = 0; i < linkedin.length; i++) {

    // Grab the parent element or elements.
    console.log('WORKING ON: ' + linkedin[i].name);
    let parentArray = getElementFromHtml(linkedin[i].selector, file);

    if(parentArray && linkedin[i].type === 'array') {
      // Start the array off.
      profile[linkedin[i].name] = [];
      // console.log('Grabbing ' + parentArray.length + ' items from the DOM');
      for(let j = 0; j < parentArray.length; j++) {
        // Create an empty object for each parentArray item
        profile[linkedin[i].name].push({});
        keysVals(linkedin[i].attributes, profile[linkedin[i].name][j], parentArray, j);
      }
    } else if(linkedin[i].type === 'string') {
      profile[linkedin[i].name] = getText(parentArray, 'string', linkedin[i].remove);
    } else if(linkedin[i].type === 'strictString') {
      profile[linkedin[i].name] = getText(parentArray, 'strictString', linkedin[i].remove);
    } else if(linkedin[i].type === 'object' && parentArray[0] != undefined) {
      profile[linkedin[i].name] = {};
      keysVals(linkedin[i].attributes, profile[linkedin[i].name], parentArray);
    } else if(linkedin[i].type === 'number') {
      profile[linkedin[i].name] = getText(parentArray, 'number');
    }
  }
  
  // Now we have the profile we must assign an identifier to it
  // This way we can check and see if we want to update or create.
  // I'm going to use the url of their username. This is a site wide
  // identifyer that's used on all links to every person rendered
  // on a linkedin page and makes it really easy for us to check
  // records of people if we need to.

  // It looks like every linkedin profile has the first address item
  // auto set to be the user's linkedin handle.
  // const rgx = /([^/]+$)/g;
  // let url = profile.contact[0].address;
  // url = url.slice(url.search(rgx));

  // profile.identifier = { url: url };

  console.log(profile);

});