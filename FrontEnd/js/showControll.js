
let showRadio = document.querySelectorAll(".show-radio");
showRadio.forEach((element) => {
  element.addEventListener("change", function (e) {
    console.log(e);
    if (this.checked) {
      let array = document.querySelectorAll(".show-control-label");

      array.forEach((a) => {
        if (a.classList.contains("checked-label")) {
          a.classList.remove("checked-label");
        }
      });
      document.querySelectorAll(".show").forEach((a) => {
        if (a.classList.contains("block")) {
          a.classList.remove("block");
        }
      });
      document.querySelector(`#label${this.id}`).classList.add("checked-label");
      document.querySelector(`#show${this.id}`).classList.add("block");
    }
  });
});

function displayImage() {
  const input = document.getElementById("showImg");
  const imgPreview = document.querySelector(".left");

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imgPreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
showImg.onchange = displayImage;

axios
  .get(`/adminPage/getShow`)
  .then((e) => {
    console.log(e.data, "데이터 가져옴 /adminPage/getShow");
    const performanceList = document.querySelector(".performance-list");

    const dataArray = e.data;
    dataArray.forEach((a) => {
      // 하나의 행을 차지하는 li태그
      const performanceItem = document.createElement("li");
      performanceItem.classList.add("performance-item");
      // 쇼를 감싸고 있는 태그
      const showInfo = document.createElement("div");
      showInfo.classList.add("show-info");
      // 쇼 이미지
      const img = document.createElement("img");
      img.src = `${imgPath}/${a.img}`;
      img.alt = "show poster";
      // 쇼의 이름
      const showInfoDetail = document.createElement("show-info-detail");
      showInfoDetail.classList.add("show-info-detail");
      showInfoDetail.innerHTML = `<span>Show Name:</span> <span> ${a.title}</span>`;

      // 버튼들
      const buttons = document.createElement("div");
      buttons.classList.add("buttons");
      const updateButton = document.createElement("button");
      updateButton.innerHTML = ` <a href="  /adminpage/update/${a.id}" style="color: red">Edit</a>`;
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = ` <a style="color: red">Delete</a>`;

      deleteButton.onclick = async () => {
        if (!confirm(a.title + "\n해당 공연을 삭제하시겠습니까?")) {
          alert("삭제 취소");
          return;
        }

        const { data } = await axios.get(`  /adminpage/delete/${a.id}`, {
          withCredentials: true,
        });
        if (data == "삭제성공") {
          alert("삭제 성공");
          window.location.reload();
        }
      };

      buttons.appendChild(updateButton);
      buttons.appendChild(deleteButton);
      showInfo.appendChild(img);
      showInfo.appendChild(showInfoDetail);
      showInfo.appendChild(buttons);
      performanceItem.appendChild(showInfo);
      performanceList.appendChild(performanceItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

document.querySelector(".enroll-show-button").addEventListener("click", (e) => {
  if (
    showImg.value == "" ||
    showName.value == "" ||
    showDuration.value == "" ||
    showGrade.value == "" ||
    showPrice.value == "" ||
    showContent.value == "" ||
    showStartDate.value == "" ||
    showEndDate.value == "" ||
    showStartTime.value == "" ||
    theater.value == ""
  ) {
    e.preventDefault();
    alert("작성하지 않은 정보가 있습니다.");
  }
});

// 하이퍼 링크 변경

goToShowControl.href = `  /adminPage`;
goToUserSearch.href = `  /adminPage/userSearch`;
goToUserReport.href = `  /adminPage/userReport`;
// 하이퍼 링크 변경

changeHeaderUtil();

function printMonthsAndDays(startDate, endDate) {
  var date1 = new Date(startDate);
  var date2 = new Date(endDate);

  while (date1 <= date2) {
    var month = date1.getMonth() + 1; // Adding 1 because months are zero-based
    var day = date1.getDate();
    console.log(month + "-" + day);

    date1.setDate(date1.getDate() + 1); // Move to the next day
  }
}

// Example usage:
var startDate = "06-23";
var endDate = "07-23";
printMonthsAndDays(startDate, endDate);

