javascript:(()=%3E%7Bvar%20o=Object.keys(window.localStorage).filter(e=%3Ee.includes(%22wordle%22)).reduce((e,a)=%3E(e%5Ba%5D=window.localStorage.getItem(a),e),%7B%7D),c=%60data:application/javascript,$%7BencodeURIComponent(JSON.stringify(o))%7D%60,n=new%20Date,l=new%20Date(n.valueOf()-n.getTimezoneOffset()*6e4),d=l.toISOString().split(%22T%22)%5B0%5D,i=%60wordle-backup-$%7Bd%7D.json%60,t=document.createElement(%22a%22);Object.assign(t,%7Bhref:c,download:i,style:%7Bdisplay:%22none%22%7D%7D);document.body.appendChild(t);t.click();t.remove();%7D)();%0A