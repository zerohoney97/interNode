// 헤더에 유저 닉네임 표시
window.onload = function(){
    axios.get('http://127.0.0.1:8080/login/view',{withCredentials : true})
    .then((res)=>{
      // console.log(res.data);
      if(res.data){
        headerUtilLogin.textContent = `${res.data}님`
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}


window.onload = ()=>{
    console.log(window.location.search);
    const post_id = window.location.search
    // 게시글 상세조회
    axios.get(`http://127.0.0.1:8080/freeboards/postdetail${post_id}`)
    .then((res)=>{
        const data = res.data;
        console.log(data);
        title.textContent = res.data.title
        nickname.textContent = res.data.User.nickname
        createdAt.textContent = res.data.createdAt.slice(0,10);
        views.textContent = res.data.views
        content.textContent = res.data.content
        likeBtn.innerHTML = `<a href=""><img src="./img/like_empty.png" alt="">${res.data.FreeBoardLikes.length}</a>`
    })
    .catch((err)=>{
        console.log(err);
    })

    // 게시글 조회수 증가
    axios.get(`http://127.0.0.1:8080/freeboards/viewsup${post_id}`)
    .then((res)=>{
        console.log("조회수 증가 완료")
    })
    .catch((err)=>{
        console.log(err);
    })

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

// 게시글 수정
updateBtn.onclick = ()=>{
    //if() // 작성자와 로그인한 아이디가 같으면
    // isLogin 이랑 ViewUser로 로그인한 데이터 가져오면 그 이름 을 이용하자
    // 수정페이지로 이동

    // 수정 페이지에서는 form으로 데이터베이스 변경, 게시글 상세 페이지 redirect
    console.log(headerUtilLogin.textContent.slice(0,-1));
}

// 오른쪽위 선택창 바꿔주는 함수
axios
.get("/login/view", { withCredentials: true })
.then((res) => {
  console.log(res.data);
  if (res.data) {
    if (res.data == "다시 로그인 해주세요") {
      headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
    } else {
      headerUtilLogin.innerHTML = ` ${res.data}`;
      console.log(headerSignUp.innerHTML);
      headerSignUp.innerHTML =
        '<a href="/freeboards/main"> 자유 게시판 </a>';
      console.log(headerSignUp.innerHTML);
    }
  }
})
.catch((error) => {
  console.log(error);
});
