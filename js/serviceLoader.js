window.addEventListener('load', ()=>{

  if('serviceWorker' in navigator){
    try {
      navigator.serviceWorker.register('https://mr-kumar.tk/serviceWorker.js');
      console.log("Service Worker Registered");
    } catch (error) {
      console.log("Service Worker Registration Failed");
    }
  }
});

