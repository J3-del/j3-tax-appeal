// Countdown to the Class 1 filing deadline: March 15, 2027, 5:00 PM ET.
// Class 1 applications must be RECEIVED by the Tax Commission by March 15
// (next business day when the 15th falls on a weekend). March 15, 2027 is a Monday.
(function(){
  var el = document.getElementById('countdown');
  if(!el) return;
  var deadline = new Date('2027-03-15T17:00:00-04:00').getTime();
  function tick(){
    var ms = deadline - Date.now();
    if(ms <= 0){ el.textContent = 'Deadline passed'; return; }
    var d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60;
    el.textContent = d + ' days, ' + h + ' hrs, ' + m + ' min left to file';
  }
  tick(); setInterval(tick, 60000);
})();

// Intake form. Works with Web3Forms (recommended: 250 free submissions/mo) or
// Formspree. To go live: create the form backend with the business's lead email,
// then paste the endpoint and any required key below. For Web3Forms set
// FORM_ENDPOINT to https://api.web3forms.com/submit and FORM_EXTRA_FIELDS to
// { access_key: 'YOUR-KEY' }; for Formspree set FORM_ENDPOINT to
// https://formspree.io/f/XXXXXXXX and leave FORM_EXTRA_FIELDS empty.
// While FORM_ENDPOINT is empty the form stays honest — it tells the visitor
// online requests are not connected yet instead of pretending a submit worked.
var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
var FORM_EXTRA_FIELDS = { access_key: 'e9acd562-8d4e-4de9-b7d1-4bd93364c856' };

document.getElementById('intakeForm').addEventListener('submit', function(e){
  e.preventDefault();
  var f = e.target;
  if(!f.checkValidity()){ f.reportValidity(); return; }
  var note = document.getElementById('formNote');

  if(!FORM_ENDPOINT){
    note.textContent = 'Online requests are not connected just yet. The J3 representative who shared this page can take your details today — and this form goes live shortly.';
    note.classList.remove('success');
    return;
  }

  var btn = f.querySelector('button[type=submit]');
  btn.disabled = true;
  var data = new FormData(f);
  Object.keys(FORM_EXTRA_FIELDS).forEach(function(k){ data.append(k, FORM_EXTRA_FIELDS[k]); });
  data.set('subject', 'J3 intake: ' + (data.get('address') || 'new lead'));
  data.set('from_name', 'J3 Site Intake');
  fetch(FORM_ENDPOINT, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(function(res){
    if(res.ok){
      note.textContent = 'Thank you - your details are in. We will pull your assessment and recent nearby sales and be in touch with a straight answer. Nothing is filed until you review and sign your application.';
      note.classList.add('success');
      f.reset();
    } else {
      throw new Error('submit failed');
    }
  }).catch(function(){
    note.textContent = "Something didn't go through. Please try again — or leave your details with the J3 representative who shared this page.";
    note.classList.remove('success');
  }).finally(function(){
    btn.disabled = false;
  });
});
