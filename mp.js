
const container = document.getElementById('card-container');

// Funkce pro vytvoření karet
function createCard(parent, className) {
  const card = document.createElement('div');
  card.className = className;
  const plus = document.createElement('div');
  plus.className = 'plus-sign';
  plus.textContent = '+';
  card.appendChild(plus);
  parent.appendChild(card);

  plus.addEventListener('click', (e) => handleAddPlayer(e));
}

// sekce
const att = document.createElement('div');
att.className = 'att';
container.appendChild(att);
createCard(att, 'player-card1'); // LW
createCard(att, 'player-card2'); // ST
createCard(att, 'player-card3'); // RW

const mid = document.createElement('div');
mid.className = 'mid';
container.appendChild(mid);
createCard(mid, 'player-card4'); // CM
createCard(mid, 'player-card5'); // CM
createCard(mid, 'player-card6'); // CM

const def = document.createElement('div');
def.className = 'def';
container.appendChild(def);
createCard(def, 'player-card7'); // LB
createCard(def, 'player-card8'); // CB
createCard(def, 'player-card9'); // CB
createCard(def, 'player-card10'); // RB

const keep = document.createElement('div');
keep.className = 'keep';
container.appendChild(keep);
createCard(keep, 'player-card11'); // GK

let activeCard = null;
let selectedPlayers = [];
let activeCardClass = '';

// funkce pro přidávání
function handleAddPlayer(e) {
  activeCard = e.target.parentElement;
  activeCardClass = activeCard.className;
  document.querySelector('.overall').style.display = 'none';
  document.querySelector('.back').style.display = 'none';
  document.querySelector('.header').style.display = 'none';

  let positionFilter = '';
  switch (activeCard.classList[0]) {
    case 'player-card1':
      positionFilter = 'LW';
      break;
    case 'player-card2':
      positionFilter = 'ST';
      break;
    case 'player-card3':
      positionFilter = 'RW';
      break;
    case 'player-card4':
    case 'player-card5':
    case 'player-card6':
      positionFilter = 'CM';
      break;
    case 'player-card7':
      positionFilter = 'LB';
      break;
    case 'player-card8':
    case 'player-card9':
      positionFilter = 'CB';
      break;
    case 'player-card10':
      positionFilter = 'RB';
      break;
    case 'player-card11':
      positionFilter = 'GK';
      break;
    default:
      positionFilter = '';
  }

  const playerContainer = document.createElement('div');
  playerContainer.id = 'players-container';

  const closeButton = document.createElement('div');
  closeButton.className = 'close-button';
  closeButton.textContent = '×';
  playerContainer.appendChild(closeButton);

  const flexPlayerContainer = document.createElement('div');
  flexPlayerContainer.classList.add('flex-container');
  playerContainer.appendChild(flexPlayerContainer);

  // zavření modalu
  closeButton.addEventListener('click', () => {
    document.body.removeChild(playerContainer);
    document.querySelector('.overall').style.display = 'block';
    document.querySelector('.back').style.display = 'flex';
    document.querySelector('.header').style.display = 'flex';
  });

  players.filter(player => player.position === positionFilter).forEach(player => {
    const selectedPlayer = selectedPlayers.find(p => p.name === player.name);
    if (selectedPlayer) {
      return;
    }

    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');

    playerCard.innerHTML = `
      <div class="player-photo"><img src="${player.photo}" alt="${player.name}"></div>
      <div class="player-name"><strong>${player.name}</strong></div>
      <div class="player-rating"><strong>${player.rating}</strong></div>
      <div class="player-position"><strong>${player.position}</strong></div>
      <div class="player-attributes">
        ${player.position === "GK" ? `
          <div class="player-diving"><strong>DIV:</strong> ${player.div}</div>
          <div class="player-handling"><strong>HAN:</strong> ${player.han}</div>
          <div class="player-kicking"><strong>KIC:</strong> ${player.kic}</div>
          <div class="player-reflexes"><strong>REF:</strong> ${player.ref}</div>
          <div class="player-speed"><strong>SPD:</strong> ${player.spd}</div>
          <div class="player-positioning"><strong>POS:</strong> ${player.pos}</div>
        ` : `
          <div class="player-pace"><strong>PAC:</strong> ${player.pace}</div>
          <div class="player-shooting"><strong>SHO:</strong> ${player.shooting}</div>
          <div class="player-passing"><strong>PAS:</strong> ${player.passing}</div>
          <div class="player-dribbling"><strong>DRI:</strong> ${player.dribbling}</div>
          <div class="player-defending"><strong>DEF:</strong> ${player.defending}</div>
          <div class="player-physicality"><strong>PHY:</strong> ${player.physicality}</div>
        `}
      </div>
      <div class="player-team-nationality">
        <div class="player-nationality"><img src="${player.nationality}" alt="Nationality"></div>
        <div class="player-team"><img src="${player.team}" alt="Team"></div>
      </div>
    `;

    playerCard.addEventListener('click', () => {
      if (activeCard) {
        // doplnění hodnot
        activeCard.innerHTML = `
          <button class="remove-button">&times;</button>
          <div class="player-photo"><img src="${player.photo}" alt="${player.name}"></div>
          <div class="player-name"><strong>${player.name}</strong></div>
          <div class="player-rating"><strong>${player.rating}</strong></div>
          <div class="player-position"><strong>${player.position}</strong></div>
          <div class="player-attributes">
            ${player.position === "GK" ? `
              <div class="player-diving"><strong>DIV:</strong> ${player.div}</div>
              <div class="player-handling"><strong>HAN:</strong> ${player.han}</div>
              <div class="player-kicking"><strong>KIC:</strong> ${player.kic}</div>
              <div class="player-reflexes"><strong>REF:</strong> ${player.ref}</div>
              <div class="player-speed"><strong>SPD:</strong> ${player.spd}</div>
              <div class="player-positioning"><strong>POS:</strong> ${player.pos}</div>
            ` : `
              <div class="player-pace"><strong>PAC:</strong> ${player.pace}</div>
              <div class="player-shooting"><strong>SHO:</strong> ${player.shooting}</div>
              <div class="player-passing"><strong>PAS:</strong> ${player.passing}</div>
              <div class="player-dribbling"><strong>DRI:</strong> ${player.dribbling}</div>
              <div class="player-defending"><strong>DEF:</strong> ${player.defending}</div>
              <div class="player-physicality"><strong>PHY:</strong> ${player.physicality}</div>
            `}
          </div>
          <div class="player-team-nationality">
            <div class="player-nationality"><img src="${player.nationality}" alt="Nationality"></div>
            <div class="player-team"><img src="${player.team}" alt="Team"></div>
          </div>
        `;

        const removeButton = activeCard.querySelector('.remove-button');
        removeButton.addEventListener('click', (e) => {
          const cardToRemove = e.target.parentElement;
          const playerName = cardToRemove.querySelector('.player-name strong').textContent;

          const position = cardToRemove.querySelector('.player-position strong').textContent;

          selectedPlayers = selectedPlayers.filter(p => p.name !== playerName);
          updateAverageStats();

          cardToRemove.innerHTML = '<div class="plus-sign">+</div>';

          switch (position) {
            case 'LW':
              cardToRemove.className = 'player-card1';
              break;
            case 'ST':
              cardToRemove.className = 'player-card2';
              break;
            case 'RW':
              cardToRemove.className = 'player-card3';
              break;
            case 'CM':
              if (cardToRemove.classList.contains('player-card4')) {
                cardToRemove.className = 'player-card4';
              } else if (cardToRemove.classList.contains('player-card5')) {
                cardToRemove.className = 'player-card5';
              } else {
                cardToRemove.className = 'player-card6';
              }
              break;
            case 'LB':
              cardToRemove.className = 'player-card7';
              break;
            case 'CB':
              if (cardToRemove.classList.contains('player-card8')) {
                cardToRemove.className = 'player-card8';
              } else {
                cardToRemove.className = 'player-card9';
              }
              break;
            case 'RB':
              cardToRemove.className = 'player-card10';
              break;
            case 'GK':
              cardToRemove.className = 'player-card11';
              break;
            default:
              break;
          }

          const plusSign = cardToRemove.querySelector('.plus-sign');
          plusSign.addEventListener('click', (e) => handleAddPlayer(e));
        });

        activeCard.className = 'player-card';
        selectedPlayers.push(player);
        updateAverageStats();
        document.querySelector('.overall').style.display = 'block';
        document.querySelector('.back').style.display = 'flex';
        document.querySelector('.header').style.display = 'flex';
        document.body.removeChild(playerContainer);
      }
    });

    flexPlayerContainer.appendChild(playerCard);
  });

  document.body.appendChild(playerContainer);
}

 // průměrné hodnoty
function updateAverageStats() {
  
  const fieldPlayers = selectedPlayers.filter(player => player.position !== 'GK');
  
  if (fieldPlayers.length === 0) {
    document.getElementById('avg-pac').textContent = '-';
    document.getElementById('avg-sho').textContent = '-';
    document.getElementById('avg-pas').textContent = '-';
    document.getElementById('avg-dri').textContent = '-';
    document.getElementById('avg-def').textContent = '-';
    document.getElementById('avg-phy').textContent = '-';
    document.getElementById('average-rating').textContent = '-';
    resetStatColors(); 
    return;
  }

  let totalPAC = 0, totalSHO = 0, totalPAS = 0, totalDRI = 0, totalDEF = 0, totalPHY = 0, totalRating = 0;

  fieldPlayers.forEach(player => {
    totalPAC += parseInt(player.pace);
    totalSHO += parseInt(player.shooting);
    totalPAS += parseInt(player.passing);
    totalDRI += parseInt(player.dribbling);
    totalDEF += parseInt(player.defending);
    totalPHY += parseInt(player.physicality);
    totalRating += parseInt(player.rating);
  });

  let averagePAC = (totalPAC / fieldPlayers.length).toFixed(1);
  let averageSHO = (totalSHO / fieldPlayers.length).toFixed(1);
  let averagePAS = (totalPAS / fieldPlayers.length).toFixed(1);
  let averageDRI = (totalDRI / fieldPlayers.length).toFixed(1);
  let averageDEF = (totalDEF / fieldPlayers.length).toFixed(1);
  let averagePHY = (totalPHY / fieldPlayers.length).toFixed(1);
  let averageRating = (totalRating / fieldPlayers.length).toFixed(1);

  document.getElementById('avg-pac').textContent = averagePAC;
  document.getElementById('avg-sho').textContent = averageSHO;
  document.getElementById('avg-pas').textContent = averagePAS;
  document.getElementById('avg-dri').textContent = averageDRI;
  document.getElementById('avg-def').textContent = averageDEF;
  document.getElementById('avg-phy').textContent = averagePHY;
  document.getElementById('average-rating').textContent = averageRating;

  resetStatColors();  


  function getStatColor(value) {
    if (value === '-') return ''; 
    if (value >= 69 && value <= 79) {
      return '#ffcc00'; 
    } else if (value >= 25 && value < 69) {
      return '#ff3333'; 
    } else {
      return '#00ff88'; 
    }
  }


  let statElements = document.querySelectorAll('.stat-number');

  
  statElements.forEach((element) => {
    let statValue = element.textContent;
    

    if (statValue !== '-') {
      let statColor = getStatColor(parseFloat(statValue));
      element.style.color = statColor;
    }
  });
}


function resetStatColors() {
  let statElements = document.querySelectorAll('.stat-number');
  statElements.forEach((element) => {
   
    if (element.textContent === '-') {
      element.style.color = ''; 
    }
  });
}
