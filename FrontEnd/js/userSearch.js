async function searchFunc(e) {
  const allUserProfiles = document.querySelectorAll(".user-search-item");
  const userSearchResult = document.querySelector(".user-search-list");
  const userInfoArray = [];
  allUserProfiles.forEach((userProfile) => {
    userInfoArray.push([
      userProfile,
      userProfile.querySelector(".user-name").innerText,
    ]);
  });
  const search = () => {
    const inputValue = document.querySelector("#search").value;

    console.log(inputValue);

    const englishResults = userInfoArray.filter((name, index) => {
      const pattern = new RegExp(`^${inputValue}`, "gi");
      return pattern.test(name[1]);
    });

    const koreanResults = userInfoArray.filter((name, index) => {
      const pattern = new RegExp(`^${inputValue}`, "g");
      return pattern.test(name[1]);
    });

    userSearchResult.innerHTML = "";
    if (englishResults.length > 0) {
      englishResults.forEach((name) => {
        console.log(name[1]);
        userSearchResult.appendChild(name[0]);
      });
    } else {
      userSearchResult.innerHTML += "<p>No English results found.</p>";
    }

    if (koreanResults.length > 0) {
      koreanResults.forEach((name) => {
        userSearchResult.appendChild(name[0]);
      });
    } else {
      userSearchResult.innerHTML += "<p>No Korean results found.</p>";
    }
  };
  document.getElementById("search").addEventListener("input", search);
}

async function setArray(e) {
  const userArray = e.data;
  const userSearchList = document.querySelector(".user-search-list");

  userArray.forEach((a) => {
    // 유저 하나의 정보 li
    const userSearchItem = document.createElement("li");
    userSearchItem.classList.add("user-search-item");
    userSearchItem.style.cursor = "pointer";
    userSearchItem.id = `userProfile${a.id}`;
    // 유저 프로필
    const img = document.createElement("img");
    if (a.img) {
      img.src = `${imgPath}/${a.img}`;
    }
    img.alt = "picture";

    // 유저 세부정보
    const userDetails = document.createElement("div");
    userDetails.classList.add("user-details");

    // 유저 이름
    const userName = document.createElement("div");
    userName.innerText = a.nickname;
    userName.classList.add("user-name");
    // 유저 이메일
    const userEmail = document.createElement("div");
    userEmail.innerText = a.email;
    userEmail.classList.add("user-email");

    userDetails.appendChild(userName);
    userDetails.appendChild(userEmail);

    userSearchItem.appendChild(img);
    userSearchItem.appendChild(userDetails);
    userSearchList.appendChild(userSearchItem);
  });
  console.log(e);
}

axios
  .get("/adminPage/getUser")
  .then(async (e) => {
    // 리스트 작성을 먼저한다.
    await setArray(e);
    searchFunc(e);
  })
  .catch((error) => {
    console.log(error);
  });

// 하이퍼 링크 변경

goToShowControl.href = `${url}/adminPage`;
goToUserSearch.href = `${url}/adminPage/userSearch`;
goToUserReport.href = `${url}/adminPage/userReport`;
// 하이퍼 링크 변경

changeHeaderUtil()
  