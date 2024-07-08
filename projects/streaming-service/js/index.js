var intervalo;

function scrollDireita(){
  intervalo = setInterval(function(){ document.getElementById('scroller').scrollLeft += 1 }  , 5);
};
function scrollEsquerda(){
  intervalo = setInterval(function(){ document.getElementById('scroller').scrollLeft -= 1 }  , 5);
};
function clearScroll(){
  clearInterval(intervalo);
};

const clickableDiv = document.getElementById('clickableDiv');

clickableDiv.addEventListener('click', function() {
  // Open the desired page in a new tab
  window.open('http://144.126.147.217/Animes/Another/Episodio%2001.mp4', '_blank');
});
