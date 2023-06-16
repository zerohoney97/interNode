// 이미지 경로 변수
const imgPath = "/imgs";

// 외부 요청시 이 부분만 변경해주면 된다! 배포시 배포 주소로 변경해주자
const url = "";

const changeHeaderUtil = () => {
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
          const logOut = document.createElement("div");
          logOut.innerHTML = '<a href="/login/logout"> 로그아웃 </a>';
          document.querySelector(".header_util").appendChild(logOut);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


