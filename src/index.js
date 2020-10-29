import a from 'utils';
import b from '$config';
import c from '$config/qa';
import d from 'utils/set';

console.log(a, b, c, d);

function createElement () {
    const element = document.createElement('div')
    element.innerHTML = '孔子曰：中午不睡，下午崩溃!孟子曰：孔子说的对!1';
  
    return element;
}
document.body.appendChild(createElement());
