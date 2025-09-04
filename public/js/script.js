
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Tax switch toggle
  const taxSwitch = document.getElementById("flexSwitchCheckDefault");
  if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
      const taxInfo = document.getElementsByClassName("tax-info");
      for (let info of taxInfo) {
        info.style.display = (info.style.display !== "inline") ? "inline" : "none";
      }
    });
  }

  // ✅ Left & Right filter buttons
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const filtersContainer = document.getElementById("filters-container");
  const filter = document.querySelector(".filter");

  if (leftBtn && rightBtn && filtersContainer && filter) {
    const filterWidth = filter.offsetWidth + 32;

    leftBtn.addEventListener("click", function () {
      filtersContainer.scrollLeft -= filterWidth;
    });

    rightBtn.addEventListener("click", function () {
      filtersContainer.scrollLeft += filterWidth;
    });
  }

  // ✅ Touch scroll for filters container
  if (filtersContainer) {
    let startX;
    let scrollLeft;

    filtersContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = filtersContainer.scrollLeft;
    });

    filtersContainer.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = startX - x;
      filtersContainer.scrollLeft = scrollLeft + walk;
    });
  }
});
