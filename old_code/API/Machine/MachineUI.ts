type strObject = Record<string, Object>;

class MachineUI {
  public prototype: strObject = {};
  public setStatus(container, data) {
    const status = (status) =>
      container.setText("Status", Translation.translate("Status: " + status));

    if (data.progress && data.progress > 0) {
      status("working");
    }

    if (data.energy && data.energy > 0) {
      status("have energy");
    } else {
      status("don't have energy");
    }
  }

  public setScale(name, value = "energy", container, data) {
    return container.setScale(name, data[value] / data[value + "Max"]);
  }

  public genericScale(container, data) {
    const scale = (value) => this.setScale(value, value, container, data);

    if (data.energy) scale("energy");
    if (data.progress) scale("progress");
    if (data.liquid) scale("liquid");
  }

  constructor(prototype: strObject) {
    this.prototype = prototype;
  }

  public registry() {
    return new UI.StandardWindow(this.prototype);
  }

  public addElements(elements: strObject) {
    const assign = ObjectAssign(this.prototype.elements, elements);
    alert("UI: Assign Elements = " + JSON.stringify(assign));
  }
}
