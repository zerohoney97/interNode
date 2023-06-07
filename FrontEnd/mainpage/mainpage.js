//스와이퍼 자동 재생기능
var swiper = new Swiper('.mySwiper', {
    autoplay: {
        delay: 4000, // 각 슬라이드 간의 딜레이 시간 (밀리초)
    },
});

// 사이드 팝업 닫기버튼 눌렀을때 사라지는 기능
let popClose = document.getElementsByClassName('popup_close_btn')[0];
let sidePopup = document.getElementsByClassName('side_popup')[0];
popClose.addEventListener('click',()=>{
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