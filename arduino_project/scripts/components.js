function showModal(comp) {
    const modal = document.getElementById('component-dialog');
    
    if (!modal) return;

    document.getElementById('modal-content').innerHTML = `
        <img src="${comp.image}" alt="${comp.name}" style="width:100%; max-height:220px; object-fit:contain; background-color:var(--img-bg); border-radius:12px; border:1px solid var(--img-border); padding:15px; margin-bottom:5px;">
        <h3 style="color:var(--accent-pink); font-size:1.5rem; margin:0 0 5px 0; text-align:center; border-bottom:2px solid var(--border-color); padding-bottom:10px;">${comp.name}</h3>
        <p><strong>Symbol:</strong> ${comp.symbol}</p>
        <p><strong>Category:</strong> ${comp.category}</p>
        <p><strong>Function:</strong> ${comp.function}</p>
    `;

    modal.showModal();

    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => modal.close();
    }

    modal.onclick = (event) => {
        const rect = modal.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) {
            modal.close();
        }
    };
}