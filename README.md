# Wordle Stats Mover

This is a pair of bookmarklets for the people who still refuse to connect their Wordle score to a New York Times account. One lets you export your stats to a JSON file, and the other lets you import them from same file again.

## Usage

### Save State

Add the following text as a bookmark named `Wordle - Save State`:

<!-- bookmarklets/save-state.js -->
```js
javascript:(()=%3E%7Bconst%20e=Object.keys(window.localStorage).filter((e=%3Ee.includes('wordle'))).reduce(((e,o)=%3E(e%5Bo%5D=window.localStorage.getItem(o),e)),%7B%7D),o=%60data:application/json,$%7BencodeURIComponent(JSON.stringify(e))%7D%60,t=new%20Date,n=%60wordle-backup-$%7Bnew%20Date(t.valueOf()-6e4*t.getTimezoneOffset()).toISOString().split('T')%5B0%5D%7D.json%60,a=document.createElement('a');Object.assign(a,%7Bhref:o,download:n,style:%7Bdisplay:'none'%7D%7D),document.body.appendChild(a),a.click(),a.remove()%7D)();

```
<!-- END -->

Go to Wordle and activate the bookmarklet. Your browser will prompt you to download a JSON file which contains your save data; put it somewhere you can access it from the destination browser.

### Load State

Add the following text as a bookmark named `Wordle - Load State`:

<!-- bookmarklets/load-state.js -->
```js
javascript:(()=%3E%7Bconst%20e=(n,r)=%3E%7Bif(n==e)n=document.createDocumentFragment();else%7Bif('function'==typeof%20n)return%20n(r);n=document.createElement(n)%7Dconst%7Bchildren:o,ref:t,...i%7D=r;for(const%20e%20in%20i)e%20in%20n?n%5Be%5D=i%5Be%5D:!1!==(i%5Be%5D??!1)&&n.setAttribute(e,i%5Be%5D);return%20n.append(...%5B%5D.concat(o??%5B%5D).filter((e=%3Enull!=e))),t?.(n),n%7D,n=e;let%20r,o,t;document.head.append(e('style',%7Bchildren:'._lzbpq%7Bbackground:#fff;inset:0;line-height:normal;padding:16px;position:absolute;z-index:10000%7D._lzbpq%20code%7Bbackground:#eee;border-radius:3px;font-family:monospace;padding:0%203px%7D._4buhh%7Bcolor:red%7D._lzbpq%20form%7Bdisplay:flex;flex-direction:column;max-width:500px;row-gap:8px%7D'%7D)),document.body.append(e('div',%7Bclass:'_lzbpq',children:n('form',%7Bonsubmit:async%20r=%3E%7Br.preventDefault();const%20i=o.files%5B0%5D,l=await(e=%3Enew%20Promise(((n,r)=%3E%7Bconst%20o=new%20FileReader;o.onload=()=%3E%7Bn(o.result)%7D,o.onerror=r,o.readAsText(e)%7D)))(i);let%20a;try%7Ba=JSON.parse(l)%7Dcatch(r)%7Breturn%20void(t.innerHTML=n('p',%7Bchildren:%5B'There%20was%20an%20error%20parsing%20the%20file%20',e('code',%7Bchildren:i.name%7D),':','%20',e('code',%7Bclass:'_4buhh',children:r.message%7D)%5D%7D).outerHTML)%7Dfor(const%20e%20in%20a)localStorage.setItem(e,a%5Be%5D);location.reload()%7D,children:%5Bn('label',%7Bfor:'bak-inp',children:%5B'Open%20your%20',e('code',%7Bchildren:'wordle-backup.json'%7D),'%20file:'%5D%7D),e('input',%7Bref:e=%3Eo=e,type:'file',id:'bak-inp',accept:'application/json',onchange:()=%3E%7Br.disabled=0===o.files.length%7D%7D),e('button',%7Bref:e=%3Er=e,disabled:!0,children:'Submit'%7D),e('div',%7Bref:e=%3Et=e%7D)%5D%7D)%7D))%7D)();

```
<!-- END -->

Go to Wordle in the destination browser and open the bookmarklet. You will be prompted to upload your JSON backup; once you do, the page will reload and you should have exactly the same state as if you reloaded the source browser.
