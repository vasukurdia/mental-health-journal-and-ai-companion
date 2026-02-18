import { useState, useEffect, useRef } from 'react';
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

  // 🔥 Form section ka reference
  const formRef = useRef(null);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const data = await journalService.getJournals();
      setJournals(data.data);
    } catch {
      toast.error('Failed to load journals');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCreate = async (journalData) => {
    try {
      await journalService.createJournal(journalData);
      toast.success('Journal entry created!');
      setShowForm(false);
      fetchJournals();
    } catch {
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
    } catch {
      toast.error('Failed to update journal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal entry?')) return;

    try {
      await journalService.deleteJournal(id);
      toast.success('Journal deleted');
      fetchJournals();
    } catch {
      toast.error('Failed to delete journal');
    }
  };

  // 🔥 Edit click → form open + smooth scroll
  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setShowForm(true);
    scrollToForm();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">
              My Journal
            </h1>
            <p className="text-gray-300">
              Document your thoughts and feelings
            </p>
          </div>

          <button
            onClick={() => {
              setEditingJournal(null);
              setShowForm(!showForm);
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 border border-white text-white font-semibold transition hover:bg-blue-700 hover:scale-[1.03]"
          >
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        </div>

        {showForm && (
          <div
            ref={formRef}
            className="mb-10 p-6 rounded-xl bg-[#0F1C3F] border border-white shadow-lg"
          >
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#0F1C3F] border border-white shadow-lg">
            <JournalList
              journals={journals}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default JournalPage;
