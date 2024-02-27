import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ id, name, value, delta, entries }) {
  // Implementa la lógica para enviar datos a tu herramienta de análisis.
}

if (process.env.NODE_ENV === 'production') {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}