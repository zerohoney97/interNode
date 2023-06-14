// 하이퍼 링크 변경

goToShowControl.href = `${url}/adminPage`;
goToUserSearch.href = `${url}/adminPage/userSearch`;
goToUserReport.href = `${url}/adminPage/userReport`;
// 하이퍼 링크 변경

axios
  .get("/adminPage/getReportedUser")
  .then((e) => {
    const userList = document.querySelector(".user-list");
    userList.classList.add("user-list");
    console.log(e)
    // 하나의 유저에 대한 반복문
    e.data.forEach((userReported) => {
      // 하나의 유저에 여러 신고가 있을 수 있으므로 다시 반복
      userReported[1].forEach((reportedElement) => {
        const userItem = document.createElement("li");
        userItem.classList.add('user-item')
        userItem.innerHTML = `
    
        <div class="title">${reportedElement.title}</div>
                  <div class="nickname">${userReported[0]}</div>
                  <div class="board-type">${reportedElement.type}</div>
                  <details>
                    <summary>내용보기</summary>
                    <div class="content">
                   ${reportedElement.content}
                    </div>
                  </details>
                  <div class="report-buttons">
                    <button class='confirmBtn' id=confirm-${reportedElement.id}>신고 확인</button>
                    <button  class='deninedBtn' id=denined-${reportedElement.id}>신고 반려</button>
                  </div>
        
        `;
        userList.appendChild(userItem);
      });
    });

    console.log(e);
  })
  .catch((error) => {
    console.log(error);
  });
