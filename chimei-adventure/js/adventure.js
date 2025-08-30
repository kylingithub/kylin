(function(){
  // Client-side reveal without storing real keys/answers in code.
  // Provide ciphertext blobs (salt, iv, cipherText) generated with the tool at tools/encrypt.html
  const encryptedClue1 = {
    "salt": "R810/KSjVXC5m8nWYvn+Rw==",
    "iv": "cgi1hEzgmgYEB5bP",
    "cipherText": "5wtdbbBJrlAXi2m16zthaFngU45VoiZRH90ITGOLNkzQ5NnWNZ0Yu6uWfGWHI5vBDTlwfyNy+R3OXBA5EXTZZ+MswXCU6wt9enC2hu6eWnCK3GskmeGBjJU="
  };
  const encryptedClue2 = {
    "salt": "u0Nzll8ntl9cy7kByAq4nQ==",
    "iv": "Wx6E+kfcVRkiw0WQ",
    "cipherText": "2sHhjDJ2QSoWvwbhZ8M/q+/5R2VIx6yyL5Fi5JGXZ7h1+2tGeA3I4ReH7SGZjNrS51YsKshR2o6dlCpHF2FWbCUZJd9cCMLkzAW5bg=="
  };

  const $ = (sel) => document.querySelector(sel);

  function b64ToBytes(b64){
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  async function deriveKey(passphrase, saltBytes){
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: saltBytes, iterations: 120000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
  }

  async function decryptWithPassphrase(passphrase, blob){
    if (!blob || !blob.salt || !blob.iv || !blob.cipherText) throw new Error('blob not configured');
    if (blob.salt.startsWith('REPLACE_') || blob.iv.startsWith('REPLACE_') || blob.cipherText.startsWith('REPLACE_')){
      throw new Error('cipher not set');
    }
    const salt = b64ToBytes(blob.salt);
    const iv = b64ToBytes(blob.iv);
    const data = b64ToBytes(blob.cipherText);
    const key = await deriveKey(passphrase, salt);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(new Uint8Array(plain)));
  }

  function init(){
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const form = $('#keyForm');
    const statusEl = $('#status');
    const res1 = $('#result1');
    const wordEl1 = $('#treasureWord1');
    const noteEl1 = $('#treasureNote1');
    const res2 = $('#result2');
    const wordEl2 = $('#treasureWord2');
    const noteEl2 = $('#treasureNote2');

    if(!form) return;

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      statusEl.textContent = '';
      res1.classList.remove('show');
      res2.classList.remove('show');

      const a = $('#key1').value || '';
      const b = $('#key2').value || '';

      let okCount = 0;
      try{
        const out1 = await decryptWithPassphrase(a, encryptedClue1);
        wordEl1.textContent = out1.word || '';
        noteEl1.textContent = out1.note || '';
        res1.classList.add('show');
        okCount++;
      }catch(err){ /* ignore */ }

      try{
        const out2 = await decryptWithPassphrase(b, encryptedClue2);
        wordEl2.textContent = out2.word || '';
        noteEl2.textContent = out2.note || '';
        res2.classList.add('show');
        okCount++;
      }catch(err){ /* ignore */ }

      if (okCount === 0){
        statusEl.textContent = '不是喔，答案不是這個';
      }else if (okCount === 1){
        statusEl.textContent = '答對了一個，再試試看！';
      }else{
        statusEl.textContent = '答對了兩個，您真內行！';
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();