window.onload = async () => {

try {
        // 유저 정보 요청
        const data = await axios.get(url+"/mypage/getReservedList", {
            withCredentials: true,
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }

    // 내가 쓴 글 버튼 클릭
    myFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=my";
    }

    // 좋아요한 글 클릭
    likeFreeBoard.onclick = () => {
        window.location.href = "../../freeboard/freeboard.html?page=likes";
    }

}

// 오른쪽위 선택창 바꿔주는 함수
window.onload = function () {
  axios
    .get("http://127.0.0.1:8080/login/view", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        if (res.data == "다시 로그인 해주세요") {
          headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
        } else {
          headerUtilLogin.innerHTML = ` ${res.data}`;
          console.log(headerSignUp.innerHTML)
          headerSignUp.innerHTML = '<a href="/freeboards/main"> 자유 게시판 </a>';
          console.log(headerSignUp.innerHTML)
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
