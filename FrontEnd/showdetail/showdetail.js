// 탭메뉴 클릭시 함수
let detailPage = document.getElementsByClassName('detail_page')[0];
let reviewPage = document.getElementsByClassName('review_page')[0];
let locationPage = document.getElementsByClassName('location_page')[0];
let noticePage = document.getElementsByClassName('notice_page')[0];

// 페이지 display설정 함수
function showPage(page) {
    detailPage.style.display = 'none';
    reviewPage.style.display = 'none';
    locationPage.style.display = 'none';
    noticePage.style.display = 'none';
  
    page.style.display = 'block';
}

let tabDetail = document.getElementById('tab_detail');
let tabReview = document.getElementById('tab_review');
let tabLocation = document.getElementById('tab_location');
let tabNotice = document.getElementById('tab_notice');


// 탭 border 디자인 설정 함수
let tab1 = document.getElementById('tab1');
let tab2 = document.getElementById('tab2');
let tab3 = document.getElementById('tab3');
let tab4 = document.getElementById('tab4');

function tabBorderLine(tab){
    tab1.style.border = 'none'
    tab2.style.border = 'none'
    tab3.style.border = 'none'
    tab4.style.border = 'none'

    tab1.style.borderBottom = '1px solid';
    tab2.style.borderBottom = '1px solid';
    tab3.style.borderBottom = '1px solid';
    tab4.style.borderBottom = '1px solid';

    tab.style.border = '1px solid'
    tab.style.borderBottom = 'none'
}
  
  
tabDetail.addEventListener('click', () => {
    showPage(detailPage);
    tabBorderLine(tab1);
});
  
tabReview.addEventListener('click', () => {
    showPage(reviewPage);
    tabBorderLine(tab2);

});
  
tabLocation.addEventListener('click', () => {
    showPage(locationPage);
    tabBorderLine(tab3);

});
  
tabNotice.addEventListener('click', () => {
    showPage(noticePage);
    tabBorderLine(tab4);

});


// 현재 내 마우스 좌표
document.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX; // 현재 마우스의 X 좌표
    var mouseY = event.clientY; // 현재 마우스의 Y 좌표
    
    // 마우스 좌표 출력 또는 다른 작업 수행
    console.log('마우스 X 좌표:', mouseX);
    console.log('마우스 Y 좌표:', mouseY);
  });


// 스크롤시 배너 내려오게
var banner = document.getElementById('banner');

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 1200) { // 스크롤 위치가 100px 이상일 때
    banner.style.top = '0'; // 배너를 아래로 내림
  } else {
    banner.style.top = '-100px'; // 배너를 다시 위로 위치시킴
  }
});

//스크롤시 맨위로 이동 버튼 생성
var scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 1000,
    behavior: 'smooth'
  });
});