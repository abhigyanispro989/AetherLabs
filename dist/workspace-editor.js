(() => {
  const originalVisual = componentVisual;
  const originalAdd = addComponent;
  const originalSelectTerminal = selectTerminal;
  const originalRemove = removeComponent;
  const originalSetBoard = setBoard;
  const originalLoadDemo = loadDemo;
  const originalUpdateWires = updateWires;
  const newParts = [
    {type:'capacitor',name:'Capacitor',caption:'10 µF · non-polarized',glyph:'◉',category:'Power',terminals:[['1','Lead 1'],['2','Lead 2']]},
    {type:'polar-cap',name:'Polarized capacitor',caption:'Electrolytic · observe polarity',glyph:'◉',category:'Power',terminals:[['+','Positive'],['−','Negative']]},
    {type:'diode',name:'Diode',caption:'1N4007 · one-way current',glyph:'▶',category:'Power',terminals:[['A','Anode'],['K','Cathode']]},
    {type:'zener',name:'Zener diode',caption:'Voltage reference',glyph:'▶',category:'Power',terminals:[['A','Anode'],['K','Cathode']]},
    {type:'inductor',name:'Inductor',caption:'Energy storage',glyph:'∿',category:'Power',terminals:[['1','Lead 1'],['2','Lead 2']]},
    {type:'pot',name:'Potentiometer',caption:'Variable input',glyph:'◉',category:'Input',terminals:[['1','End 1'],['W','Wiper'],['2','End 2']]},
    {type:'slide-switch',name:'Slide switch',caption:'SPDT input',glyph:'▰',category:'Input',terminals:[['1','Common'],['2','Throw A'],['3','Throw B']]},
    {type:'pir',name:'PIR sensor',caption:'Motion detector',glyph:'◉',category:'Input',terminals:[['VCC','VCC'],['OUT','OUT'],['GND','GND']]},
    {type:'moisture',name:'Soil moisture',caption:'Analog sensor',glyph:'▥',category:'Input',terminals:[['VCC','VCC'],['SIG','Signal'],['GND','GND']]},
    {type:'tilt',name:'Tilt sensor',caption:'SW-520D · orientation',glyph:'▰',category:'Input',terminals:[['1','Pin 1'],['2','Pin 2']]},
    {type:'temperature',name:'Temperature sensor',caption:'TMP36 · analog',glyph:'▾',category:'Input',terminals:[['VCC','VCC'],['OUT','Vout'],['GND','GND']]},
    {type:'gas',name:'Gas sensor',caption:'MQ-series · analog',glyph:'◉',category:'Input',terminals:[['VCC','VCC'],['AO','Analog out'],['DO','Digital out'],['GND','GND']]},
    {type:'keypad',name:'Keypad 4×4',caption:'Matrix input',glyph:'▦',category:'Input',terminals:[['R1','Row 1'],['R2','Row 2'],['R3','Row 3'],['R4','Row 4'],['C1','Col 1'],['C2','Col 2'],['C3','Col 3'],['C4','Col 4']]},
    {type:'dipswitch',name:'DIP switch',caption:'4-position · SPST',glyph:'▥',category:'Input',terminals:[['1','Switch 1'],['2','Switch 2'],['3','Switch 3'],['4','Switch 4']]}
  ];
  library.push(...newParts);
  const art = {
    capacitor:`<svg viewBox="0 0 160 86"><path d="M8 43h57m30 0h57" stroke="#aab4ba" stroke-width="3"/><path d="M68 17v52m23-52v52" stroke="#556672" stroke-width="6"/><path d="M68 18v50m23-50v50" stroke="#c7d0d4" stroke-width="2"/></svg>`,
    'polar-cap':`<svg viewBox="0 0 160 86"><path d="M70 11v66m20-66v66" stroke="#9daab1" stroke-width="3"/><path d="M56 27q0-10 10-10h28q10 0 10 10v38q0 9-10 9H66q-10 0-10-9z" fill="#34454e" stroke="#1f2c33" stroke-width="3"/><path d="M62 27h36v8H62z" fill="#e7edf0"/><text x="67" y="56" font-size="18" fill="#e9f2f5">−</text><text x="82" y="57" font-size="11" fill="#e9f2f5">100µF</text></svg>`,
    diode:`<svg viewBox="0 0 160 86"><path d="M10 43h50m40 0h50" stroke="#a8b2b6" stroke-width="3"/><rect x="57" y="31" width="47" height="24" rx="10" fill="#242c30" stroke="#101719" stroke-width="2"/><path d="M88 32v22" stroke="#cbd3d6" stroke-width="4"/><path d="M71 36v14m9-14v14" stroke="#454e53" stroke-width="2"/></svg>`,
    zener:`<svg viewBox="0 0 160 86"><path d="M10 43h50m40 0h50" stroke="#a8b2b6" stroke-width="3"/><rect x="57" y="31" width="47" height="24" rx="10" fill="#20282d" stroke="#101719" stroke-width="2"/><path d="M87 32v22m-5-20 5-4m0 46 5-4" stroke="#d1d9dc" stroke-width="3"/></svg>`,
    inductor:`<svg viewBox="0 0 160 86"><path d="M8 43h24m96 0h24" stroke="#9daab0" stroke-width="3"/><path d="M32 43c0-22 18-22 18 0s18 22 18 0 18-22 18 0 18 22 18 0 18-22 18 0" fill="none" stroke="#bc7432" stroke-width="7" stroke-linecap="round"/><path d="M34 43c0-17 14-17 14 0m8 0c0 17 14 17 14 0m8 0c0-17 14-17 14 0m8 0c0 17 14 17 14 0m8 0c0-17 14-17 14 0" fill="none" stroke="#e1a44c" stroke-width="2"/></svg>`,
    pot:`<svg viewBox="0 0 160 86"><path d="M57 57v24m23-24v24m23-24v24" stroke="#aeb8bd" stroke-width="3"/><path d="M48 34q0-8 8-8h48q8 0 8 8v22H48z" fill="#354953" stroke="#20313a" stroke-width="3"/><circle cx="80" cy="30" r="19" fill="#315a74" stroke="#233f51" stroke-width="4"/><path d="M80 12v17l12-9" fill="none" stroke="#d8e6eb" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="30" r="3" fill="#e8f0f2"/></svg>`,
    'slide-switch':`<svg viewBox="0 0 160 86"><path d="M51 57v25m58-25v25m-29-25v25" stroke="#aeb8bd" stroke-width="3"/><rect x="34" y="25" width="92" height="37" rx="5" fill="#252f35" stroke="#11191e" stroke-width="3"/><rect x="44" y="32" width="72" height="21" rx="4" fill="#596a73"/><rect x="79" y="28" width="25" height="29" rx="4" fill="#d7e0e3" stroke="#85949b" stroke-width="2"/></svg>`,
    pir:`<svg viewBox="0 0 160 86"><rect x="28" y="18" width="104" height="52" rx="5" fill="#16866a" stroke="#0c5a4d" stroke-width="3"/><circle cx="80" cy="43" r="22" fill="#eef1e4" stroke="#c5cbbb" stroke-width="3"/><path d="M62 43q18-24 36 0-18 24-36 0zm8 0q10-14 20 0-10 14-20 0z" fill="#dce1d2"/><path d="M53 70v10m27-10v10m27-10v10" stroke="#c6a353" stroke-width="3"/></svg>`,
    moisture:`<svg viewBox="0 0 160 86"><path d="M50 22v58m60-58v58" stroke="#adb8be" stroke-width="8"/><path d="M55 27v43m50-43v43" stroke="#98a4a9" stroke-width="2"/><rect x="39" y="11" width="82" height="34" rx="4" fill="#d9413a" stroke="#a6292a" stroke-width="3"/><circle cx="80" cy="20" r="4" fill="#eab94e"/><path d="M59 39h42" stroke="#e9eceb" stroke-width="2"/></svg>`,
    tilt:`<svg viewBox="0 0 160 86"><rect x="34" y="26" width="92" height="34" rx="16" fill="#258c45" stroke="#17632f" stroke-width="3"/><rect x="45" y="34" width="70" height="18" rx="9" fill="#35aa58"/><text x="56" y="47" font-size="9" fill="#e9ffec">SW-520D</text><path d="M57 60v20m46-20v20" stroke="#aeb8bd" stroke-width="3"/></svg>`,
    temperature:`<svg viewBox="0 0 160 86"><path d="M65 55v27m15-27v27m15-27v27" stroke="#aeb8bd" stroke-width="3"/><path d="M57 55V25q0-12 23-12t23 12v30q0 11-23 11T57 55z" fill="#333e43" stroke="#1d272b" stroke-width="3"/><path d="M63 24h34" stroke="#536067" stroke-width="3"/><text x="69" y="47" font-size="9" fill="#dce5e7">TMP</text></svg>`,
    gas:`<svg viewBox="0 0 160 86"><path d="M66 68v14m14-14v14m14-14v14" stroke="#aab6bb" stroke-width="3"/><path d="M52 59V36q0-8 8-8h48q8 0 8 8v23q0 8-8 8H60q-8 0-8-8z" fill="#b9c3c6" stroke="#78878d" stroke-width="3"/><ellipse cx="84" cy="28" rx="29" ry="14" fill="#d5dcde" stroke="#78878d" stroke-width="3"/><path d="M62 22q22-16 44 0" fill="none" stroke="#87959a" stroke-width="5"/><circle cx="84" cy="22" r="4" fill="#87959a"/></svg>`,
    keypad:`<svg viewBox="0 0 160 86"><rect x="40" y="7" width="80" height="72" rx="5" fill="#252f39" stroke="#101820" stroke-width="3"/>${Array.from({length:16},(_,i)=>`<rect x="${49+(i%4)*16}" y="${15+Math.floor(i/4)*15}" width="11" height="9" rx="2" fill="${i%4===3?'#e5aa3c':'#3798d5'}"/>`).join('')}<path d="M47 79v5m14-5v5m14-5v5m14-5v5m14-5v5m14-5v5" stroke="#c2ccd0" stroke-width="2"/></svg>`,
    dipswitch:`<svg viewBox="0 0 160 86"><rect x="29" y="18" width="102" height="49" rx="4" fill="#d63028" stroke="#a61f1f" stroke-width="3"/>${Array.from({length:4},(_,i)=>`<rect x="${39+i*20}" y="24" width="16" height="34" rx="2" fill="#242d32"/><rect x="${42+i*20}" y="${i%2?27:41}" width="10" height="13" rx="2" fill="#e5e9e8"/>`).join('')}<path d="M44 67v11m22-11v11m22-11v11m22-11v11" stroke="#bfc9cc" stroke-width="2"/></svg>`
  };
  componentVisual = type => art[type] || originalVisual(type) || `<svg viewBox="0 0 160 86" aria-hidden="true"><rect x="30" y="15" width="100" height="56" rx="7" fill="#2583b9" stroke="#155978" stroke-width="3"/><circle cx="80" cy="43" r="15" fill="#d9e3e9"/><path d="M80 71v10m-25-10v10m50-10v10" stroke="#caa958" stroke-width="3"/></svg>`;

  const categoryFor = part => part.category || (['led','resistor','button','ultrasonic','servo','buzzer','motor','driver'].includes(part.type) ? ({led:'Output',resistor:'General',button:'Input',ultrasonic:'Input',servo:'Output',buzzer:'Output',motor:'Output',driver:'Output'}[part.type]) : 'General');
  renderLibrary = function(filter='') {
    const list=byId('component-list'),query=filter.trim().toLowerCase(),selected=byId('component-filter').value;
    list.innerHTML='';
    const groups=['General','Input','Output','Power'];
    groups.forEach(group=>{
      const items=library.filter(part=>categoryFor(part)===group&&(selected==='All'||selected===group)&&`${part.name} ${part.caption}`.toLowerCase().includes(query));
      if(!items.length)return;
      const section=document.createElement('section');section.className='component-category';section.dataset.category=group;
      const heading=document.createElement('h3');heading.className='category-title';heading.textContent=group;section.append(heading);
      items.forEach(part=>{
        const button=document.createElement('button');button.type='button';button.className='component-item';button.draggable=true;button.dataset.type=part.type;
        button.innerHTML=`<span class="component-glyph">${part.glyph}</span><span class="library-part-art">${componentVisual(part.type)}</span><span><b>${part.name}</b><small>${part.caption}</small><small class="component-pin-labels" title="Pin names">Pins: ${part.terminals.map(([,label])=>label).join(' · ')}</small></span>`;
        button.addEventListener('click',()=>addComponent(part.type));
        button.addEventListener('dragstart',event=>{event.dataTransfer.setData('text/plain',part.type);event.dataTransfer.effectAllowed='copy'});
        section.append(button);
      });list.append(section);
    });
  };
  byId('component-filter').addEventListener('change',()=>renderLibrary(byId('component-search').value));
  byId('component-search').placeholder='Search parts';
  renderLibrary();

  const past=[],future=[];
  const snapshot=()=>({board:currentBoard,components:JSON.parse(JSON.stringify(components)),wires:JSON.parse(JSON.stringify(wires)),code:byId('code-editor').value,title:byId('project-title').value,language:byId('language-select').value});
  const remember=()=>{past.push(snapshot());if(past.length>80)past.shift();future.length=0;refreshHistoryButtons()};
  window.innocadRemember=remember;
  const restore=state=>{if(!state)return;currentBoard=state.board;components=JSON.parse(JSON.stringify(state.components));wires=JSON.parse(JSON.stringify(state.wires));byId('board-select').value=currentBoard;renderBoard();setLanguageOptions();if(state.language&&[...byId('language-select').options].some(o=>o.value===state.language))byId('language-select').value=state.language;byId('code-editor').value=state.code;byId('project-title').value=state.title;selectedTerminal=null;renderConnections();updateWires();byId('workspace-save-status').textContent='Circuit change restored'};
  const refreshHistoryButtons=()=>{byId('undo-action').disabled=!past.length;byId('redo-action').disabled=!future.length};
  addComponent=function(type,x,y){remember();originalAdd(type,x,y);byId('workspace-save-status').textContent=`${library.find(p=>p.type===type)?.name||'Part'} added`};
  selectTerminal=function(id){if(selectedTerminal&&selectedTerminal!==id)remember();originalSelectTerminal(id)};
  removeComponent=function(id){remember();originalRemove(id)};
  setBoard=function(key){remember();originalSetBoard(key);byId('workspace-save-status').textContent='Board changed · previous circuit cleared'};
  loadDemo=function(){remember();originalLoadDemo();if(components[0]){components[0].x=650;components[0].y=240}if(components[1]){components[1].x=880;components[1].y=100}renderComponents();updateWires()};
  byId('clear-workspace').addEventListener('click',remember,true);
  byId('undo-action').addEventListener('click',()=>{if(!past.length)return;future.push(snapshot());restore(past.pop());refreshHistoryButtons()});
  byId('redo-action').addEventListener('click',()=>{if(!future.length)return;past.push(snapshot());restore(future.pop());refreshHistoryButtons()});
  byId('clear-wires').addEventListener('click',()=>{if(!wires.length)return;remember();wires=[];selectedTerminal=null;renderConnections();updateWires();byId('connect-hint').textContent='Wires cleared · choose two terminals to connect'});
  byId('code-view-toggle').addEventListener('click',()=>{const open=byId('code-view-toggle').getAttribute('aria-expanded')!=='true';byId('code-view-toggle').setAttribute('aria-expanded',String(open));byId('code-view-toggle').innerHTML=open?'× Close code':'&lt;/&gt; Code';document.querySelector('.workspace-grid').classList.toggle('code-open',open)});
  byId('components-focus').addEventListener('click',()=>{byId('component-search').focus();byId('toolbox').scrollIntoView({behavior:'smooth',block:'nearest'})});
  byId('schematic-view').addEventListener('click',event=>{const on=!document.querySelector('.workspace-grid').classList.contains('schematic-open');document.querySelector('.workspace-grid').classList.toggle('schematic-open',on);event.currentTarget.classList.toggle('active',on);document.querySelector('.editor-tab[aria-current="page"]')?.removeAttribute('aria-current');if(on)event.currentTarget.setAttribute('aria-current','page');else{document.querySelector('.editor-tab').setAttribute('aria-current','page');event.currentTarget.classList.remove('active')}});
  byId('circuit-canvas').addEventListener('dragover',event=>{if(event.dataTransfer.types.includes('text/plain')){event.preventDefault();event.dataTransfer.dropEffect='copy'}});
  byId('circuit-canvas').addEventListener('drop',event=>{const type=event.dataTransfer.getData('text/plain');if(!library.some(part=>part.type===type))return;event.preventDefault();const rect=canvas.getBoundingClientRect();addComponent(type,Math.max(555,event.clientX-rect.left+canvas.scrollLeft-95),Math.max(20,event.clientY-rect.top+canvas.scrollTop-58))});
  byId('component-bench').addEventListener('pointerdown',event=>{if(event.target.closest('.component-head'))remember()},true);
  const baseUpdate=updateWires;
  updateWires=function(){baseUpdate();const color=byId('wire-color').value;document.querySelectorAll('.wire-path').forEach(path=>path.style.stroke=color)};
  byId('wire-color').addEventListener('change',updateWires);
  byId('run-simulation').addEventListener('click',()=>{byId('code-status').textContent='Compile and simulate preview'});
  refreshHistoryButtons();
})();
