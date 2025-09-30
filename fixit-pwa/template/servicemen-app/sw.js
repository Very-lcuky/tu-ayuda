var cacheName = "fixit-app";
var filesToCache = [
  "../",
  "../index.html",
  "../../assets/css/vendors/bootstrap.css",
  "../../assets/css/vendors/bootstrap.rtl.min.css",
  "../../assets/css/vendors/calender.min.css",
  "../../assets/css/vendors/iconsax.css",
  "../../assets/css/vendors/swiper-bundle.min.css",
  "../../assets/css/style.css",
  "../../assets/js/apexcharts.js",
  "../../assets/js/assign-servicemen.js",
  "../../assets/js/bootstrap.bundle.min.js",
  "../../assets/js/calender.min.js",
  "../../assets/js/change-button.js",
  "../../assets/js/chatting-chat.js",
  "../../assets/js/custom-calender.js",
  "../../assets/js/custom-earning-chat.js",
  "../../assets/js/custom-map.js",
  "../../assets/js/custom-revenue-chat.js",
  "../../assets/js/custom-swiper.js",
  "../../assets/js/distance-slider.js",
  "../../assets/js/homescreen-popup.js",
  "../../assets/js/iconsax.js",
  "../../assets/js/image-change.js",
  "../../assets/js/multi-select.js",
  "../../assets/js/otp.js",
  "../../assets/js/password-show.js",
  "../../assets/js/quantity.js",
  "../../assets/js/range-slider.js",
  "../../assets/js/script.js",
  "../../assets/js/swiper-bundle.min.js",
  "../../assets/js/template-setting.js",
];

/* Start the service worker and cache all of the app's content */
setTimeout(() => {
  self.addEventListener("install", function (e) {
    e.waitUntil(
      caches.open(cacheName).then(function (cache) {
        return cache.addAll(filesToCache);
      })
    );
    self.skipWaiting();
  });
}, 500);
