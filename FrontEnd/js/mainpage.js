//스와이퍼 자동 재생기능
var swiper = new Swiper('.mySwiper', {
    autoplay: {
        delay: 4000, // 각 슬라이드 간의 딜레이 시간 (밀리초)
    },
});

// 쿠키 생성 함수
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}




// 사이드 팝업 오늘 그만 보기 쿠키설정 함수
let sidePopupCheck = document.getElementById('side_popup_checkbox');

function popupCookie(){
    setCookie('popupShown', 'true', 7); // 1일 동안 유지되는 쿠키 설정

}

// 페이지 로드 시 쿠키유무확인/ 팝업 display 설정
let sidePopup = document.getElementsByClassName('side_popup')[0];
// 페이지 로드 시 쿠키 확인 함수
function checkPopupCookie() {
    var popupCookie = getCookie('popupShown');
    if (popupCookie === 'true') {
      // 이미 팝업이 표시된 경우, 팝업을 숨깁니다.
      sidePopup.style.display = 'none';
    } else {
      // 팝업이 표시되지 않은 경우, 팝업을 표시합니다.
      sidePopup.style.display = 'block';
    }
  }
  
  // 쿠키 있는지 검색하는 함수
  function getCookie(name) {
    var cookieName = name + "=";
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
  
  // 페이지 로드 시 checkPopupCookie 함수를 호출하여 쿠키를 확인하고 팝업을 제어
  window.addEventListener('load', checkPopupCookie);
  


// 사이드 팝업 닫기버튼 눌렀을때 사라지는 기능
let popClose = document.getElementsByClassName('popup_close_btn')[0];
popClose.addEventListener('click',()=>{
    if(sidePopupCheck.checked){
        popupCookie();
    }
    sidePopup.style.display = "none";
})

//평점 순 랭킹, 댓글 순 랭킹 클릭시 색상변경
let cmt_ranking = document.getElementById('cmt_ranking');
let rate_ranking = document.getElementById("rate_ranking");

//지역별랭킹 클릭시 function
cmt_ranking.addEventListener('click',()=>{
    rate_ranking.style.color = "#a7acb6";
    cmt_ranking.style.color = 'black'
})

//장르별랭킹 클릭시 function
rate_ranking.addEventListener('click',()=>{
    rate_ranking.style.color = "black";
    cmt_ranking.style.color = '#a7acb6'
})

window.onload = function(){
  axios.get('http://127.0.0.1:8080/login/view',{withCredentials : true})
  .then((res)=>{
    console.log(res.data);
    if(res.data){
      headerUtilLogin.textContent = `${res.data}님`
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}