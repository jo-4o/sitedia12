const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const confirmBtn = document.getElementById('confirmBtn');
const termsModal = document.getElementById('termsModal');
const buttonsContainer = document.querySelector('.buttons');

function moveButton() {
    const containerRect = buttonsContainer.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // define os cantos do container
    const corners = [
        { x: 20, y: 20 }, // canto superior esquerdo
        { x: containerRect.width - buttonRect.width - 20, y: 20 }, // canto superior direito
        { x: 20, y: containerRect.height - buttonRect.height - 20 }, // Bottom left
        { x: containerRect.width - buttonRect.width - 20, y: containerRect.height - buttonRect.height - 20 } // Bottom right
    ];
    
    // obtém a posição atual
    const currentX = parseInt(noBtn.style.left) || 0;
    const currentY = parseInt(noBtn.style.top) || 0;
    
    // encontra o canto mais distante da posição atual
    let farthestCorner = corners[0];
    let maxDistance = 0;
    
    corners.forEach(corner => {
        const distance = Math.sqrt(
            Math.pow(corner.x - currentX, 2) + 
            Math.pow(corner.y - currentY, 2)
        );
        if (distance > maxDistance) {
            maxDistance = distance;
            farthestCorner = corner;
        }
    });
    
    // adiciona um pouco de aleatoriedade à posição do canto
    const randomOffset = 30;
    const newX = farthestCorner.x + (Math.random() * randomOffset - randomOffset/2);
    const newY = farthestCorner.y + (Math.random() * randomOffset - randomOffset/2);
    
    // aplica a nova posição com transição suave
    noBtn.style.position = 'absolute';
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// adiciona um ouvinte de evento para mover o botão "Não" quando clicado
noBtn.addEventListener('click', moveButton);

// mostra o modal de termos quando clicado em "Sim"
yesBtn.addEventListener('click', () => {
    termsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // impede o scroll quando o modal está aberto
});

// lida com o clique do botão de confirmação
confirmBtn.addEventListener('click', () => {
    // verifica se os termos necessários foram aceitos
    const term1 = document.getElementById('term1').checked; // Estar viva (obrigatório)
    const term3 = document.getElementById('term3').checked; // Minecraft (sim)
    
    if (term1 && term3) {
        termsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // mostra a mensagem de sucesso
        const container = document.querySelector('.container');
        container.innerHTML = `
            <h1>Obrigado ❤️</h1>
            <img src="emojo.jpg" alt="Emojo" style="max-width: 200px; margin: 2rem auto; display: block;">
        `;
    } else {
        // balança o modal para indicar erro
        termsModal.querySelector('.modal-content').style.animation = 'shake 0.5s';
        setTimeout(() => {
            termsModal.querySelector('.modal-content').style.animation = '';
        }, 500);
    }
});

// fecha o modal quando clicado fora dele
termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}); 