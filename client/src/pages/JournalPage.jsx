import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import JournalForm from '../components/journal/JournalForm';
import JournalList from '../components/journal/JournalList';
import { journalService } from '../services/journalService';
import toast from 'react-hot-toast';

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const data = await journalService.getJournals();
      setJournals(data.data);
    } catch (error) {
      toast.error('Failed to load journals');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (journalData) => {
    try {
      await journalService.createJournal(journalData);
      toast.success('Journal entry created!');
      setShowForm(false);
      fetchJournals();
    } catch (error) {
      toast.error('Failed to create journal');
    }
  };

  const handleUpdate = async (journalData) => {
    try {
      await journalService.updateJournal(editingJournal._id, journalData);
      toast.success('Journal updated!');
      setEditingJournal(null);
      setShowForm(false);
      fetchJournals();
    } catch (error) {
      toast.error('Failed to update journal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) return;
    
    try {
      await journalService.deleteJournal(id);
      toast.success('Journal deleted');
      fetchJournals();
    } catch (error) {
      toast.error('Failed to delete journal');
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setShowForm(true);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              My Journal
            </h1>
            <p className="text-gray-600">Document your thoughts and feelings</p>
          </div>
          <button
            onClick={() => {
              setEditingJournal(null);
              setShowForm(!showForm);
            }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <JournalForm
              onSubmit={editingJournal ? handleUpdate : handleCreate}
              initialData={editingJournal}
              onCancel={() => {
                setShowForm(false);
                setEditingJournal(null);
              }}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <JournalList
            journals={journals}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default JournalPage;