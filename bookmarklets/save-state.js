javascript:(()%3D%3E%7Bvar%20a%3DObject.keys(window.localStorage).filter(e%3D%3Ee.includes(%22wordle%22)).reduce((e%2Ct)%3D%3E(e%5Bt%5D%3Dwindow.localStorage.getItem(t)%2Ce)%2C%7B%7D)%2Cn%3D%60data%3Aapplication%2Fjavascript%2C%24%7BencodeURIComponent(JSON.stringify(a))%7D%60%2Co%3Ddocument.createElement(%22a%22)%3BObject.assign(o%2C%7Bhref%3An%2Cdownload%3A%22wordle-backup.json%22%2Cstyle%3A%7Bdisplay%3A%22none%22%7D%7D)%3Bdocument.body.appendChild(o)%3Bo.click()%3Bdocument.body.remove(o)%3B%7D)()%3B%0A