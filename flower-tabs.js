
/**
 * Flourish of Tumalo — Flower & Arrangement Gallery Tabs
 */

document.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll('[role="tablist"]');

  tabGroups.forEach((tabGroup) => {
    const tabs = Array.from(
      tabGroup.querySelectorAll('[role="tab"]')
    );

    if (!tabs.length) return;

    const panels = tabs.map((tab) =>
      document.getElementById(
        tab.getAttribute("aria-controls")
      )
    ).filter(Boolean);

    const activateTab = (selectedTab) => {
      const selectedPanel = document.getElementById(
        selectedTab.getAttribute("aria-controls")
      );

      if (!selectedPanel) return;

      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;

        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute(
          "aria-selected",
          String(isSelected)
        );
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isSelected = panel === selectedPanel;

        panel.hidden = !isSelected;
        panel.classList.toggle("is-active", isSelected);
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;

        switch (event.key) {
          case "ArrowRight":
            nextIndex = (index + 1) % tabs.length;
            break;

          case "ArrowLeft":
            nextIndex =
              (index - 1 + tabs.length) % tabs.length;
            break;

          case "Home":
            nextIndex = 0;
            break;

          case "End":
            nextIndex = tabs.length - 1;
            break;

          default:
            return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });

    // Initialize each tab group independently.
    const defaultTab =
      tabs.find(
        (tab) =>
          tab.getAttribute("aria-selected") === "true"
      ) || tabs[0];

    activateTab(defaultTab);
  });
});
