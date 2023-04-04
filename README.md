# Wordle Stats Mover

This is a pair of bookmarklets for the people who still refuse to connect their Wordle score to a New York Times account. One lets you export your stats to a JSON file, and the other lets you import them from same file again.

## Usage

### Save State

Add the following text as a bookmark named `Wordle - Save State`:

<!-- bookmarklets/save-state.js -->
```js
javascript:(()=%3E%7Bvar%20a=Object.keys(window.localStorage).filter(e=%3Ee.includes(%22wordle%22)).reduce((e,n)=%3E(e%5Bn%5D=window.localStorage.getItem(n),e),%7B%7D),c=%60data:application/json,$%7BencodeURIComponent(JSON.stringify(a))%7D%60,o=new%20Date,l=new%20Date(o.valueOf()-o.getTimezoneOffset()*6e4),d=l.toISOString().split(%22T%22)%5B0%5D,s=%60wordle-backup-$%7Bd%7D.json%60,t=document.createElement(%22a%22);Object.assign(t,%7Bhref:c,download:s,style:%7Bdisplay:%22none%22%7D%7D);document.body.appendChild(t);t.click();t.remove();%7D)()
```
<!-- END -->

Go to Wordle and activate the bookmarklet. Your browser will prompt you to download a JSON file which contains your save data; put it somewhere you can access it from the destination browser.

### Load State

Add the following text as a bookmark named `Wordle - Load State`:

<!-- bookmarklets/load-state.js -->
```js
javascript:(()=%3E%7Bvar%20a=e=%3Enew%20Promise((i,d)=%3E%7Blet%20r=new%20FileReader;r.onload=()=%3E%7Bi(r.result)%7D,r.onerror=d,r.readAsText(e)%7D);var%20c=%60#ld-st%7Bposition:absolute;inset:0;z-index:10000;background:#fff;padding:16px;line-height:normal%7D#ld-st%20code%7Bbackground:#eee;border-radius:3px;font:monospace;padding:0%203px%7D#ld-st%20.error%7Bcolor:red%7D#ld-st%20form%7Bdisplay:flex;flex-direction:column;row-gap:8px;max-width:500px%7D%0A%60;var%20o=(e,i)=%3E%7Bif(e==o)e=document.createDocumentFragment();else%7Bif(typeof%20e==%22function%22)return%20e(i);e=document.createElement(e)%7Dlet%7Bchildren:d,ref:r,...t%7D=i;for(let%20n%20in%20t)n%20in%20e?e%5Bn%5D=t%5Bn%5D:(t%5Bn%5D??!1)!==!1&&e.setAttribute(n,t%5Bn%5D);return%20e.append(...%5B%5D.concat(d??%5B%5D).filter(n=%3En!=null)),r?.(e),e%7D,l=o;document.head.appendChild(o(%22style%22,%7Bchildren:c%7D));var%20p,s,f;document.body.append(o(%22div%22,%7Bid:%22ld-st%22,children:l(%22form%22,%7Bonsubmit:async%20e=%3E%7Be.preventDefault();let%20i=s.files%5B0%5D,d=await%20a(i),r;try%7Br=JSON.parse(d)%7Dcatch(t)%7Bf.innerHTML=l(%22p%22,%7Bchildren:%5B%22There%20was%20an%20error%20parsing%20the%20file%20%22,o(%22code%22,%7Bchildren:i.name%7D),%22:%22,%22%20%22,o(%22code%22,%7Bclass:%22error%22,children:t.message%7D)%5D%7D).outerHTML;return%7Dfor(let%20t%20in%20r)localStorage.setItem(t,r%5Bt%5D);location.reload()%7D,children:%5Bl(%22label%22,%7Bfor:%22bak-inp%22,children:%5B%22Open%20your%20%22,o(%22code%22,%7Bchildren:%22wordle-backup.json%22%7D),%22%20file:%22%5D%7D),o(%22input%22,%7Bref:e=%3Es=e,type:%22file%22,id:%22bak-inp%22,accept:%22application/json%22,onchange:()=%3E%7Bp.disabled=s.files.length===0%7D%7D),o(%22button%22,%7Bref:e=%3Ep=e,disabled:!0,children:%22Submit%22%7D),o(%22div%22,%7Bref:e=%3Ef=e%7D)%5D%7D)%7D));%7D)()
```
<!-- END -->

Go to Wordle in the destination browser and open the bookmarklet. You will be prompted to upload your JSON backup; once you do, the page will reload and you should have exactly the same state as if you reloaded the source browser.
