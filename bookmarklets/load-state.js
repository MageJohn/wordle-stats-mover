javascript:(()=%3E%7Bconst%20e=(n,r)=%3E%7Bif(n==e)n=document.createDocumentFragment();else%7Bif('function'==typeof%20n)return%20n(r);n=document.createElement(n)%7Dconst%7Bchildren:o,ref:t,...i%7D=r;for(const%20e%20in%20i)e%20in%20n?n%5Be%5D=i%5Be%5D:!1!==(i%5Be%5D??!1)&&n.setAttribute(e,i%5Be%5D);return%20n.append(...%5B%5D.concat(o??%5B%5D).filter((e=%3Enull!=e))),t?.(n),n%7D,n=e;let%20r,o,t;document.head.append(e('style',%7Bchildren:'._1g4l6%7Bbackground:#fff;inset:0;line-height:normal;padding:16px;position:absolute;z-index:10000%7D._1g4l6%20code%7Bbackground:#eee;border-radius:3px;font:monospace;padding:0%203px%7D._javs7%7Bcolor:red%7D._1g4l6%20form%7Bdisplay:flex;flex-direction:column;max-width:500px;row-gap:8px%7D'%7D)),document.body.append(e('div',%7Bclass:'_1g4l6',children:n('form',%7Bonsubmit:async%20r=%3E%7Br.preventDefault();const%20i=o.files%5B0%5D,l=await(e=%3Enew%20Promise(((n,r)=%3E%7Bconst%20o=new%20FileReader;o.onload=()=%3E%7Bn(o.result)%7D,o.onerror=r,o.readAsText(e)%7D)))(i);let%20a;try%7Ba=JSON.parse(l)%7Dcatch(r)%7Breturn%20void(t.innerHTML=n('p',%7Bchildren:%5B'There%20was%20an%20error%20parsing%20the%20file%20',e('code',%7Bchildren:i.name%7D),':','%20',e('code',%7Bclass:'_javs7',children:r.message%7D)%5D%7D).outerHTML)%7Dfor(const%20e%20in%20a)localStorage.setItem(e,a%5Be%5D);location.reload()%7D,children:%5Bn('label',%7Bfor:'bak-inp',children:%5B'Open%20your%20',e('code',%7Bchildren:'wordle-backup.json'%7D),'%20file:'%5D%7D),e('input',%7Bref:e=%3Eo=e,type:'file',id:'bak-inp',accept:'application/json',onchange:()=%3E%7Br.disabled=0===o.files.length%7D%7D),e('button',%7Bref:e=%3Er=e,disabled:!0,children:'Submit'%7D),e('div',%7Bref:e=%3Et=e%7D)%5D%7D)%7D))%7D)();
