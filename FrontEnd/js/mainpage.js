//스와이퍼 자동 재생기능
var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 4000, // 각 슬라이드 간의 딜레이 시간 (밀리초)
  },
});

// 쿠키 생성 함수
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// 사이드 팝업 오늘 그만 보기 쿠키설정 함수
let sidePopupCheck = document.getElementById("side_popup_checkbox");

function popupCookie() {
  setCookie("popupShown", "true", 7); // 1일 동안 유지되는 쿠키 설정
}

// 페이지 로드 시 쿠키유무확인/ 팝업 display 설정
let sidePopup = document.getElementsByClassName("side_popup")[0];
// 페이지 로드 시 쿠키 확인 함수
function checkPopupCookie() {
  var popupCookie = getCookie("popupShown");
  if (popupCookie === "true") {
    // 이미 팝업이 표시된 경우, 팝업을 숨깁니다.
    sidePopup.style.display = "none";
  } else {
    // 팝업이 표시되지 않은 경우, 팝업을 표시합니다.
    sidePopup.style.display = "block";
  }
}

// 쿠키 있는지 검색하는 함수
function getCookie(name) {
  var cookieName = name + "=";
  var cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// 페이지 로드 시 checkPopupCookie 함수를 호출하여 쿠키를 확인하고 팝업을 제어
window.addEventListener("load", checkPopupCookie);

// 사이드 팝업 닫기버튼 눌렀을때 사라지는 기능
let popClose = document.getElementsByClassName("popup_close_btn")[0];
popClose.addEventListener("click", () => {
  if (sidePopupCheck.checked) {
    popupCookie();
  }
  sidePopup.style.display = "none";
});

//평점 순 랭킹, 댓글 순 랭킹 클릭시 색상변경
let cmt_ranking = document.getElementById("cmt_ranking");
let rate_ranking = document.getElementById("rate_ranking");




//댓글 순 랭킹 클릭시 function
cmt_ranking.addEventListener("click", () => {
  rate_ranking.style.color = "#a7acb6";
  cmt_ranking.style.color = "black";
  console.log("?왜안돼")
  axios.get("/main/cmtShowList", {withCredentials : true})
  .then((res)=>{
    console.log(res.data);
    renderCountShow(res.data);
  })
  .catch((err)=>{
    console.log(err);
  })
});

//평점순랭킹 클릭시 function
rate_ranking.addEventListener("click", () => {
  rate_ranking.style.color = "black";
  cmt_ranking.style.color = "#a7acb6";
  axios.get("/main/rateShowList")
  .then((res)=>{
    renderRateShow(res.data);
  })
  .catch((err)=>{
    console.log(err);
  })
});

changeHeaderUtil();

// ---------------------------------
// 공연 정보 받아와서 출력
const getShowList = async () => {
  try {
    // 전체 공연
    const { data } = await axios.get("/main/showList", {
      withCredentials: true,
    });
    console.log(data);
    renderTicketShowList(data);

    renderBestShow(data);
    
    renderSwiper(data);
    // 평점순 공연
    const rateList = await axios.get("/main/rateShowList", {
      withCredentials: true,
    });

    renderRateShow(rateList.data);

  } catch (error) {
    console.log(error);
  }
};
window.addEventListener("load", getShowList);
// 서버에서 show 정보 받아와서 렌더
const renderTicketShowList = (list) => {
  // 티켓오픈 바로 밑 5개의 공연 리스트
  const showUl = document.querySelector(".showUl");
  showUl.innerHTML = "";
  // 5개만 출력
  for (let index = 0; index < 5; index++) {
    const show = list[index];
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = imgPath + "/" + show.img;
    const div = document.createElement("div");
    div.innerText = show.title;
    const span = document.createElement("span");
    if (show.ShowDateInfos.length != 0) {
      span.innerText =
        show.ShowDateInfos[0].startDate + " ~ " + show.ShowDateInfos[0].endDate;
    } else {
      span.innerText = "티켓 시간 정보";
    }
    li.append(img, div, span);

    li.onclick = () => {
      location.href = "/showdetail?id=" + show.id;
    };
    showUl.append(li);
  }
};

// 베스트 공연 출력
const renderBestShow = (list) => {
  const bestUl = document.querySelector(".bestshow ul");
  bestUl.innerHTML = "";

  list.forEach((show) => {
    const li = document.createElement("li");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("bestshow_img");
    const img = document.createElement("img");
    img.src = imgPath + "/" + show.img;

    const textDiv = document.createElement("div");
    textDiv.classList.add("bestshow_img_text");

    const title = document.createElement("span");
    title.classList.add("bestshow_img_title");
    title.innerText = show.title;

    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");

    const loc = document.createElement("span");
    loc.classList.add("bestshow_img_loc");
    loc.innerText = show.Theater.name;

    const date = document.createElement("span");
    date.classList.add("bestshow_img_date");
    if (show.ShowDateInfos.length != 0) {
      date.innerText =
        show.ShowDateInfos[0].startDate + " ~ " + show.ShowDateInfos[0].endDate;
    }

    textDiv.append(title, br1, br2, loc, br3, date);
    imgDiv.append(img);
    li.append(imgDiv, textDiv);
    li.onclick = () => {
      location.href = "/showdetail?id=" + show.id;
    };

    bestUl.append(li);
  });
};

const renderRateShow = (list) => {
  const rankingDiv = document.querySelector(".rankingdiv");
  rankingDiv.innerHTML = "";

  const ul = document.createElement("ul");

  // 평점순 5개만 출력
  for (let index = 0; index < 5; index++) {
    const show = list[index];

    const li = document.createElement("li");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("rank_img_wrap");
    const img = document.createElement("img");
    img.src = imgPath + "/" + show.img;
    const num = document.createElement("span");
    num.classList.add("whitenum");
    num.innerText = index + 1;

    imgDiv.append(img, num);

    const title = document.createElement("div");
    title.classList.add("rank_title");
    title.innerText = show.title;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("rank_date");

    if (show.ShowDateInfos.length != 0) {
      dateSpan.innerText =
        show.ShowDateInfos[0].startDate + " ~ " + show.ShowDateInfos[0].endDate;
    } else {
      dateSpan.innerText = "티켓 시간 정보";
    }

    const rateSpan = document.createElement("span");
    if (!show.showRates) {
      show.showRates = 0;
    }
    rateSpan.innerText = "평점 : " + show.showRates;

    const br = document.createElement("br");

    li.append(imgDiv, title, dateSpan, br, rateSpan);

    li.onclick = () => {
      location.href = "/showdetail?id="+show.id;
    };

    ul.append(li);
  }

  rankingDiv.append(ul);
};

const renderCmtShow = (list)=>{
  
}

//스와이퍼, 오늘의 추천에 링크 걸어주기
const renderSwiper = (list)=>{
  const swiperSlide = document.querySelectorAll('swiper-slide');
  
  //스와이퍼 
  for (let i = 0; i < 7; i++) {
    const show = list[i];
    const anchorElement = swiperSlide[i].querySelector('a');
    anchorElement.setAttribute('href', "/showdetail?id=" + show.id);
  }

  // 오늘의 추천
  const today = document.getElementById('recLink7');
  today.href = "/showdetail?id=" + list[7].id;
}

const renderCountShow = (list)=>{
  const rankingDiv = document.querySelector(".rankingdiv");
  rankingDiv.innerHTML = "";

  const ul = document.createElement("ul");
  // 댓글순 5개만 출력
  for (let index = 0; index < 5; index++) {
    const show = list[index];

    const li = document.createElement("li");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("rank_img_wrap");
    const img = document.createElement("img");
    img.src = imgPath + "/" + show.img;
    const num = document.createElement("span");
    num.classList.add("whitenum");
    num.innerText = index + 1;

    imgDiv.append(img, num);

    const title = document.createElement("div");
    title.classList.add("rank_title");
    title.innerText = show.title;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("rank_date");

    if (show.ShowDateInfos.length != 0) {
      dateSpan.innerText =
        show.ShowDateInfos[0].startDate + " ~ " + show.ShowDateInfos[0].endDate;
    } else {
      dateSpan.innerText = "티켓 시간 정보";
    }

    const rateSpan = document.createElement("span");
    if (!show.showRates) {
      show.showRates = 0;
    }
    rateSpan.innerText = "댓글 수 : " + show.reviewCount;

    const br = document.createElement("br");

    li.append(imgDiv, title, dateSpan, br, rateSpan);

    li.onclick = () => {
      location.href = "/showdetail?id="+show.id;
    };

    ul.append(li);
  }

  rankingDiv.append(ul);
}


