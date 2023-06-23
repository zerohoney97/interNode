// 이미지 경로 변수
const imgPath = "/imgs";

// 외부 요청시 이 부분만 변경해주면 된다! 배포시 배포 주소로 변경해주자
const url = "";

const changeHeaderUtil = () => {
  // 오른쪽위 선택창 바꿔주는 함수
  axios
    .get("/login/view", { withCredentials: true })
    .then((res) => {
      if (res.data) {
        if (res.data == "다시 로그인 해주세요") {
          headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
          //  const logOut = document.createElement("div");
          // logOut.innerHTML = '<a href="/login/logout"> 로그아웃 </a>';
          // document.querySelector(".header_util").appendChild(logOut);
        } else if (res.data.startsWith("<!DOCTYPE html>")) { // res.redirect 반환받았을때
          headerUtilLogin.innerHTML = ` <a href="/login">다시 로그인 해주세요</a>`;
        } else {
          headerUtilLogin.innerHTML = ` ${res.data}`;
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
