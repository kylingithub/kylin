(function(){
  // Configure your cards here
  // Each entry maps to one flip-card element
  var PICTURE_CARDS = [
    {
      badge: '1F',
      title: '圖片題1-1',
      description: '作品：『聖女貞德寓意』站在貞德背後的女子象徵著什麼？',
      imageUrl: './assets/1-1.png',
      imageAlt: '作品：聖女貞德寓意'
    },
    {
      badge: '1F',
      title: '圖片題1-2',
      description: '找出此動物的棲地',
      imageUrl: './assets/1-2.png',
      imageAlt: '弓角羚'
    },
    {
      badge: '1F',
      title: '圖片題1-7',
      description: '此武器是來自哪個國家？',
      imageUrl: './assets/1-7.png',
      imageAlt: '燧石槍'
    },
    {
      badge: '1F',
      title: '圖片題1-8',
      description: '猜猜我是誰？',
      imageUrl: './assets/1-8.png',
      imageAlt: 'buffalo'
    },
    {
        badge: '1F',
        title: '圖片題1-9',
        description: '此人物屬於哪一個民族？',
        imageUrl: './assets/1-9.png',
        imageAlt: '蒙古馬弓'
      },
      {
        badge: '1F',
        title: '圖片題1-11',
        description: '這個展品的名稱叫什麼？',
        imageUrl: './assets/1-11.png',
        imageAlt: 'Katar'
      },
      {
        badge: '1F',
        title: '圖片題1-12',
        description: '這是哪一部文學作品的角色？',
        imageUrl: './assets/1-12.png',
        imageAlt: '柯賽特'
      },
      {
        badge: '1F',
        title: '圖片題1-13',
        description: '此作品的底座印製的文字是什麼？',
        imageUrl: './assets/1-13.png',
        imageAlt: '有志者事竟成'
      },
      {
        badge: '2F',
        title: '圖片題2-1',
        description: '此物種的學名是什麼？______minor',
        imageUrl: './assets/2-1.png',
        imageAlt: '天堂鳥'
      },
      {
        badge: '2F',
        title: '圖片題2-9',
        description: '這個樂器的名稱是？',
        imageUrl: './assets/2-9.png',
        imageAlt: '蛇型號'
      },
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
    var currentExpanded = null;
    function expand(card){
      if (currentExpanded && currentExpanded !== card){ collapse(currentExpanded); }
      card.classList.add('flipped');
      card.classList.add('expanded');
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      currentExpanded = card;
      card.setAttribute('aria-pressed', 'true');
    }
    function collapse(card){
      card.classList.remove('expanded');
      card.classList.remove('flipped');
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      if (currentExpanded === card) currentExpanded = null;
      card.setAttribute('aria-pressed', 'false');
    }
    grid.addEventListener('click', function(e){
      var card = e.target.closest('.flip-card');
      if (!card) return;
      if (card.classList.contains('expanded')){ collapse(card); } else { expand(card); }
    });

    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && currentExpanded){
        collapse(currentExpanded);
      }
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

