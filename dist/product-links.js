const innocadCard=document.querySelector('.innocad-promo');innocadCard.addEventListener('click',event=>{if(event.target.closest('a,button'))return;window.location.assign('innocad.html')});
