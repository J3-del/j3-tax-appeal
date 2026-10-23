// Countdown to the Class 1 filing deadline: March 16, 2027, 5:00 PM ET
(function(){
  var el = document.getElementById('countdown');
  if(!el) return;
  var deadline = new Date('2027-03-16T17:00:00-04:00').getTime();
  function tick(){
    var ms = deadline - Date.now();
    if(ms <= 0){ el.textContent = 'Deadline passed'; return; }
    var d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60;
    el.textContent = d + ' days, ' + h + ' hrs, ' + m + ' min left to file';
  }
  tick(); setInterval(tick, 60000);
})();

// Intake form — validates and confirms. Wire to the intake endpoint before launch.
document.getElementById('intakeForm').addEventListener('submit', function(e){
  e.preventDefault();
  var f = e.target;
  if(!f.checkValidity()){ f.reportValidity(); return; }
  var note = document.getElementById('formNote');
  note.textContent = 'Thank you — your review request is noted. Intake for the 2027/28 season opens in January 2027 when the new assessment roll is published, and requests are handled in the order received.';
  note.classList.add('success');
  f.querySelector('button[type=submit]').disabled = true;
});
