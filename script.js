const OPTS = {
  fill: "none",
  radius: 25,
  strokeWidth: { 50: 0 },
  scale: { 0: 1 },
  angle: { "rand(-35, -70)": 0 },
  duration: 6000,
  left: 0,
  top: 0,
  easing: "cubic.out",
};

const circle1 = new mojs.Shape({
  ...OPTS,
  stroke: "cyan",
});

const circle2 = new mojs.Shape({
  ...OPTS,
  radius: { 0: 15 },
  strokeWidth: { 30: 0 },
  stroke: "magenta",
  delay: "rand(75, 150)",
});

document.addEventListener("click", function (e) {
  circle1.tune({ x: e.pageX, y: e.pageY }).replay();

  circle2.tune({ x: e.pageX, y: e.pageY }).replay();
});

toastr.options = {
  positionClass: "toast-bottom-right", // Adjust position as needed
  timeOut: 5000, // Display duration (milliseconds)
  closeButton: true, // Show a close button on each toast
};
let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

// menu.onclick = () => {
//   menu.classList.toggle("fa-times");
//   navbar.classList.toggle("active");
// };
// const bouncyCircle = new mojs.Shape({
//   parent: "#bouncyCircle",
//   shape: "circle",
//   fill: { "#F64040": "#FC46AD" },
//   radius: { 20: 80 },
//   duration: 2000,
//   isYoyo: true,
//   isShowStart: true,
//   easing: "elastic.inout",
//   repeat: 1,
// });

// bouncyCircle.play();
// for window scroll

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 0) {
    document.querySelector(".header").classList.add("active");
  } else {
    document.querySelector(".header").classList.remove("active");
  }
};

window.onload = () => {
  if (window.scrollY > 0) {
    document.querySelector(".header").classList.add("active");
  } else {
    document.querySelector(".header").classList.remove("active");
  }
};

// for home pages

var swiper = new Swiper(".home-slider", {
  spaceBetween: 20,
  effect: "fade",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
});

//   for feature section

var swiper = new Swiper(".feature-slider", {
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

//   for trainers section

var swiper = new Swiper(".trainer-slider", {
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

//   for blogs section

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

// add extra
$.ajax({
  url: "http://numbersapi.com/1/30/date?json",
  dataType: "json",
  success: function (data) {
    $("#api-response").text(data.text);
    $("#api-response1").text(data.year);
    $("#api-response2").text(data.number);
    $("#api-response3").text(data.type);
    $("#api-response4").text(data.found);
  },
});

// Function to handle image uploads
function handleImageUpload(files) {
  // Handle image uploads here and send them to the server
  // You can use FormData to send the images to the server via AJAX
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  $.ajax({
    url: "/upload",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // Handle the response from the server
      console.log(response);
    },
  });
}

// Implement the drag-and-drop functionality
$("#image-dropzone").on("dragover", function (e) {
  e.preventDefault();
  $(this).addClass("dragover");
});

$("#image-dropzone").on("dragleave", function (e) {
  e.preventDefault();
  $(this).removeClass("dragover");
});

$("#image-dropzone").on("drop", function (e) {
  e.preventDefault();
  $(this).removeClass("dragover");
  handleImageUpload(e.originalEvent.dataTransfer.files);
});

$("#image-dropzone").on("click", function () {
  // Trigger file input click when the dropzone is clicked
  $("#file-input").click();
});

// Input field for file selection
$('<input type="file" id="file-input" style="display:none;">')
  .appendTo("#image-dropzone")
  .on("change", function () {
    handleImageUpload(this.files);
  });

$("#open-popup").click(function () {
  $("#file-upload-popup").css("display", "block");
});

// Initialize Dropzone.js
Dropzone.options.myDropzone = {
  url: "http://localhost:3000/upload",
  paramName: "file", // The name that will be used for the uploaded file(s)
  maxFilesize: 100, // Set the maximum file size in MB
  acceptedFiles: "image/*,video/*", // Allow both image and video files
  init: function () {
    this.on("success", function (file, response) {
      // Handle the server response on successful upload
      toastr.success("File uploaded successfully");

      // Display a success message in the popup
      $("#upload-status").html(
        '<p class="success-message">File uploaded successfully</p>'
      );

      // Close the popup after a short delay (optional)
      setTimeout(function () {
        $("#file-upload-popup").css("display", "none");
      }, 2000); // Close after 2 seconds (adjust as needed)
    });

    this.on("error", function (file, errorMessage) {
      // Handle the error if the upload fails
      toastr.error("Upload failed: " + errorMessage);

      // Display an error message in the popup
      $("#upload-status").html(
        '<p class="error-message">Upload failed: ' + errorMessage + "</p>"
      );
    });
  },
};
$(document).ready(function () {
  $("#create-user-form").submit(function (e) {
    e.preventDefault();
    const dataToSend = {
      email: $("#email").val(),
      password: $("#password").val(),
      type: $("#type").val(),
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/create-user",
      data: JSON.stringify(dataToSend), // Convert the data to a JSON string
      contentType: "application/json",
      success: function (data) {
        if (data.success) {
          $("#message").text("User created successfully!");
          $("#message").css("color", "green");
        } else {
          $("#message").text("User creation failed. Please try again.");
          $("#message").css("color", "red");
        }
      },
      error: function () {
        console.error("An error occurred. Please try again later.");
        $("#message").text("An error occurred. Please try again later.");
        $("#message").css("color", "red");
      },
    });
  });
});
// document.addEventListener("click", function (e) {
//   for (let i = 0; i < smallCircles.length; i++) {
//     smallCircles[i].generate().replay();
//   }
// });
