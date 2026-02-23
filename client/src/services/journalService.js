import api from './api';

export const journalService = {
  getJournals: async () => {
    const response = await api.get('/journals');
    return response.data;
  },

  getJournal: async (id) => {
    const response = await api.get(`/journals/${id}`);
    return response.data;
  },

  createJournal: async (journalData) => {
    const response = await api.post('/journals', journalData);
    return response.data;
  },

  updateJournal: async (id, journalData) => {
    const response = await api.put(`/journals/${id}`, journalData);
    return response.data;
  },

  deleteJournal: async (id) => {
    const response = await api.delete(`/journals/${id}`);
    return response.data;
  },

  getMoodStats: async () => {
    const response = await api.get('/journals/stats/mood');
    return response.data;
  },

  // Search journals (optional - if you want to add search)
  searchJournals: async (query) => {
    const response = await api.get(`/journals?search=${query}`);
    return response.data;
  },

  // Get journals by date range (optional)
  getJournalsByDateRange: async (startDate, endDate) => {
    const response = await api.get(`/journals?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }
};