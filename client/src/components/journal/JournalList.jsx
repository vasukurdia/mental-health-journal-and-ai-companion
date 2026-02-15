import EntryCard from './EntryCard';

const JournalList = ({ journals, onEdit, onDelete }) => {
  if (journals.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No journal entries yet
        </h3>
        <p className="text-gray-500">
          Start documenting your thoughts and feelings by creating your first entry!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {journals.map((journal) => (
        <EntryCard
          key={journal._id}
          journal={journal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JournalList;