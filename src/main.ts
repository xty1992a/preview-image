// @ts-ignore
import PhotoSwipe from 'photoswipe/dist/photoswipe';
// @ts-ignore
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import template from './template';

interface PreviewOptions {
  imgList: string[]
  current: string | number | HTMLImageElement,
  elList?: HTMLImageElement[],
  options?: object,
  getTemplate?: Function
}

type ImagePath = string
type ImageInfo = null | { width: number, height: number }

interface Item {
  h: number,
  w: number,
  el: HTMLElement,
  src: ImagePath
}

function getImgInfo(src: string): Promise<ImageInfo> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => {
      resolve({width: img.width, height: img.height});
    });
    img.addEventListener("error", () => {
      resolve(null);
    });
  });
}

function getImageEl(src: string, imgList: HTMLImageElement[]): HTMLImageElement {
  return imgList.find(it => it.src === src);
}

async function img2Items(list: string[], elList: HTMLImageElement[]) {
  const results: Item[] = [];
  while (list.length) {
    const src = list.shift();
    const res = await getImgInfo(src);
    const el = getImageEl(src, elList);
    if (!res || !el) continue;
    results.push({
      h: res.height,
      w: res.width,
      el,
      src
    });
  }
  return results;
}

function getCurrentIndex(options: PreviewOptions): number {
  if (typeof options.current === 'number') return options.current;
  if (typeof options.current === 'string') {
    const index = options.imgList.findIndex(i => i === options.current);
    if (index !== -1) return index;
  }
  if (options.current instanceof HTMLElement && options.elList) {
    const index = options.elList.findIndex(i => i === options.current);
    if (index !== -1) return index;
  }
  return 0;
}

function getTemplate(): HTMLElement {
  const el = document.getElementById("modal");
  if (el) return el;
  const div = document.createElement("div");
  div.innerHTML = template;
  document.body.appendChild(div);
  return document.getElementById("modal");
}

const dftOptions = {
  elLIst: Array.from(document.body.getElementsByTagName('img'))
};

const previewImage: (options: PreviewOptions) => void = async function (options) {
  console.log(options);
  if (!options.elList) {
    options.elList = dftOptions.elLIst.filter(it => options.imgList.includes(it.src));
  }
  if (!options.getTemplate) {
    options.getTemplate = getTemplate;
  }
  const modal = options.getTemplate();
  const index = getCurrentIndex(options);
  const items = await img2Items([...options.imgList], [...options.elList]);
  const option = {
    index,
    getThumbBoundsFn(index: number) {
      const imgEl = items[index].el;
      const imgRect = imgEl.getBoundingClientRect();
      const top = document.scrollingElement.scrollTop;
      return {x: imgRect.left, y: imgRect.top + top, w: imgRect.width};
    }
  };
  console.log(items);
  const gallery = new PhotoSwipe(
    modal,
    PhotoSwipeUIDefault,
    items,
    {...option, ...(options.options || {})},
  );
  gallery.init();
};

export default previewImage;
