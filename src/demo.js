// import previewImage from './main';
import previewImage from '../lib/preview-image';
import '../lib/preview-image.css';

const list = document.getElementsByClassName('list')[0];
const elList = [...list.getElementsByTagName('img')];
const imgList = elList.map(it => it.src);
list.addEventListener('click', e => {
  if (e.target.nodeName.toLowerCase() !== 'img') return;
  previewImage({
	imgList,
	current: e.target,
  });
});

