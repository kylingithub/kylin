(function(){
  function setYear(){
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  var currentExpanded = null;

  function expand(card){
    if (!card) return;
    if (currentExpanded && currentExpanded !== card){
      collapse(currentExpanded);
    }
    card.classList.add('flipped');
    card.classList.add('expanded');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    card.setAttribute('aria-pressed', 'true');
    currentExpanded = card;
  }

  function collapse(card){
    if (!card) return;
    card.classList.remove('expanded');
    card.classList.remove('flipped');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    card.setAttribute('aria-pressed', 'false');
    if (currentExpanded === card){
      currentExpanded = null;
    }
  }

  function wireInteractions(){
    var grid = document.getElementById('cardGrid');
    if (!grid) return;

    grid.addEventListener('click', function(e){
      var card = e.target.closest('.flip-card');
      if (!card || !grid.contains(card)) return;
      if (card.classList.contains('expanded')){
        collapse(card);
      } else {
        expand(card);
      }
    });

    grid.addEventListener('keydown', function(e){
      var card = e.target.closest('.flip-card');
      if (!card || !grid.contains(card)) return;
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        if (card.classList.contains('expanded')){
          collapse(card);
        } else {
          expand(card);
        }
      }
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && currentExpanded){
        collapse(currentExpanded);
      }
    });
  }

  function init(){
    setYear();
    wireInteractions();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


