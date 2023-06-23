// 하이퍼 링크 변경

goToShowControl.href = `${url}/adminPage`;
goToUserSearch.href = `${url}/adminPage/userSearch`;
goToUserReport.href = `${url}/adminPage/userReport`;
// 하이퍼 링크 변경

// 수락 버튼을 눌렀을 때 유저를 제제하는 함수
const applySanction = (user, reportedElementId) => {
  user = {
    ...user,
    report_stack: user.report_stack + 1,
  };

  axios
    .post("/adminPage/updateUserReport", { user, reportedElementId })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};
// 반려 버튼을 울렀을 때의 함수
const notApplySanction = (user, reportedElementId) => {
  user = {
    ...user,
    report_stack: user.report_stack + 1,
  };

  axios
    .post("/adminPage/notUpdateUserReport", { user, reportedElementId })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};
axios
  .get("/adminPage/getReportedUser")
  .then((e) => {
    const userList = document.querySelector(".user-list");
    userList.classList.add("user-list");
    console.log(e);
    // 하나의 유저에 대한 반복문
    // userReported에 담겨오는 데이터 예시
    // [0: {id: 2, email: '2coco97@gmail.com', password: '$2b$10$ehhhYZDrBvYMUCD2D..aoumJUgyOH4KWIE3BJca/nTYsn0BCQpeFS', img: null, nickname: 'zero', …}
    // 1: (3) [{…}, {…}, {…}] ]
    // 첫번째 배열은 유저의 정보, 두번째 배열은 그 유저가 신고받은 신고 리스트들 이다.
    e.data.forEach((userReported) => {
      // 하나의 유저에 여러 신고가 있을 수 있으므로 다시 반복
      userReported[1].forEach((reportedElement) => {
        const userItem = document.createElement("li");
        userItem.classList.add("user-item");
        if (!reportedElement.title) {
          userItem.innerHTML = `
    
        <div class="title">댓글/대댓글</div>
                  <div class="nickname">${userReported[0].nickname}</div>
                  <div class="board-type">${reportedElement.type}</div>
                  <details>
                    <summary>내용보기</summary>
                    <div class="content">
                   ${reportedElement.content}
                    </div>
                  </details>
                  <div class="report-buttons">
                    <button class='confirmBtn-${reportedElement.id}' >신고 확인</button>
                    <button  class='deninedBtn-${reportedElement.id}' >신고 반려</button>
                  </div>
        
        `;
          userList.appendChild(userItem);
        } else {
          userItem.innerHTML = `
    
          <div class="title">${reportedElement.title}</div>
                    <div class="nickname">${userReported[0].nickname}</div>
                    <div class="board-type">${reportedElement.type}</div>
                    <details>
                      <summary>내용보기</summary>
                      <div class="content">
                     ${reportedElement.content}
                      </div>
                    </details>
                    <div class="report-buttons">
                      <button class='confirmBtn-${reportedElement.id}' >신고 확인</button>
                      <button  class='deninedBtn-${reportedElement.id}' >신고 반려</button>
                    </div>
          
          `;
          userList.appendChild(userItem);
        }

        document
          .querySelector(`.confirmBtn-${reportedElement.id}`)
          .addEventListener("click", () => {
            applySanction(userReported[0], reportedElement.id);
          });
        document
          .querySelector(`.deninedBtn-${reportedElement.id}`)
          .addEventListener("click", () => {
            notApplySanction(userReported[0], reportedElement.id);
          });
      });
    });

    console.log(e);
  })
  .catch((error) => {
    console.log(error);
  });

// 오른쪽위 선택창 바꿔주는 함수

changeHeaderUtil();
