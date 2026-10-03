// Client service for submitting and managing leads

const LOCAL_STORAGE_KEY = 'shift_client_leads_cache';

export async function submitLead(leadData) {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('[Server leads API unreachable, caching locally]', err);
  }

  // Fallback to local cache if server is offline
  const newLead = {
    id: String(Date.now()),
    name: leadData.name || 'Անանուն',
    phone: leadData.phone || '',
    email: leadData.email || '',
    service: leadData.service || 'Ընդհանուր',
    budget: leadData.budget || '—',
    message: leadData.message || leadData.note || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    source: leadData.source || 'Website'
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift(newLead);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error(e);
  }

  return { success: true, lead: newLead };
}

export async function fetchLeads() {
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const data = await res.json();
      return data.leads || [];
    }
  } catch (err) {
    console.warn('[Server leads API unavailable, reading local cache]', err);
  }

  try {
    const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    return cached;
  } catch {
    return [];
  }
}

export async function updateLeadStatus(id, status) {
  try {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[Server update error]', err);
  }

  return { success: true };
}

export async function deleteLead(id) {
  try {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[Server delete error]', err);
  }

  return { success: true };
}
