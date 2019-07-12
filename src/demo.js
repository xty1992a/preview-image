import previewImage from './main';

console.log('hello');
const list = document.getElementsByClassName('list')[0];
const elList = [...list.getElementsByTagName('img')];
const imgList = elList.map(it => it.src);
list.addEventListener('click', e => {
  console.log(e.target, imgList);
  if (e.target.nodeName.toLowerCase() !== 'img') return;
  previewImage({
	imgList,
	current: e.target,
  });
});

