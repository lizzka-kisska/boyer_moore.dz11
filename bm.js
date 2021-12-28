let fs = require('fs');
let s = fs.readFileSync('s.txt').toString();
let t = fs.readFileSync('t.txt').toString();
let m = t.length;
let shift1 = new Array();//плохой символ
let shift2 = new Array();//хороший суффикс
shift2[0] = 1;
let rpr = new Array();
rpr[0] = m;

for (let i=0; i<m; i++)
    shift1[t.charAt(i)]=i+1; //по последнему(самому правому) вхождению
  
//shift2 = m-rpr-l+1; l- кол-во совпавших символов, rpr = max k:..., k - индекс совпадения в s

let newT = new String();
for (let i=0; i<m; i++)
    newT += '*';
newT += t;

for (let l=0; l<=m; l++){
    rpr[l] = m;
    k = m;
    while (true){
        let f=true;
        let t1 = newT.substring(k+m-1, k+m+l-1), t2 = t.substring(m-l, m);
        for (let i=0; i<t1.length; i++){
            if (t1[i]=='*' || t2[i]=='*' || t1[i]==t2[i])
                continue;
            else
                f = false;
        }
        if (k<=m-l && f && ((k>1 && t[k-2]!=t[m-l-1]) || k<=1))
            break;
        k--;
    }
    rpr[l] = k;
}

for (let l=0; l<=t.length; l++) 
    shift2[l] = m-rpr[l]-l+1;

for (let i=0; i<=s.length-m; i++) {
    let l=0;
    while (l < m){
        if (s[i+m-l-1]!=t[m-l-1])//справа налево
            break;
        l++;
    }
    if (l==m) 
        console.log(i+1);// отсчет с 1
    let char = s[i+m-l-1];
    if (shift1[char])
        i += Math.max(Math.max(m-l-shift1[char], 1), shift2[l]) - 1;
    else
        i += Math.max(Math.max(m-l, 1), shift2[l]) - 1;
}




