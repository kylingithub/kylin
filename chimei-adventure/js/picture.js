(function(){
  // Configure your cards here
  // Each entry maps to one flip-card element
  var PICTURE_CARDS = [
    {
      badge: '提示 1',
      title: '「花與光」',
      description: '在哪裡，花朵與彩光會相遇？',
      imageUrl: 'https://images.unsplash.com/photo-1541690211439-9fb9f05fefe5?q=80&w=1200&auto=format&fit=crop',
      imageAlt: '玫瑰窗'
    },
    {
      badge: '提示 2',
      title: '「天使引路」',
      description: '誰的手勢指向下一步？',
      imageUrl: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop',
      imageAlt: '雕像'
    },
    {
      badge: '提示 3',
      title: '「回聲之門」',
      description: '在回聲最清晰的拱下。',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop',
      imageAlt: '長廊'
    }
  ];

  function createCard(card){
    var article = document.createElement('article');
    article.className = 'flip-card';
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-pressed', 'false');

    var inner = document.createElement('div');
    inner.className = 'flip-inner';

    var front = document.createElement('div');
    front.className = 'face front';
    var frontContent = document.createElement('div');
    frontContent.className = 'face-content';

    var badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = card.badge || '';
    var title = document.createElement('h2');
    title.className = 'title';
    title.textContent = card.title || '';
    var desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = card.description || '';

    frontContent.appendChild(badge);
    frontContent.appendChild(title);
    frontContent.appendChild(desc);
    front.appendChild(frontContent);

    var back = document.createElement('div');
    back.className = 'face back';
    var img = document.createElement('img');
    img.src = card.imageUrl;
    img.alt = card.imageAlt || '';
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    article.appendChild(inner);
    return article;
  }

  function renderCards(){
    var grid = document.getElementById('cardGrid');
    if(!grid) return;
    grid.innerHTML = '';
    for (var i=0;i<PICTURE_CARDS.length;i++){
      grid.appendChild(createCard(PICTURE_CARDS[i]));
    }
  }

  function wireInteractions(){
    var grid = document.getElementById('cardGrid');
    if(!grid) return;
    grid.addEventListener('click', function(e){
      var card = e.target.closest('.flip-card');
      if (!card) return;
      card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', card.classList.contains('flipped') ? 'true' : 'false');
    });

    Array.prototype.forEach.call(document.querySelectorAll('.flip-card'), function(card){
      card.addEventListener('keydown', function(ev){
        if(ev.key === 'Enter' || ev.key === ' '){
          ev.preventDefault();
          card.classList.toggle('flipped');
          card.setAttribute('aria-pressed', card.classList.contains('flipped') ? 'true' : 'false');
        }
      });
    });
  }

  function init(){
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    renderCards();
    wireInteractions();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();

