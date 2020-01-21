function log(msg) {
  // console.log(msg);
}
log("We're on github!!!");

function getLineNumberFromBlobElement(blobDocument) {
  // Contains the table of line numbers
  var tableDocument = blobDocument.getElementsByTagName("table")[0];
  // Looks like "discussion-diff-864481311"
  var discussionId = tableDocument.id;

  // Now find the first child whose id looks like "discussion-diff-864481311R57" i.e. "{DISCUSSION_ID}R{LINE_NUMBER}"
  var allRightSideLineElements = blobDocument.querySelectorAll(`[id^='${discussionId}R']`);
  // Get the "data-line-number" attribute
  return allRightSideLineElements[0].attributes["data-line-number"].value;
}

function getFilePathFromHeaderDocument(headerDocument) {
  var headerThing = headerDocument.getElementsByTagName("a")[0];
  // Assuming the "title" attribute is always the full untruncated path of the file
  return headerThing.attributes["title"].value;
}

function getProtocolLink(projectId, filePath, lineNumber) {
  var scheme = "canopenr";
  var authority = "open";
  var projectIdQueryPart = `project=${projectId}`
  var fileQueryPart = `file=${filePath}`;
  var lineNumberQueryPart = `line=${lineNumber}`;

  var unencodedLink = `${scheme}://${authority}?${projectIdQueryPart}&${fileQueryPart}&${lineNumberQueryPart}`;
  return encodeURI(unencodedLink);
}

function addProtocolLinkToHeaderDocument(headerDocument, link) {
  var wandUrl = chrome.runtime.getURL("icons/magic_wand_512.png");
  var img = document.createElement("img");
  img.width = 16;
  img.height = 16;
  img.src = wandUrl;

  // Now surround that image with an "a" tag
  var containerTag = document.createElement("a");
  containerTag.href = link;
  // containerTag.href = "https://google.com"'
  containerTag.appendChild(img);

  // Now add the container
  headerDocument.insertBefore(containerTag, headerDocument.firstChild);
}

// Get the project identifier
// https://github.com/radixdev/can-opener/pull/2824 is identified by "radixdev/can-opener"
var currentUrl = location.href;
var regexp = /https\:\/\/github.com\/((.*)\/(.*))\//;
var projectIdRegexCapture = currentUrl.match(regexp);
var projectId = projectIdRegexCapture[2];
log(`Project id ${projectId}`);

// Thread Container - Box of content based on lines of code for a given file
var threadContainerElements = document.getElementsByClassName('mt-0 bg-white file js-comment-container js-resolvable-timeline-thread-container has-inline-notes');

// Each container has a
// "file header" - Just says the file being commented on. This is where we'll put our deeplink button.
// "blob wrapper" - Actually shows the code being commented on. Also shows the line numbers in question.
// "inline comments" - Comments from other Github users. Not relevant to this extension.
for (var i=0; i < threadContainerElements.length; i+=1) {
  try {
    var threadContainer = threadContainerElements[i];

    //
    // Retrieve the line number from the blob. The new line numbers are on the right visually in the table.
    //
    var blobElement = threadContainer.getElementsByClassName('blob-wrapper border-bottom')[0];

    var lineNumber = getLineNumberFromBlobElement(blobElement);
    log(`Got line number ${lineNumber}`);

    //
    // Get the file name from the header.
    //
    var headerDocument = threadContainer.getElementsByClassName('file-header')[0];
    var filePath = getFilePathFromHeaderDocument(headerDocument);
    log(`Got file ${filePath}`);

    //
    // Now edit the header document to have our special "goto IDE button"
    //
    var deeplink = getProtocolLink(projectId, filePath, lineNumber);
    addProtocolLinkToHeaderDocument(headerDocument, deeplink);
  } catch (err) {
    log("Failed to add deeplink");
    log(err);
  }
};