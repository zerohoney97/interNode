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
      document
        .querySelector(`#label${this.id}`)
        .classList.add("checked-label");
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

