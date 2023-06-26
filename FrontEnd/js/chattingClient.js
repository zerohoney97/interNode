const socket = io.connect();
const sendButton = document.querySelector(".chat-send-botton");
// // 로그인 정보 가져와서 isloginUserId
// const isloginUserId = 1;
// sendButton.addEventListener("click", async () => {
//   const chatInput = document.querySelector("#chatId");
//   const message = chatInput.value;
//   const receiver = user_id;
//   const isRead = 0;

//   // 서버로 채팅 데이터 전송
//   console.log({ user_id: isloginUserId, message, receiver, isRead });
//   // 요청 보내면 body객체 안에 { data: { user_id : isloginUserId, message,receiver,isRead } } 이렇게 전달된다.
//   await axios.post("/chat/create", {
//     data: { user_id: isloginUserId, message, receiver, isRead },
//   });
//   // user_id는 1로 넣어놨지만 로그인한 유저의 아이디를 넣어주면 된다.

//   // 입력 필드 초기화
//   chatInput.value = "";
// });

const userChatArray = [];
const adminChatArray = [];

// 전송버튼
document.querySelector(".chat-send-botton").addEventListener("click", () => {
  axios
    .post("/chat/create", { chat: chatId1.value })
    .then((e) => {
      console.log(e);
      socket.emit("chat2", chatId1.value, e.data.primaryKey);
      chatId1.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
  // 채팅 보내주는 소켓
});

// // 유저
// sendButton.addEventListener("click", () => {
//   const input = document.getElementById("chatId1");
//   const message = input.value;

//   // HTML에 채팅 내용 추가
//   const chatMessages = document.getElementById("chatMessages");
//   const p = document.createElement("p");
//   p.textContent = message;
//   chatMessages.appendChild(p);
// });

// // 관리자
// sendButton.addEventListener("click", () => {
//   const input = document.getElementById("chatId2");
//   const message = input.value;

//   // 채팅 영역 스크롤 제어
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// 팝업 열어주는 함수
function openPopup() {
  let popup = document.querySelector(".popup-wrap");

  // 메소드 사용해서 조건 추가
  if (popup.classList.contains("is-active")) {
    // is-active 있으면 제거할거임 ㅎㅎ
    // remove 클래스 제거 메소드
    popup.classList.remove("is-active");
    var chattingRoom = document.querySelector(".popup-content.chattingroom");
    chattingRoom.style.display = "none";
  } else {
    // is-active 없으면 추가할거임
    // add 클래스 추가 메소드
    popup.classList.add("is-active");
  }
}

// function chattingroom(e) {
//   var chattingRoom = document.querySelector(".popup-content.chattingroom");
//   chattingRoom.style.display = "block";
//   user_id = e;
//   console.log(user_id);
// }

// function chattingpage() {
//   var chattingRoom = document.querySelector(".popup-content.chattingroom");
//   chattingRoom.style.display = "none";
// }

// function enableInput() {
//   let messageElement = document.getElementById("message");
//   messageElement.contentEditable = true;
//   messageElement.focus();
// }

// 채팅을 분류시켜주는 함수
const sortChatAdminAndClient = (chatLogs) => {
  chatLogs.forEach((data) => {
    if (data.user_id == 1) {
      adminChatArray.push(data.content);
    } else {
      userChatArray.push(data.content);
    }
  });
};

// 채팅 기록을 가져오는 함수
axios
  .get("/chat/getChatLogClient")
  .then((e) => {
    console.log(e);
    const chatLogs = e.data;
    // sortChatAdminAndClient(chatLogs);
    // console.log(userChatArray);
    // console.log(adminChatArray);
    // let i = 0;
    // let j = 0;

    console.log(chatLogs);
    chatLogs.forEach((a) => {
      console.log(a);
      if (a.user_id != 1) {
        const clientMessagesSpan = document.createElement("div");
        const clientChatSpan = document.createElement("div");
        clientChatSpan.innerText = a.content;
        clientChatSpan.classList.add("bubble-right-child");
        clientMessagesSpan.classList.add("bubble-right");
        clientMessagesSpan.appendChild(clientChatSpan);
        messages.appendChild(clientMessagesSpan);
      } else {
        const adminMessagesSpan = document.createElement("div");
        const adminChatSpan = document.createElement("div");
        adminChatSpan.innerText = a.content;

        adminChatSpan.classList.add("bubble-left-child");
        adminMessagesSpan.classList.add("bubble-left");
        adminMessagesSpan.appendChild(adminChatSpan);
        messages.appendChild(adminMessagesSpan);
      }

      // if (adminChatArray[j]) {
      //   console.log(adminChatArray[j]);
      //   const adminMessagesSpan = document.createElement("div");
      //   const adminChatSpan = document.createElement("div");
      //   adminChatSpan.innerText = adminChatArray[j];
      //   adminChatSpan.style.display = "flex";
      //   adminChatSpan.style.justifyContent = "flex-end";
      //   adminMessagesSpan.appendChild(adminChatSpan);
      //   messages.appendChild(adminMessagesSpan);
      //   j++;
      // }
    });

    // while (i <= userChatArray.length - 1 || j <= adminChatArray.length - 1) {
    //   if (userChatArray[i]) {
    //     console.log(userChatArray[i]);
    //     const clientMessagesSpan = document.createElement("div");
    //     const clientChatSpan = document.createElement("div");
    //     clientChatSpan.style.display = "flex";
    //     clientChatSpan.style.justifyContent = "flex-start";
    //     clientChatSpan.innerText = userChatArray[i];
    //     clientMessagesSpan.appendChild(clientChatSpan);
    //     messages.appendChild(clientMessagesSpan);
    //     i++;
    //   }

    //   if (adminChatArray[j]) {
    //     console.log(adminChatArray[j]);
    //     const adminMessagesSpan = document.createElement("div");
    //     const adminChatSpan = document.createElement("div");
    //     adminChatSpan.innerText = adminChatArray[j];
    //     adminChatSpan.style.display = "flex";
    //     adminChatSpan.style.justifyContent = "flex-end";
    //     adminMessagesSpan.appendChild(adminChatSpan);
    //     messages.appendChild(adminMessagesSpan);
    //     j++;
    //   }
    // }
  })
  .catch((err) => {
    console.log(err);
  });
// 소켓선언
socket.emit("joinRoom");

socket.on("joinRoom", (userId) => {
  console.log(userId, "클라이언트 등장");
});

socket.on("chat", (content, userId) => {
  console.log(content, userId, "chattingClient에서 데이터 받음");
  if (userId == 1) {
    const adminMessagesSpan = document.createElement("div");
    const adminChatSpan = document.createElement("div");
    adminChatSpan.innerText = content;

    adminChatSpan.classList.add("bubble-left-child");
    adminMessagesSpan.classList.add("bubble-left");
    adminMessagesSpan.appendChild(adminChatSpan);
    messages.appendChild(adminMessagesSpan);
    messages.scrollTop = messages.scrollHeight;
  } else {
    const clientMessagesSpan = document.createElement("div");
    const clientChatSpan = document.createElement("div");
    clientChatSpan.classList.add("bubble-right-child");
    clientMessagesSpan.classList.add("bubble-right");
    clientChatSpan.innerText = content;
    clientMessagesSpan.appendChild(clientChatSpan);
    messages.appendChild(clientMessagesSpan);
    messages.scrollTop = messages.scrollHeight;
  }
});
