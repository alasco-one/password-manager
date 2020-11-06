console.log('Hello from the content-script')


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Once we receive a message from the popup
    if (request.msg) {
      // If message has the `action` key `print_in_console`
      if (request.msg.event === "host") {
        // print awesome text on console
        sendResponse(window.location.hostname);
      } 
      if(request.msg.event === "copy"){
        navigator.clipboard.writeText(request.msg.value).then(function() {
            /* clipboard successfully set */
            sendResponse();

          }, (err)=> {
            /* clipboard write failed */
            if(err) console.log(err);
          });
      }
    }
  });