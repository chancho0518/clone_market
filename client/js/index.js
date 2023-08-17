const calcTime = (timestamp) => {
  const currentTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(currentTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour} 시간 전`;
  else if (minute > 0) return `${minute} 분 전`;
  else if (second > 0) return `${second} 초 전`;
  else return `방금 전`;
};

const renderData = (data) => {
  const main = document.querySelector("main");

  data.reverse().forEach(async (obj) => {
    const itemList = document.createElement("div");
    const itemListImg = document.createElement("div");
    const itemListInfo = document.createElement("div");
    const itemListInfoTitle = document.createElement("div");
    const itemListInfoMeta = document.createElement("div");
    const itemListInfoPrice = document.createElement("div");
    const img = document.createElement("img");

    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    itemList.className = "item-list";
    itemListImg.className = "item-list__img";
    itemListInfo.className = "item-list__info";
    itemListInfoTitle.className = "item-list__info-title";
    itemListInfoMeta.className = "item-list__info-meta";
    itemListInfoPrice.className = "item-list__info-price";

    itemListInfoTitle.innerText = obj.title;
    itemListInfoMeta.innerText = obj.place + " " + calcTime(obj.insertAt);
    itemListInfoPrice.innerText = obj.price;

    if (obj.image.length === 0) {
      img.style = "width: 50px";
      img.src = "./assets/photo.svg";
    } else {
      img.src = url;
    }

    img.alt = "photo";

    itemListImg.appendChild(img);
    itemListInfo.appendChild(itemListInfoTitle);
    itemListInfo.appendChild(itemListInfoMeta);
    itemListInfo.appendChild(itemListInfoPrice);

    itemList.appendChild(itemListImg);
    itemList.appendChild(itemListInfo);

    main.appendChild(itemList);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
