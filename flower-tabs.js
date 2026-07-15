/**
 * Flourish of Tumalo — flower ordering tabs
 * Switches between "Custom Bouquets" and "Bouquet Subscription" panels
 * on flowers.html. Loaded in addition to main.js.
 */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll("[data-flower-tab]"));
  const panels = Array.from(document.querySelectorAll(".flower-panel"));

  let activePanel = document.querySelector(".flower-panel.is-active");
  let isSwitchingTabs = false;

  const activateFlowerTab = (selectedTab, animate = true) => {
    if (!selectedTab || isSwitchingTabs) return;

    const selectedPanelId = selectedTab.dataset.flowerTab;
    const selectedPanel = document.getElementById(selectedPanelId);
    if (!selectedPanel) return;

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.classList.toggle("is-active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    if (selectedPanel === activePanel) return;

    if (!animate || !activePanel) {
      panels.forEach((panel) => {
        const isSelected = panel === selectedPanel;
        panel.hidden = !isSelected;
        panel.classList.toggle("is-active", isSelected);
      });
      activePanel = selectedPanel;
      return;
    }

    isSwitchingTabs = true;
    activePanel.classList.remove("is-active");

    window.setTimeout(() => {
      panels.forEach((panel) => {
        panel.hidden = panel !== selectedPanel;
      });
      selectedPanel.hidden = false;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          selectedPanel.classList.add("is-active");
          activePanel = selectedPanel;

          window.setTimeout(() => {
            isSwitchingTabs = false;
          }, 320);
        });
      });
    }, 220);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateFlowerTab(tab);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      activateFlowerTab(nextTab);
    });
  });

  /* Automatically open Custom Bouquets without animation */
  const defaultTab = document.getElementById("custom-bouquets-tab");
  if (defaultTab) {
    activateFlowerTab(defaultTab, false);
  }
});
