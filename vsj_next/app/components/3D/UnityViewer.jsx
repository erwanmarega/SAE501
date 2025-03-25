"use client";
import { useEffect, useRef } from "react";

export default function UnityViewer() {
  const unityRef = useRef();

  useEffect(() => {
    const loaderUrl = "/unity-build/webgl_test_local_2.loader.js";

    const loadUnity = async () => {
      const script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = async () => {
        const createUnityInstance = window.createUnityInstance;

        const canvas = unityRef.current;

        const config = {
          dataUrl: "/unity-build/webgl_test_local_2.data",
          frameworkUrl: "/unity-build/webgl_test_local_2.framework.js",
          codeUrl: "/unity-build/webgl_test_local_2.wasm",
          companyName: "MyCompany",
          productName: "MyProduct",
          productVersion: "1.0",
        };

        createUnityInstance(canvas, config, (progress) => {
          console.log(`Chargement Unity: ${Math.round(progress * 100)}%`);
        }).catch((message) => {
          alert("Erreur lors du chargement de Unity : " + message);
        });
      };
      document.body.appendChild(script);
    };

    loadUnity();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={unityRef} style={{ width: "100%", height: "600px" }}></canvas>
    </div>
  );
}