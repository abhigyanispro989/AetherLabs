(() => {
  const colorPicker = document.querySelector('#wire-color');
  const typePicker = document.querySelector('#wire-type');
  const originalAdd = addComponent;
  const originalRender = renderComponents;
  const originalWireRender = updateWires;
  const originalSelect = selectTerminal;
  const ledColors = { red: '#ee4354', green: '#39c982', blue: '#3a8df2', yellow: '#f4c342', white: '#f4f6ff', purple: '#a267f5' };

  addComponent = function (type, x, y) {
    originalAdd(type, x, y);
    const item = components[components.length - 1];
    if (item?.type === 'led') item.color = 'red';
    if (item?.type === 'resistor') item.ohms = 220;
    renderComponents();
  };

  function decorateComponents() {
    components.forEach((component) => {
      const card = document.querySelector(`[data-component="${CSS.escape(component.id)}"]`);
      if (!card || card.querySelector('.component-settings')) return;
      if (component.type !== 'led' && component.type !== 'resistor') return;
      const controls = document.createElement('div');
      controls.className = 'component-settings';
      if (component.type === 'led') {
        component.color ||= 'red';
        const label = document.createElement('label');
        label.textContent = 'LED color';
        const select = document.createElement('select');
        select.setAttribute('aria-label', 'LED color');
        Object.keys(ledColors).forEach((name) => {
          const option = document.createElement('option'); option.value = name;
          option.textContent = name[0].toUpperCase() + name.slice(1); select.append(option);
        });
        select.value = component.color;
        select.addEventListener('pointerdown', (event) => event.stopPropagation());
        select.addEventListener('change', () => {
          window.innocadRemember?.();
          component.color = select.value;
          paintLed(card, component.color);
        });
        label.append(select); controls.append(label); paintLed(card, component.color);
      } else {
        component.ohms ||= 220;
        const label = document.createElement('label'); label.textContent = 'Resistance';
        const input = document.createElement('input'); input.type = 'number'; input.min = '1'; input.max = '10000000'; input.step = '1';
        input.value = component.ohms; input.setAttribute('aria-label', `Resistance in ohms for ${component.name}`);
        input.addEventListener('pointerdown', (event) => event.stopPropagation());
        input.addEventListener('change', () => {
          window.innocadRemember?.();
          component.ohms = Math.min(10000000, Math.max(1, Number(input.value) || 220));
          input.value = component.ohms;
          card.querySelector('.component-state').textContent = `${component.ohms} Ω`;
        });
        label.append(input); const unit = document.createElement('span'); unit.textContent = 'Ω'; label.append(unit); controls.append(label);
        card.querySelector('.component-state').textContent = `${component.ohms} Ω`;
      }
      const head = card.querySelector('.component-head');
      head.insertAdjacentElement('afterend', controls);
    });
  }

  function paintLed(card, color) {
    const bulb = card.querySelector('.part-visual svg path:nth-of-type(2)');
    if (bulb) { bulb.setAttribute('fill', ledColors[color] || ledColors.red); bulb.setAttribute('stroke', color === 'red' ? '#aa2335' : '#354d68'); }
    const state = card.querySelector('.component-state');
    if (state) state.style.color = ledColors[color] || ledColors.red;
  }

  renderComponents = function () { originalRender(); decorateComponents(); };
  updateWires = function () {
    originalWireRender();
    const svg = document.querySelector('#wire-layer');
    [...svg.querySelectorAll('.wire-path')].forEach((path, index) => {
      const wire = wires[index]; if (!wire) return;
      const color = wire.color || colorPicker.value;
      const kind = wire.style || typePicker.value;
      path.style.stroke = color;
      path.style.strokeWidth = kind === 'alligator' ? '6px' : kind === 'hookup' ? '2px' : kind === 'breadboard' ? '3px' : '3.5px';
      if (kind === 'hookup') path.style.strokeDasharray = '7 3';
      else if (kind === 'alligator') path.style.strokeDasharray = 'none';
      else path.style.strokeDasharray = '';
      if (kind === 'alligator') {
        path.style.strokeLinecap = 'round';
        const parts = path.getAttribute('d').match(/M ([\d.]+) ([\d.]+).*L ([\d.]+) ([\d.]+)$/);
        if (parts) [[parts[1], parts[2]], [parts[3], parts[4]]].forEach(([cx, cy]) => {
          const clip = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          clip.setAttribute('cx', cx); clip.setAttribute('cy', cy); clip.setAttribute('r', '5');
          clip.setAttribute('fill', color); clip.setAttribute('stroke', '#eaf2f8'); clip.setAttribute('stroke-width', '1.5'); svg.append(clip);
        });
      }
    });
  };
  selectTerminal = function (id) {
    const count = wires.length;
    originalSelect(id);
    if (wires.length > count) {
      const wire = wires[wires.length - 1];
      wire.color = colorPicker.value; wire.style = typePicker.value;
      updateWires();
    }
  };

  function recolorAll() {
    window.innocadRemember?.();
    wires.forEach((wire) => { wire.color = colorPicker.value; wire.style = typePicker.value; });
    updateWires();
  }
  colorPicker.addEventListener('change', recolorAll);
  typePicker.addEventListener('change', recolorAll);
  document.querySelector('#load-demo').addEventListener('click', () => setTimeout(() => {
    components.forEach((component) => { if (component.type === 'led') component.color = 'red'; if (component.type === 'resistor') component.ohms = 220; });
    wires.forEach((wire) => { wire.color = colorPicker.value; wire.style = typePicker.value; });
    renderComponents(); updateWires();
  }, 0));
  decorateComponents();
})();
