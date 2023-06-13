let list;
let pagenum;
let lastPageNum;

window.onload = ()=>{
    // 서버에서 자유게시판 리스트 받아오는 함수

    // 서버에서 글 목록 가져오기
    axios.get('http://127.0.0.1:8080/freeboards')
    .then((res)=>{
        console.log(res.data);
        list = res.data;

        // 페이지네이션 함수
        pagenate(pagenum);
    })
    .catch((err)=>{
        console.log(err);
    })

    // 임의로 리스트 정의
    // list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    // 첫 페이지는 1번
    pagenum = 1;

    // 이전/다음 버튼 이벤트 등록
    addBtnsEvent();


}

// list는 자유게시판 리스트

// 페이지네이션
const pagenate = (pagenum) => {
    const pageCount = 10;
    const length = list.length;

    lastPageNum  = Math.ceil(length/pageCount);
    const lastBoard = length%pageCount;

    let first = (pagenum-1) * pageCount; // 첫번째로 렌더될 배열 요소의 인덱스
    let last = pagenum * pageCount; // 마지막로 렌더될 배열 요소의 인덱스 + 1

    // 마지막 페이지일때
    if(pagenum == lastPageNum && lastBoard != 0){
        last = first + lastBoard;
    }
    freeboards.innerHTML = "";

    for (let index = first; index < last; index++) {
        // 이런식으로 list에서 인덱스값으로 board 뽑아와야함
        const board = list[index];

        // 임의로 값 정함. board.title 이런식으로 정의해야함
        // const title = "제목1";
        // const nickname = "닉네임";
        // const likes = 15;
        // const views = 100;
        // const createdAt = "2023-06-07";

        freeboards.innerHTML +=
        `<tr>
            <td class="no">${index+1}</td>
            <td class="title"><a href="">${board.title}</a></td>
            <td class="nickname">${board.User.nickname}</td>
            <td class="likes">${board.FreeBoardLikes.length}</td>
            <td class="views">${board.views}</td>
            <td class="createdAt">${board.createdAt.slice(0,10)}</td>
        </tr>`;
    }

    pageNumBtns.innerHTML = "";

    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";

    // 현재 첫번째 페이지면 이전버튼 안나타나게
    if (pagenum == 1) {
        prevBtn.style.visibility = "hidden";
    }

    // 현재 마지막 페이지면 다음버튼 안나타나게
    if (pagenum == lastPageNum) {
        nextBtn.style.visibility = "hidden";
    }

    for (let index = 1; index < lastPageNum+1; index++) {
        const pageBtn = document.createElement("div");
        pageBtn.classList.add("pageBtn");
        pageBtn.classList.add("btn");

        // 현재 페이지 버튼이면
        if (index == pagenum) {
            pageBtn.classList.add("current");
        }

        pageBtn.innerText = index;

        pageBtn.onclick = () => {
            pagenate(index);
        };

        pageNumBtns.append(pageBtn);
    }
}

// 다음, 이전 버튼에 이벤트 추가
const addBtnsEvent = () => {
    prevBtn.onclick = () => {
        goPrev();
    };
    nextBtn.onclick = () => {
        goNext();
    };
}

// 다음 페이지
const goPrev = () => {
    pagenum -= 1;
    if (pagenum < 1) {
        pagenum = 1;
    }
    pagenate(pagenum);
}

// 이전 페이지
const goNext = () => {
    pagenum += 1;
    if (pagenum > lastPageNum) {
        pagenum = lastPageNum;
    }
    pagenate(pagenum);
}

// 등록 버튼 클릭시 등록 페이지로 이동
const insertBtn = document.getElementById('insertBtn');
insertBtn.onclick = function() {
    console.log("hi")
    window.location.href = "http://127.0.0.1:5500/FrontEnd/freeboard/freeboardInsert.html";
};
