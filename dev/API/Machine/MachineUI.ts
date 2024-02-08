class MachineUI {
   public setStatus(container, data) {
       if (data.progress && data.progress > 0) {
    return container.setText(
      "Status",
      Translation.translate("Status: working")
    );
}
  if (data.energy && data.energy > 0) {
    return container.setText(
      "Status",
      Translation.translate("Status: have energy")
    );
  } else {
    return container.setText(
      "Status",
      Translation.translate("Status: don't have energy")
    );
  }
   };
   public setScale(name, value, container, data) {
       return container.setScale(name, data[value] / data[value+"Max"])
   };
}