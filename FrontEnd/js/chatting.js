const socket = io.connect();
const sendButton = document.querySelector(".chat-send-botton");
//유저의 채팅 배열
const userChatArray = [];
// 관리자의 채팅 배열
const adminChatArray = [];
let selectUser;
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

// 처음 들어왔을 때 전체 채팅기록을 불러와서 보지 않은 채팅수를 통해 html조작
const changeMessageCount = () => {
  console.log("카운트 실행");
  axios
    .get("/chat/getAllChats")
    .then((e) => {
      let count = 0;
      console.log(e);
      e.data.forEach((a) => {
        if (!a.isRead) {
          count++;
        }
      });
      document.querySelector(".not-read-count").innerText = count;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUsers = async () => {
  const { data } = await axios.get("/chat/Users");
  const popupContent = document.querySelector(".popup-content");
  data.forEach((e, index) => {
    // return은 함수 실행중 return 문을 만나면 return 문 뒤에 쓴 값을 반환한다.
    if (e.id == 1) return;
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    div.id = "user" + e.id;
    div.className = "imgsize";
    img.src = `/imgs/${e.img}`;

    p.innerHTML = e.nickname;
    div2.className = "border-bottom";
    div.append(img, p);
    popupContent.append(div, div2);
    div.addEventListener("click", (a) => {
      console.log(document.querySelector("#clientName"));
      document.querySelector(
        "#clientName"
      ).innerText = `${e.nickname}님과 상담중입니다.`;
      // clientName.innerText=`${e.nickname}과 상담중입니다.`
      console.log(a.target.id);
      let username = a.target.id;
      let splitIndex = username.search(/\d/); // Find the index where the number starts
      let numberPart = username.substring(splitIndex);
      document.querySelector(".popup-content.chattingroom2").style.display =
        "block";
      document.querySelector(
        ".popup-content.chattingRoomBefore"
      ).style.display = "none";
      console.log(numberPart); // Outputs: '2'
      selectUser = numberPart;
      getUserChatLog(parseInt(numberPart));
    });
  });
};

getUsers();

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

// 해당하는 유저의 채팅 로그를 가져오는 함수
const getUserChatLog = async (id) => {
  const chatArray = await axios.get("/chat/getChatLogAdmin", {
    params: { id },
  });

  // 소켓선언
  socket.emit("joinRoom");

  socket.on("joinRoom", (userId) => {
    console.log(userId, "어드민 등장");
  });

  // let i = 0;
  // let j = 0;
  // sortChatAdminAndClient(chatArray.data);

  if (messages.innerHTML) {
    messages.innerHTML = "";
  }

  chatArray.data.forEach((a) => {
    if (a.user_id != 1) {
      const clientMessagesSpan = document.createElement("div");
      const clientChatSpan = document.createElement("div");
      clientChatSpan.innerText = a.content;
      clientChatSpan.classList.add("bubble-left-child");
      clientMessagesSpan.classList.add("bubble-left");
      clientMessagesSpan.appendChild(clientChatSpan);
      messages.appendChild(clientMessagesSpan);
    } else {
      const adminMessagesSpan = document.createElement("div");
      const adminChatSpan = document.createElement("div");
      adminChatSpan.innerText = a.content;
      adminChatSpan.classList.add("bubble-right-child");
      adminMessagesSpan.classList.add("bubble-right");
      adminMessagesSpan.appendChild(adminChatSpan);
      messages.appendChild(adminMessagesSpan);
    }
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
};

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
// 전송버튼
document.querySelector(".chat-send-botton").addEventListener("click", () => {
  axios
    .post("/chat/createAdminChat", { chat: chatId1.value, id: selectUser })
    .then((e) => {
      console.log(e);
      chatId1.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
  // 채팅 보내주는 소켓
  socket.emit("chat3", chatId1.value, selectUser);
});

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

// 눌렀을 시 채팅창 보이게
const popUpChattingRoom = () => {
  const poopUpBtn = document.querySelector(".chat-icon");
  poopUpBtn.addEventListener("click", () => {
    console.log(poopUpBtn);
    const chattingRoom = document.querySelector(".popup-wrap");
    chattingRoom.style.display = "block";
    chattingRoom.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  });
};

// x눌렀을시 채팅창 사라지게
const closeChattingRoom = () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    const chattingRoom = document.querySelector(".popup-wrap");
    chattingRoom.style.display = "none";
    chattingRoom.style.backgroundColor = "";
  });
};
// x눌렀을시 채팅창 사라지게=>채팅방
const closeChattingRoom2 = () => {
  const closeBtn2 = document.querySelector(".close-btn2");
  closeBtn2.addEventListener("click", () => {
    document.querySelector(".popup-content.chattingroom2").style.display =
      "none";
    document.querySelector(".popup-content.chattingRoomBefore").style.display =
      "block";
    const chattingRoom = document.querySelector(".popup-wrap");
    console.log(chattingRoom.style.display);
    chattingRoom.style.display = "none";
    chattingRoom.style.backgroundColor = "";
    changeMessageCount();
  });
};
closeChattingRoom();
popUpChattingRoom();
closeChattingRoom2();

socket.on("chat", (content, userId) => {
  console.log(content, "어드민 채팅 들어옴");
  if (userId == 1) {
    const adminMessagesSpan = document.createElement("div");
    const adminChatSpan = document.createElement("div");
    adminChatSpan.innerText = content;
    adminMessagesSpan.classList.add("bubble-right");
    adminChatSpan.classList.add("bubble-right-child");
    adminMessagesSpan.appendChild(adminChatSpan);
    messages.appendChild(adminMessagesSpan);
    // 새로운 채팅을 추가해줬을때 밑으로 내려주는 채팅
    messages.scrollTop = messages.scrollHeight;
  } else {
    const clientMessagesSpan = document.createElement("div");
    const clientChatSpan = document.createElement("div");
    clientChatSpan.innerText = content;
    clientChatSpan.classList.add("bubble-left-child");
    clientMessagesSpan.classList.add("bubble-left");
    clientMessagesSpan.appendChild(clientChatSpan);
    messages.appendChild(clientMessagesSpan);
    // 새로운 채팅을 추가해줬을때 밑으로 내려주는 채팅
    messages.scrollTop = messages.scrollHeight;
  }
});

changeMessageCount();
