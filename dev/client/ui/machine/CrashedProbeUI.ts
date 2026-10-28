const CrashedProbeUI = new UI.StandardWindow(
  (() => {
    const content = {
      standard: {
        header: {
          text: {
            text: Translation.translate("Crashed probe"),
          },
        },
        inventory: {
          standard: true,
        },
        background: {
          standard: true,
        },
      },
      elements: {},
    };

    let counter = 0;
    let start = 380;
    const end = 940;

    while (start <= end) {
      content.elements["slot_" + counter] = {
        type: "slot",
        x: start,
        y: 200,
        size: 70,
      };
      start += 70;
      counter++;
    }

    return content;
  })()
);
