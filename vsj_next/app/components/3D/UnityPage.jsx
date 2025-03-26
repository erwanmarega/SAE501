import React from "react";

const UnityPage = ({ setSelected }) => {
  // Fonction déclenchée quand on clique sur la div "bureau"
  const handleClick = (e) => {
    // 1) Action React
    setSelected("Bureau");

    // 2) Récupérer l'élément <iframe>
    const iframeEl = document.getElementById("myIframe");
    if (!iframeEl) return; // Sécurité si l'iframe n'est pas encore rendu

    // 3) Obtenir la position de l'iframe dans la fenêtre du navigateur
    const iframeRect = iframeEl.getBoundingClientRect();

    // 4) Coordonnées du clic dans la fenêtre du navigateur
    const clickX = e.clientX;
    const clickY = e.clientY;

    // 5) Calculer les coordonnées *relatives* au coin supérieur gauche de l'iframe
    const relativeX = clickX - iframeRect.left;
    const relativeY = clickY - iframeRect.top;

    // 6) Envoyer un message vers l'iframe pour qu'elle “simule” le clic
    iframeEl.contentWindow.postMessage(
      {
        type: "SIMULATE_CLICK",
        x: relativeX,
        y: relativeY,
      },
      "*"
    );
  };

  return (
    <div className="w-full h-full row-start-1 row-end-8 col-start-1 col-end-4 flex items-center justify-center relative">
      <iframe
        id="myIframe"
        src="/3D_model/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Unity WebGL"
        allowFullScreen
      />
      <div
        className="bureau absolute w-16 h-20 top-60 left-44"
        onClick={handleClick}
      ></div>
    </div>
  );
};

export default UnityPage;
