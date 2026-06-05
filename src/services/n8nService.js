const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const N8N_CV_WEBHOOK_URL = import.meta.env.VITE_N8N_CV_WEBHOOK_URL;

export async function sendMessageToN8n(message) {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) throw new Error('n8n webhook failed');

  const data = await response.json();
  return data;
}

export async function sendCVToN8n(file) {
  const formData = new FormData();
  formData.append('cv', file);

  const response = await fetch(N8N_CV_WEBHOOK_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('CV upload webhook failed');

  const data = await response.json();
  return data;
}
